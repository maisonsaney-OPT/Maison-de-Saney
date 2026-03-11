import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Shield, Search, Trash2, Edit2, Check, X } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'client';
  created_at: string;
  avatar_url?: string;
}

export const AdminUsersPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (id: string, newRole: 'admin' | 'client') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', id);

      if (error) throw error;
      
      // Optimistic update
      setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Erreur lors de la mise à jour du rôle.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    // Note: Deleting a user from 'profiles' doesn't delete them from Auth.
    // To fully delete, we need a server-side function (Edge Function) or just block them.
    // For now, we'll just delete the profile which effectively disables their app access.
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le profil de ${name} ?`)) {
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setProfiles(profiles.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Erreur lors de la suppression.');
      }
    }
  };

  const filteredUsers = profiles.filter(user => 
    (user.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Utilisateurs ({profiles.length})</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-saney-gold focus:ring-1 focus:ring-saney-gold outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement des utilisateurs...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Utilisateur</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Rôle</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date d'inscription</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-saney-gold/10 text-saney-gold font-bold">
                            {user.full_name ? user.full_name.charAt(0).toUpperCase() : <User size={20} />}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.full_name || 'Utilisateur sans nom'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === user.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          className="text-sm border rounded px-2 py-1 outline-none focus:border-saney-gold"
                          value={user.role}
                          onChange={(e) => handleRoleUpdate(user.id, e.target.value as 'admin' | 'client')}
                          autoFocus
                          onBlur={() => setEditingId(null)}
                        >
                          <option value="client">Client</option>
                          <option value="admin">Administrateur</option>
                        </select>
                      </div>
                    ) : (
                      <span 
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                        onClick={() => setEditingId(user.id)}
                        title="Cliquez pour changer le rôle"
                      >
                        {user.role === 'admin' && <Shield size={12} />}
                        {user.role === 'admin' ? 'Administrateur' : 'Client'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(user.id)}
                        className="p-2 text-gray-400 hover:text-saney-gold hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Modifier le rôle"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.full_name)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer le profil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
