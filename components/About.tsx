import React from 'react';
import { ABOUT_IMAGES, INSTAGRAM_URL, PLANITY_URL } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-3 gap-4">
              {ABOUT_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-lg shadow-md h-[300px] animate-float${idx % 2 !== 0 ? '-delayed' : ''} ${idx % 2 === 0 ? 'mt-8' : '-mb-8'}`}
                >
                  <img
                    src={img}
                    alt={`Salon Maison Saney ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-500"></div>
                </div>
              ))}
            </div>
            {/* Decorative box */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] border border-saney-beige/50"></div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-2">Le Salon</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-saney-dark leading-tight">
                Une approche <span className="italic text-saney-accent">sur-mesure</span> de l'onglerie
              </h3>
            </div>
            
            <div className="relative group p-6 rounded-lg transition-all duration-500 hover:bg-saney-cream/30">
              <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                Situé au cœur de Béziers, Maison Saney est un salon intimiste dédié à la beauté des mains et des pieds. Nous avons imaginé un espace chaleureux où chaque détail compte, du soin des cuticules aux finitions miroir.
              </p>
            </div>

            <div className="relative group p-6 rounded-lg transition-all duration-500 hover:bg-saney-cream/30 delay-100">
              <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                Spécialisées en manucure russe, extensions gel/acrygel et nail art haute précision, nous privilégions la qualité et la sécurité. Chaque rendez-vous débute par un diagnostic personnalisé afin d'adapter la préparation, la forme et les produits à vos ongles.
              </p>
            </div>

            <div className="flex items-start gap-4 p-6 bg-saney-cream border-l-4 border-saney-gold transition-transform duration-300 hover:translate-x-2">
              <div className="flex-1">
                <h4 className="font-serif text-xl text-saney-dark mb-2">Uniquement sur Rendez-vous</h4>
                <p className="text-gray-500 italic">
                  Afin de garantir un service privilégié et un temps dédié à chaque cliente, le salon vous accueille exclusivement sur créneau réservé.
                </p>
              </div>
            </div>

            <div className="pt-4 flex gap-6">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noreferrer" 
                className="text-saney-gold font-semibold uppercase tracking-wide text-sm hover:text-saney-dark transition-colors border-b border-transparent hover:border-saney-dark pb-1"
              >
                Voir les réalisations sur Instagram
              </a>
              <a 
                href={PLANITY_URL} 
                target="_blank" 
                rel="noreferrer" 
                className="text-saney-dark font-semibold uppercase tracking-wide text-sm hover:text-saney-gold transition-colors border-b border-transparent hover:border-saney-gold pb-1"
              >
                Réserver sur Planity
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
