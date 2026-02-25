import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME, BRAND_LOGO, HERO_IMAGE, HERO_IMAGE_MOBILE, LOCAL_COLLAGES } from '../constants';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="Salon interior" 
          className="hidden md:block w-full h-full object-cover object-center bg-saney-dark"
        />
        <img
          src={HERO_IMAGE_MOBILE}
          alt="Salon interior mobile"
          className="md:hidden w-full h-full object-cover object-center bg-saney-dark"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white space-y-8 animate-fade-in-up pt-24 pb-20">
        <div className="mx-auto w-fit px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center gap-3 shadow-lg">
          <div className="h-12 w-12 rounded-full overflow-hidden border border-white/50 bg-white/20">
            <img src={BRAND_LOGO} alt={`${APP_NAME} logo`} className="h-full w-full object-cover" />
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-saney-beige">Signature</p>
            <p className="font-serif text-lg font-semibold">{APP_NAME}</p>
          </div>
        </div>

        <p className="text-sm md:text-base uppercase tracking-[0.3em] font-light text-saney-beige mb-4">
          Salon d'onglerie & Nail Art
        </p>

        {/* Spacer to maintain layout balance where "Maison Saney" used to be */}
        <div className="h-20 md:h-32 lg:h-40 mb-6"></div>
        
        <p className="text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed">
          OSEZ CROIRE EN VOTRE POTENTIEL, C'EST AINSI QUE NAISSENT LES PLUS BELLES REUSSITES.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link 
            to="/contact" 
            className="bg-saney-gold text-white px-8 py-4 rounded-none border border-saney-gold hover:bg-white hover:text-saney-gold transition-all duration-300 uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2 group"
          >
            Reserver un creneau
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/services" 
            className="bg-transparent text-white px-8 py-4 rounded-none border border-white hover:bg-white hover:text-saney-dark transition-all duration-300 uppercase tracking-widest text-sm font-bold"
          >
            Decouvrir les prestations
          </Link>
        </div>
      </div>

      {/* Scrolling Tape */}
      <div className="absolute bottom-0 left-0 w-full bg-saney-dark/95 border-t border-saney-gold/20 backdrop-blur-sm z-30 py-3 overflow-hidden">
        <div className="flex w-full">
          <div className="flex animate-scroll-slow whitespace-nowrap items-center">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="mx-8 text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-saney-beige/80 flex items-center gap-8">
                BEAUTÉ <span className="text-saney-gold/50">•</span>
                MODE <span className="text-saney-gold/50">•</span>
                ONGLES <span className="text-saney-gold/50">•</span>
                SOIN <span className="text-saney-gold/50">•</span>
                SUBLIME <span className="text-saney-gold/50">•</span>
                ÉLÉGANCE <span className="text-saney-gold/50">•</span>
              </span>
            ))}
          </div>
          <div className="flex animate-scroll whitespace-nowrap items-center" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <span key={`dup-${i}`} className="mx-8 text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-saney-beige/80 flex items-center gap-8">
                BEAUTÉ <span className="text-saney-gold/50">•</span>
                MODE <span className="text-saney-gold/50">•</span>
                ONGLES <span className="text-saney-gold/50">•</span>
                SOIN <span className="text-saney-gold/50">•</span>
                SUBLIME <span className="text-saney-gold/50">•</span>
                ÉLÉGANCE <span className="text-saney-gold/50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/50"></div>
      </div>
    </div>
  );
};
