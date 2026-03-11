import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingBag, Search, User, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS, PHONE, APP_NAME, BRAND_LOGO } from '../constants';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import menuBg from '../src/4.png';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsCartOpen, itemCount } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-saney-gold/10 backdrop-blur-md py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left Side: Logo */}
            <div className="flex-[1.3] flex justify-start items-center">
              <Link to="/" className="flex items-center gap-2 md:gap-3 group" onClick={() => setIsOpen(false)}>
                <div className={`h-9 w-9 md:h-11 md:w-11 rounded-full overflow-hidden border shadow-md transition duration-300 ${scrolled ? 'border-saney-dark/10 bg-white' : 'border-saney-dark/20 bg-white/10 backdrop-blur-sm group-hover:border-saney-gold/80'}`}>
                  <img 
                    src={BRAND_LOGO} 
                    alt={`${APP_NAME} logo`} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className={`font-serif text-lg md:text-2xl font-bold tracking-wider whitespace-nowrap ${scrolled ? 'text-saney-dark' : 'text-saney-dark'}`}>
                  {APP_NAME}
                </span>
              </Link>
            </div>

            {/* Center: Spacer to push right content */}
            <div className="flex-1"></div>

            {/* Right Side: Menu, User & Cart Buttons */}
            <div className="flex-shrink-0 flex justify-end items-center gap-1 md:gap-4">
              
              {/* User Connection Option */}
              {isAuthenticated ? (
                <Link
                  to={isAdmin ? '/admin' : '/client'}
                  className={`p-2 rounded-full transition-colors ${scrolled ? 'text-saney-dark hover:text-saney-gold' : 'text-saney-dark hover:text-saney-gold bg-saney-dark/5 hover:bg-saney-dark/10'}`}
                  title={isAdmin ? "Administration" : "Mon Espace Client"}
                >
                  <User size={24} />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={`p-2 rounded-full transition-colors ${scrolled ? 'text-saney-dark hover:text-saney-gold' : 'text-saney-dark hover:text-saney-gold bg-saney-dark/5 hover:bg-saney-dark/10'}`}
                  title="Connexion"
                >
                  <LogIn size={24} />
                </Link>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 rounded-full transition-colors ${scrolled ? 'text-saney-dark hover:text-saney-gold' : 'text-saney-dark hover:text-saney-gold bg-saney-dark/5 hover:bg-saney-dark/10'}`}
              >
                <ShoppingBag size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Menu Trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className={`p-2 rounded-md ${scrolled ? 'text-saney-dark' : 'text-saney-dark'} hover:text-saney-gold focus:outline-none flex items-center gap-2`}
              >
                <span className="hidden md:block uppercase font-bold tracking-widest text-sm mr-1">Menu</span>
                <Menu size={28} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Side Menu Drawer (Desktop & Mobile) */}
      <div className={`fixed inset-0 z-[60] overflow-hidden transition-all duration-500 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Panel */}
        <div 
          className={`absolute inset-y-0 right-0 max-w-md w-full shadow-2xl flex flex-col h-full transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{
            backgroundImage: `url(${menuBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100/50">
              <span className="font-serif text-2xl text-saney-dark font-bold tracking-wide">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100/50 rounded-full transition-colors text-gray-500"
              >
                <X size={28} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-8 py-6 border-b border-gray-100/50 bg-gray-50/30">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:border-saney-gold focus:ring-1 focus:ring-saney-gold outline-none bg-white/80 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-4">
              {/* Mobile Connection Options */}
              {isAuthenticated ? (
                <div className="mb-6 space-y-3 pb-6 border-b border-gray-100/50">
                <Link
                  to={isAdmin ? '/admin' : '/client'}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl text-center uppercase tracking-widest font-bold text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 bg-saney-gold text-white hover:bg-yellow-600"
                >
                  <User size={18} />
                  Mon Espace
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    navigate('/');
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl text-center uppercase tracking-widest font-bold text-sm border-2 border-gray-200 text-gray-500 hover:border-red-500 hover:text-red-500 transition-all duration-300"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="mb-6 pb-6 border-b border-gray-100">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl text-center uppercase tracking-widest font-bold text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 bg-saney-dark text-white hover:bg-black"
                >
                  <LogIn size={18} />
                  Connexion
                </Link>
              </div>
            )}

            {NAV_LINKS.map((link, index) => {
               // Cycle through theme colors
              const colorStyles = [
                'bg-saney-dark text-white hover:bg-black',
                'bg-saney-accent text-white hover:opacity-90',
                'bg-saney-gold text-white hover:bg-yellow-600',
                'bg-saney-dark text-white hover:bg-black',
                'bg-saney-accent text-white hover:opacity-90',
                'bg-saney-dark text-white hover:bg-black',
                'bg-saney-accent text-white hover:opacity-90',
              ];
              const activeStyle = 'ring-2 ring-offset-2 ring-saney-gold ring-offset-transparent';

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full py-4 px-6 rounded-xl text-center uppercase tracking-widest font-bold text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300
                    ${colorStyles[index % colorStyles.length]}
                    ${location.pathname === link.href ? activeStyle : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* RDV Button in Menu */}
            <a 
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="block w-full py-4 px-6 rounded-xl text-center uppercase tracking-widest font-bold text-sm bg-white border-2 border-saney-gold text-saney-gold hover:bg-saney-gold hover:text-white transition-all duration-300 mt-8"
            >
              <span className="flex items-center justify-center gap-2">
                <Phone size={18} />
                Prendre Rendez-vous
              </span>
            </a>
          </div>

          {/* Footer Info */}
          <div className="p-8 border-t border-gray-100/50 bg-gray-50/30 text-center">
            <p className="font-serif text-lg text-saney-dark mb-2">{APP_NAME}</p>
            <p className="text-sm text-gray-500">Ouvert du Lundi au Samedi</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
