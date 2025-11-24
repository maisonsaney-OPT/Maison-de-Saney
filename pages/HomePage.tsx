import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { NAV_LINKS } from '../constants';

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NAV_LINKS.filter(link => link.href !== '/').map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="border border-saney-beige bg-saney-cream hover:bg-saney-beige/50 transition p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <h3 className="font-serif text-xl text-saney-dark mb-2">{link.label}</h3>
                  <p className="text-sm text-gray-600">Decouvrir {link.label.toLowerCase()} en detail.</p>
                </div>
                <span className="mt-4 text-saney-gold font-semibold uppercase text-xs tracking-wide">Acceder</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
