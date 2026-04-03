import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { APP_NAME } from '../constants';

export const ProductsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-saney-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl text-saney-dark">Boutique {APP_NAME}</h1>
          <div className="w-24 h-1 bg-saney-gold mx-auto"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Nous préparons actuellement une sélection de produits et de coffrets Maison de Saney.
            La boutique en ligne sera bientôt disponible.
          </p>
        </div>

        <div className="bg-white border border-saney-beige shadow-sm p-10 md:p-16 text-center">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-saney-cream flex items-center justify-center">
            <ShoppingBag size={34} className="text-saney-gold" />
          </div>
          <p className="text-saney-gold text-xs font-bold uppercase tracking-[0.25em] mb-3">Bientôt disponible</p>
          <h2 className="font-serif text-3xl md:text-4xl text-saney-dark mb-4">La boutique arrive prochainement</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nous mettons en place une boutique en ligne soignée pour vous proposer nos essentiels beauté,
            cartes cadeaux et sélections exclusives. Revenez très bientôt.
          </p>
        </div>
      </div>
    </div>
  );
};
