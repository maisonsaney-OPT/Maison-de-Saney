import React from 'react';
import { ABOUT_IMAGES, INSTAGRAM_URL, PLANITY_URL } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              {ABOUT_IMAGES.slice(0, 2).map((img, idx) => (
                <a
                  key={idx}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`${idx === 0 ? 'mt-12 translate-y-8' : '-mb-12'} rounded-none shadow-lg overflow-hidden block group h-[240px]`}
                >
                  <img
                    src={img}
                    alt="Salon Maison de Saney"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
            {/* Decorative box */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[80%] border-2 border-saney-beige"></div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-2">Le Salon</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-saney-dark leading-tight">
                Une approche <span className="italic text-saney-accent">sur-mesure</span> de l'onglerie
              </h3>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Situe au coeur de Beziers, Maison de Saney est un salon intimiste dedie a la beaute des mains et des pieds. Nous avons imagine un espace chaleureux ou chaque detail compte, du soin des cuticules aux finitions miroir.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Specialisees en manucure russe, extensions gel/acrygel et nail art haute precision, nous privilegions la qualite et la securite. Chaque rendez-vous debute par un diagnostic personnalise afin d'adapter la preparation, la forme et les produits a vos ongles.
            </p>

            <div className="flex items-start gap-4 p-6 bg-saney-cream border-l-4 border-saney-gold">
              <div className="flex-1">
                <h4 className="font-serif text-xl text-saney-dark mb-2">Uniquement sur Rendez-vous</h4>
                <p className="text-gray-500 italic">
                  Afin de garantir un service privilegie et un temps dedie a chaque cliente, le salon vous accueille exclusivement sur creneau reserve.
                </p>
              </div>
            </div>

            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block mt-2 text-saney-gold font-semibold uppercase tracking-wide text-sm hover:text-saney-dark transition-colors"
            >
              Voir les realisations sur Instagram
            </a>
            <a 
              href={PLANITY_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block ml-4 text-saney-dark font-semibold uppercase tracking-wide text-sm hover:text-saney-gold transition-colors"
            >
              Reserver sur Planity
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
