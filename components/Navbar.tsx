import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, PHONE, APP_NAME, BRAND_LOGO } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
              <div className={`h-11 w-11 rounded-full overflow-hidden border shadow-md transition duration-300 ${scrolled ? 'border-saney-dark/10 bg-white' : 'border-white/50 bg-white/10 backdrop-blur-sm group-hover:border-saney-gold/80'}`}>
                <img 
                  src={BRAND_LOGO} 
                  alt={`${APP_NAME} logo`} 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className={`font-serif text-2xl font-bold tracking-wider ${scrolled ? 'text-saney-dark' : 'text-saney-dark lg:text-white'}`}>
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm uppercase tracking-widest font-medium hover:text-saney-gold transition-colors ${scrolled ? 'text-gray-800' : 'text-white'} ${location.pathname === link.href ? 'text-saney-gold' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="bg-saney-gold text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-yellow-600 transition-colors flex items-center gap-2"
            >
              <Phone size={16} />
              <span className="hidden lg:inline">Prendre RDV</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-800' : 'text-gray-800 lg:text-white'} hover:text-saney-gold focus:outline-none`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full top-full left-0 border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-saney-gold w-full text-center border-b border-gray-50 last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
               <a 
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="bg-saney-gold text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide inline-flex items-center gap-2"
              >
                <Phone size={16} />
                Appeler
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
