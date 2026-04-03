import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HOME_EXPLORER_CARDS } from '../constants';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-saney-cream">
      <Hero />
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Explorer</h2>
            <p className="font-serif text-3xl text-saney-dark">Choisissez votre experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {HOME_EXPLORER_CARDS.map((card) => {
              const className = `group border border-saney-beige bg-saney-cream overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`;
              const content = (
                <>
                  <div className="h-40 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between min-h-[190px]">
                    <div>
                      <h3 className="font-serif text-xl text-saney-dark mb-2">{card.label}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-saney-gold font-semibold uppercase text-xs tracking-wide">
                      Accéder
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </>
              );

              if (card.external) {
                return (
                  <a
                    key={card.href}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={card.href} to={card.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 bg-saney-dark text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-saney-gold uppercase tracking-[0.2em] text-xs font-bold mb-2">Prendre RDV</p>
              <h3 className="font-serif text-3xl mb-2">Réservez directement sur Planity</h3>
              <p className="text-white/75 max-w-2xl">
                Retrouvez toutes les disponibilites de Maison de Saney et choisissez votre prestation en quelques clics.
              </p>
            </div>
            <a
              href="https://www.planity.com/maison-de-saney-34500-beziers"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-saney-gold text-white px-6 py-4 font-semibold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-saney-dark transition-colors"
            >
              Ouvrir Planity
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
