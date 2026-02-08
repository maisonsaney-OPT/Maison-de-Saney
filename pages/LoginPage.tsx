import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Lock, User, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClientLogin, setIsClientLogin] = useState(true);
  const { login } = useAuth();
  const { addUser } = useData();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation
    if (email && password) {
      const role = isClientLogin ? 'client' : 'admin';
      const user = login(email, role);
      addUser(user);
      navigate(role === 'admin' ? '/admin' : '/client');
    }
  };

  return (
    <div className="min-h-screen bg-saney-cream flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-saney-dark mb-2">
            {isClientLogin ? 'Espace Client' : 'Administration'}
          </h1>
          <p className="text-gray-500">Connectez-vous à votre compte</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
              isClientLogin ? 'bg-white shadow-sm text-saney-dark' : 'text-gray-500 hover:text-saney-dark'
            }`}
            onClick={() => setIsClientLogin(true)}
          >
            Client
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
              !isClientLogin ? 'bg-white shadow-sm text-saney-dark' : 'text-gray-500 hover:text-saney-dark'
            }`}
            onClick={() => setIsClientLogin(false)}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-saney-gold focus:ring-1 focus:ring-saney-gold outline-none"
                placeholder="votre@email.com"
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-saney-gold focus:ring-1 focus:ring-saney-gold outline-none"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-saney-dark text-white py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-black transition-colors"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Comptes de test :</p>
          <p>Client: client@saney.com / client</p>
          <p>Admin: admin@saney.com / admin</p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link to="/" className="text-gray-500 hover:text-saney-gold text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
};
