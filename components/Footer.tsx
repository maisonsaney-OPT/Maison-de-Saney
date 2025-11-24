import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, BRAND_LOGO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-saney-dark text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-white/20 bg-white/10 shadow-md">
                <img src={BRAND_LOGO} alt={`${APP_NAME} logo`} className="h-full w-full object-cover" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-wider text-saney-gold">{APP_NAME}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Expertise ongulaire, detail soigne et rituels premium. Vos mains meritent l'excellence.
            </p>
          </div>
          
          <div>
            <h4 className="uppercase text-sm font-bold tracking-widest mb-6 text-white">Navigation</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-saney-gold transition-colors">Accueil</Link></li>
              <li><Link to="/about" className="hover:text-saney-gold transition-colors">Le Salon</Link></li>
              <li><Link to="/services" className="hover:text-saney-gold transition-colors">Prestations</Link></li>
              <li><Link to="/contact" className="hover:text-saney-gold transition-colors">Prendre RDV</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="uppercase text-sm font-bold tracking-widest mb-6 text-white">Prestations phares</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Manucure & semi-permanent</li>
              <li>Extensions gel/acrygel</li>
              <li>Nail art signature</li>
              <li>Spa mains & pieds</li>
            </ul>
          </div>

           <div>
             <h4 className="uppercase text-sm font-bold tracking-widest mb-6 text-white">Legal</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-saney-gold transition-colors">Mentions legales</a></li>
              <li><a href="#" className="hover:text-saney-gold transition-colors">Politique de confidentialite</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tous droits reserves.</p>
        </div>
      </div>
    </footer>
  );
};
