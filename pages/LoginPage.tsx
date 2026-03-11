import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Lock, User, ArrowLeft, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Sign In
        console.log("Attempting sign in...", email);
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error("Sign in error:", error);
          throw error;
        }
        
        console.log("Sign in successful, navigating...");
        // Navigation is handled by AuthContext state change or we can force it here
        // But better to let the listener in AuthContext handle it.
        // For better UX, we can check role here if needed, but simple redirect works.
        navigate('/'); 
      } else {
        // Sign Up
        console.log("Attempting sign up...", email);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        
        if (error) {
          console.error("Sign up error:", error);
          throw error;
        }
        
        // If email confirmation is disabled, user is logged in immediately
        if (data.session) {
          console.log("Sign up successful with session, navigating...");
          alert('Inscription réussie ! Bienvenue.');
          navigate('/');
        } else {
          // Email confirmation is enabled
          console.log("Sign up successful, awaiting confirmation.");
          alert('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      console.error("Auth process error:", err);
      setError(err.message === 'Invalid login credentials' 
        ? 'Email ou mot de passe incorrect.' 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-saney-cream flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-saney-gold/10">
        
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-saney-dark mb-2 tracking-wide">
            {isLogin ? 'Bon retour parmi nous' : 'Rejoindre Maison Saney'}
          </h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            {isLogin ? 'Connectez-vous à votre espace' : 'Créez votre compte client'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
            <span className="font-bold">Erreur:</span> {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nom Complet</label>
              <div className="relative group">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-saney-gold focus:ring-1 focus:ring-saney-gold outline-none transition-all group-hover:border-saney-gold/50"
                  placeholder="Votre Nom"
                  required={!isLogin}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-saney-gold/70 transition-colors" size={18} />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-saney-gold focus:ring-1 focus:ring-saney-gold outline-none transition-all group-hover:border-saney-gold/50"
                placeholder="votre@email.com"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-saney-gold/70 transition-colors" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Mot de passe</label>
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-saney-gold focus:ring-1 focus:ring-saney-gold outline-none transition-all group-hover:border-saney-gold/50"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-saney-gold/70 transition-colors" size={18} />
            </div>
            {!isLogin && <p className="text-xs text-gray-400 mt-1">Minimum 6 caractères</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-saney-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setEmail('');
              setPassword('');
              setFullName('');
            }}
            className="text-sm text-gray-600 hover:text-saney-gold font-medium underline-offset-4 hover:underline transition-colors"
          >
            {isLogin ? "Pas encore de compte ? Créer un compte" : "Déjà membre ? Se connecter"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link to="/" className="text-gray-400 hover:text-saney-dark text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};
