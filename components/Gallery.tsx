import React from 'react';
import { TESTIMONIALS, INSTAGRAM_URL } from '../constants';
import { useData } from '../context/DataContext';
import { Star } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { galleryImages } = useData();

  // Take first 4 images for the masonry layout or use defaults if empty
  const displayImages = galleryImages.length > 0 ? galleryImages : [];
  
  const tiles = [
    { 
      img: displayImages[0]?.url || 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80', 
      alt: displayImages[0]?.category || 'Vitrine', 
      span: 'col-span-2 row-span-2' 
    },
    { 
      img: displayImages[1]?.url || 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80', 
      alt: displayImages[1]?.category || 'Cabine', 
      span: 'col-span-1 row-span-1' 
    },
    { 
      img: displayImages[2]?.url || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80', 
      alt: displayImages[2]?.category || 'Detail', 
      span: 'col-span-1 row-span-2' 
    },
    { 
      img: displayImages[3]?.url || 'https://images.unsplash.com/photo-1519017715179-c6b2f6ee84f1?auto=format&fit=crop&q=80', 
      alt: displayImages[3]?.category || 'Ambiance', 
      span: 'col-span-1 row-span-1' 
    },
  ];

  return (
    <div className="bg-saney-dark text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Temoignages</h2>
            <h3 className="font-serif text-4xl text-white">Vos avis comptent</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white/5 p-8 border border-white/10 hover:border-saney-gold/50 transition-colors duration-300 backdrop-blur-sm">
                <div className="flex gap-1 mb-4 text-saney-gold">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="font-serif text-lg text-white">{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Masonry Gallery */}
        <div>
           <div className="text-center mb-12">
            <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Galerie</h2>
            <h3 className="font-serif text-4xl text-white">L'Univers Maison Saney</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
            {tiles.map((tile, idx) => (
              <div
                key={tile.alt}
                className={`${tile.span} overflow-hidden relative group`}
              >
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  <img
                    src={tile.img}
                    alt={tile.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
