import React from 'react';
import {
  CalendarDays,
  Clock3,
  Sparkles,
  Syringe,
  Wind,
  Scissors,
} from 'lucide-react';
import { PLANITY_URL, SERVICE_CATEGORY_VISUALS } from '../constants';
import { useData } from '../context/DataContext';
import { ServiceItem } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Syringe,
  Wind,
  Scissors,
};

const groupByCategory = (services: ServiceItem[]) =>
  services.reduce<Record<string, ServiceItem[]>>((acc, service) => {
    const category = service.category || 'Prestations';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

export const Services: React.FC = () => {
  const { services } = useData();
  const groupedServices = groupByCategory(
    [...services].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
  );

  return (
    <div className="bg-saney-cream py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Nos Prestations</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-saney-dark mb-6">Le catalogue Maison de Saney</h3>
          <div className="w-24 h-1 bg-saney-accent mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Retrouvez les prestations visibles sur Planity, classees par categorie pour une lecture plus fluide.
            Chaque ligne vous permet de reserver directement votre rendez-vous.
          </p>
        </div>

        <div className="space-y-14">
          {Object.entries(groupedServices).map(([category, categoryServices]) => {
            const heroImage = SERVICE_CATEGORY_VISUALS[category];
            const Icon = ICON_MAP[categoryServices[0]?.iconName || 'Sparkles'] || Sparkles;

            return (
              <section key={category} className="bg-white border border-saney-beige/70 shadow-sm overflow-hidden">
                <div className="grid lg:grid-cols-[260px_1fr]">
                  <div className="relative min-h-[220px]">
                    <img
                      src={heroImage}
                      alt={category}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-saney-dark/55" />
                    <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
                      <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                        <Icon size={22} />
                      </div>
                      <p className="uppercase tracking-[0.2em] text-xs text-saney-beige mb-2">Catégorie</p>
                      <h4 className="font-serif text-3xl leading-tight">{category}</h4>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 lg:p-8">
                    <div className="space-y-3">
                      {categoryServices.map((service) => (
                        <div
                          key={service.id}
                          className="grid gap-5 border border-gray-100 bg-saney-cream/60 p-5 md:grid-cols-[1fr_auto_auto] md:items-center"
                        >
                          <div>
                            <h5 className="text-xl font-semibold text-saney-dark">{service.title}</h5>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
                          </div>

                          <div className="text-sm text-gray-500 min-w-[130px]">
                            <div className="inline-flex items-center gap-2 mb-2">
                              <Clock3 size={15} className="text-saney-gold" />
                              <span>{service.duration}</span>
                            </div>
                            <div className="font-semibold text-saney-dark">{service.price}</div>
                          </div>

                          <a
                            href={PLANITY_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-saney-dark px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-saney-gold"
                          >
                            <CalendarDays size={15} />
                            Prendre rendez-vous
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
