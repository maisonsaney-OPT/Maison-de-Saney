import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Clock, ArrowRight } from 'lucide-react';
import { ADDRESS, PHONE, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, INSTAGRAM_URL, PLANITY_URL, CONTACT_IMAGE } from '../constants';

export const Contact: React.FC = () => {
  return (
    <div className="bg-saney-beige/30 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Info Side */}
          <div className="lg:w-1/2 p-12 lg:p-16 space-y-10">
            <div>
              <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Contact</h2>
              <h3 className="font-serif text-4xl text-saney-dark">Rendez-vous & Acces</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-saney-cream p-3 rounded-full text-saney-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Adresse</h4>
                  <p className="text-gray-600">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-saney-cream p-3 rounded-full text-saney-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Telephone</h4>
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-gray-600 hover:text-saney-gold transition-colors text-lg font-serif">
                    {PHONE}
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Uniquement sur rendez-vous</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-saney-cream p-3 rounded-full text-saney-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Horaires</h4>
                  <p className="text-gray-600">Lundi - Samedi</p>
                  <p className="text-gray-600">Sur creneau reserve</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
               <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-4">Suivez-nous</h4>
               <div className="flex gap-4">
                 <a href={INSTAGRAM_URL} className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors" target="_blank" rel="noreferrer">
                    <Instagram size={24} />
                    <span className="text-sm">{SOCIAL_INSTAGRAM}</span>
                 </a>
                 <a href={INSTAGRAM_URL} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noreferrer">
                    <Facebook size={24} />
                    <span className="text-sm">{SOCIAL_FACEBOOK}</span>
                 </a>
               </div>
            </div>
            
            <a 
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="block w-full text-center bg-saney-dark text-white py-4 mt-8 hover:bg-saney-gold transition-colors uppercase tracking-widest font-bold text-sm"
            >
              Appeler pour reserver
            </a>
            <a 
              href={PLANITY_URL}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center border border-saney-dark text-saney-dark py-4 mt-4 hover:bg-saney-dark hover:text-white transition-colors uppercase tracking-widest font-bold text-sm flex items-center justify-center gap-2"
            >
              Reserver sur Planity
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Map Image Placeholder Side */}
          <div className="lg:w-1/2 bg-gray-200 relative min-h-[400px]">
             <img
              src={CONTACT_IMAGE}
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              alt="Localisation du salon"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 backdrop-blur-md px-6 py-4 shadow-lg text-center">
                <p className="font-serif text-lg text-saney-dark font-bold">18 Av. Jean Moulin</p>
                <p className="text-sm text-gray-600">34500 Beziers</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
