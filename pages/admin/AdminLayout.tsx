import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BRAND_LOGO } from '../../constants';
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
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <aside 
        className={`bg-saney-dark text-white fixed h-full z-10 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`p-4 border-b border-gray-700 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                <img src={BRAND_LOGO} alt="Logo" className="h-full w-full object-cover" />
              </div>
              <h1 className="text-lg font-serif font-bold tracking-wide whitespace-nowrap">Saney Admin</h1>
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors`}
            title={isCollapsed ? "Déplier le menu" : "Replier le menu"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Logo when collapsed */}
        {isCollapsed && (
          <div className="py-4 flex justify-center border-b border-gray-700">
             <div className="h-10 w-10 rounded-full overflow-hidden border border-white/20">
                <img src={BRAND_LOGO} alt="Logo" className="h-full w-full object-cover" />
             </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive 
                        ? 'bg-saney-gold text-white' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span className={`font-medium whitespace-nowrap transition-all duration-300 ${
                      isCollapsed ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-auto opacity-100'
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Voir le site" : ''}
          >
            <Home size={20} className="flex-shrink-0" />
            <span className={`whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-auto opacity-100'
            }`}>
              Voir le site
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Déconnexion" : ''}
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className={`whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-auto opacity-100'
            }`}>
              Déconnexion
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Outlet />
      </main>
    </div>
  );
};
