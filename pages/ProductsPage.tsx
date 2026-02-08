import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingBag, Plus, Search } from 'lucide-react';
import { APP_NAME } from '../constants';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

export const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const { products } = useData();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, products]);

  return (
    <div className="pt-24 pb-16 bg-saney-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl text-saney-dark">Boutique {APP_NAME}</h1>
          <div className="w-24 h-1 bg-saney-gold mx-auto"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Prolongez l'expérience à la maison avec notre sélection de produits professionnels.
            Soins, vernis et accessoires pour sublimer vos mains au quotidien.
          </p>
          
          {searchQuery && (
            <div className="flex items-center justify-center gap-2 text-saney-dark">
              <Search size={20} />
              <p className="text-lg">
                Résultats pour : <span className="font-bold">"{searchQuery}"</span>
                <span className="ml-2 text-sm text-gray-500">({filteredProducts.length} produits)</span>
              </p>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  
                  {/* Add to Cart Overlay Button (Mobile & Desktop) */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-white text-saney-dark p-3 rounded-full shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-saney-gold hover:text-white"
                    aria-label="Ajouter au panier"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 text-center space-y-3">
                  <div className="text-xs font-bold tracking-widest text-saney-gold uppercase">{product.category}</div>
                  <h3 className="font-serif text-xl text-saney-dark">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">{product.description}</p>
                  <div className="pt-2 text-lg font-bold text-saney-dark">
                    {product.price.toFixed(2)} €
                  </div>
                  
                  {/* Mobile: Always visible 'Add to Cart' button if overlay is tricky on touch */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-4 md:hidden bg-saney-dark text-white py-3 rounded-xl text-sm uppercase tracking-wide font-bold"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 font-serif">Aucun produit ne correspond à votre recherche.</p>
            <button 
              onClick={() => window.location.href = '/products'}
              className="mt-4 text-saney-gold hover:text-saney-dark underline"
            >
              Voir tous les produits
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
