import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package,
  Users, 
  MessageSquare, 
  Image, 
  GraduationCap, 
  Scissors, 
  LogOut,
  Home
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Commandes', icon: Package, href: '/admin/orders' },
    { label: 'Services', icon: Scissors, href: '/admin/services' },
    { label: 'Boutique', icon: ShoppingBag, href: '/admin/products' },
    { label: 'Formations', icon: GraduationCap, href: '/admin/formations' },
    { label: 'Galerie', icon: Image, href: '/admin/gallery' },
    { label: 'Messages', icon: MessageSquare, href: '/admin/messages' },
    { label: 'Utilisateurs', icon: Users, href: '/admin/users' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-saney-dark text-white fixed h-full z-10 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-serif font-bold tracking-wide">Saney Admin</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                      isActive 
                        ? 'bg-saney-gold text-white' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <Home size={20} />
            <span>Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};
