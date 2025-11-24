import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME, BRAND_LOGO, HERO_IMAGE, LOCAL_COLLAGES } from '../constants';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[90vh] md:h-screen min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="Salon interior" 
          className="hidden md:block w-full h-full object-cover object-center bg-saney-dark"
        />
        <img
          src={LOCAL_COLLAGES[0]}
          alt="Salon interior mobile"
          className="md:hidden w-full h-full object-cover object-[100%_50%] bg-saney-dark"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white space-y-8 animate-fade-in-up">
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
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6">
          Maison de Saney
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Manucures expertes, extensions gel et nail art signature dans un cadre intimiste au coeur de Beziers.
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

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-white/50"></div>
      </div>
    </div>
  );
};
