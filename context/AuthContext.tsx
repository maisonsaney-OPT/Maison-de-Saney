import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AppUser } from '../types'; // Renamed to avoid conflict with Supabase User
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: () => void; // Handled via Supabase UI or custom form, but here just a placeholder or removal
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 1. Check active session
    const checkUser = async () => {
      try {
        console.log("Checking session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          if (mounted) setLoading(false);
          return;
        }

        if (mounted) {
          if (session?.user) {
            console.log("Session found for:", session.user.email);
            await fetchProfile(session.user);
          } else {
            console.log("No active session.");
            setUser(null);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
        if (mounted) setLoading(false);
      }
    };

    checkUser();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event);
      if (mounted) {
        if (session?.user) {
          console.log("User signed in:", session.user.email);
          await fetchProfile(session.user);
        } else {
          console.log("User signed out.");
          setUser(null);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (authUser: SupabaseUser) => {
    console.log("Fetching profile for:", authUser.id);
    
    // Helper to create a timeout promise
    const timeoutPromise = new Promise<{ timeout: true }>((resolve) => {
      setTimeout(() => resolve({ timeout: true }), 5000); // 5s timeout
    });

    try {
      // Race between fetch and timeout
      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      const result = await Promise.race([fetchPromise, timeoutPromise]);

      let data: any = null;
      let error: any = null;

      if ('timeout' in result) {
        console.warn("Profile fetch timed out");
        // Try to recover from local cache if available to prevent downgrade
        const cached = localStorage.getItem(`saney_user_${authUser.id}`);
        if (cached) {
          console.log("Using cached profile due to timeout");
          setUser(JSON.parse(cached));
          return;
        }
      } else {
        // It's the Supabase response
        data = result.data;
        error = result.error;
        console.log("Profile fetch result:", { data, error });
      }

      // If profile is missing but auth exists, we might need to create it (race condition with trigger)
      if (error && error.code === 'PGRST116') {
        console.warn('Profile missing, attempting to create one...');
        // Fallback: Create profile manually if trigger failed
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
             id: authUser.id,
             email: authUser.email,
             full_name: authUser.user_metadata?.full_name || 'User',
             role: 'client' // Default to client, admin must be set manually in DB
          })
          .select()
          .single();
        
        if (!createError) {
          console.log("Fallback profile created:", newProfile);
          data = newProfile;
          error = null;
        } else {
           console.error('Failed to create fallback profile:', createError);
        }
      }

      if (error) {
        console.error('Error fetching profile (or timeout):', error);
        // Try cache before fallback
        const cached = localStorage.getItem(`saney_user_${authUser.id}`);
        if (cached) {
          console.log("Using cached profile due to error");
          setUser(JSON.parse(cached));
          return;
        }
      }

      // Map Supabase profile to App User
      // If data is still null (fetch failed or timed out), use auth data as fallback
      const appUser: AppUser = {
        id: authUser.id,
        email: authUser.email || '',
        name: data?.full_name || authUser.user_metadata?.full_name || 'User',
        role: data?.role || 'client', // This is where 'admin' comes from
        createdAt: authUser.created_at,
        avatar: data?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(data?.full_name || authUser.user_metadata?.full_name || 'User')}`
      };
      
      console.log("Setting user state:", appUser);
      setUser(appUser);
      // Cache the successful profile
      localStorage.setItem(`saney_user_${authUser.id}`, JSON.stringify(appUser));

    } catch (err) {
      console.error('Profile fetch error:', err);
      
      // Try cache before fallback
      const cached = localStorage.getItem(`saney_user_${authUser.id}`);
      if (cached) {
        console.log("Using cached profile due to exception");
        setUser(JSON.parse(cached));
      } else {
        // Even on error, set user from auth data so they aren't stuck in loading
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.full_name || 'User',
          role: 'client',
          createdAt: authUser.created_at,
          avatar: `https://ui-avatars.com/api/?name=User`
        });
      }
    } finally {
      console.log("Finished profile fetch, loading false");
      setLoading(false);
    }
  };

  const login = () => {
    // Placeholder
    console.log("Use supabase.auth.signIn... in your login component");
  };

  const logout = async () => {
    if (user) {
      localStorage.removeItem(`saney_user_${user.id}`);
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
