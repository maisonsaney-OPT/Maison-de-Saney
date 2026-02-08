import React from 'react';
import { useData } from '../context/DataContext';
import { Clock, Tag, Sparkles, Syringe, Wind, Scissors } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Syringe,
  Wind,
  Scissors
};

export const Services: React.FC = () => {
  const { services } = useData();

  return (
    <div className="bg-saney-cream py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Nos Expertises</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-saney-dark mb-6">Soins & Rituels</h3>
          <div className="w-24 h-1 bg-saney-accent mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Nous proposons des prestations ongulaires precises, avec une preparation douce et des finitions impeccables. Chaque soin est adapte a la forme, a la longueur et au style que vous souhaitez.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const photo = service.image || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80';
            const Icon = service.iconName ? ICON_MAP[service.iconName] : null;
            
            return (
            <div key={service.id} className="bg-white group hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                {Icon && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-saney-gold shadow-lg">
                    <Icon size={24} />
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <h4 className="font-serif text-2xl text-saney-dark mb-3 group-hover:text-saney-gold transition-colors">{service.title}</h4>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">
                  {service.description}
                </p>
                
                <div className="space-y-3 border-t border-gray-100 pt-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-saney-accent rounded-full mr-2"></span>
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between text-sm font-medium text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-saney-gold">
                    <Tag size={16} />
                    <span>{service.price}</span>
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
};
