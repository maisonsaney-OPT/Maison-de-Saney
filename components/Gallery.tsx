import React from 'react';
import { TESTIMONIALS, INSTAGRAM_URL, GALLERY_IMAGES } from '../constants';
import { Star } from 'lucide-react';

export const Gallery: React.FC = () => {
  // Use all images from constants
  const displayImages = GALLERY_IMAGES;

  return (
    <div className="bg-saney-dark text-white py-24 overflow-hidden">
      <div className="max-w-full">
        
        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Témoignages</h2>
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

        {/* Infinite Scroll Gallery */}
        <div>
           <div className="text-center mb-12">
            <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Galerie</h2>
            <h3 className="font-serif text-4xl text-white">L'Univers Maison Saney</h3>
          </div>
          
          <div className="relative w-full overflow-hidden py-10">
            {/* Row 1: Left to Right */}
            <div className="flex w-full mb-8">
              <div className="flex animate-scroll-slow whitespace-nowrap">
                {[...displayImages, ...displayImages].map((src, idx) => (
                  <div key={`row1-${idx}`} className="flex-shrink-0 w-[300px] h-[400px] mx-4 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                      src={src}
                      alt={`Gallery ${idx}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Right to Left (reverse scroll would need custom keyframe, reusing scroll for now or we can add reverse) */}
            {/* For simplicity and effect, we can use the same scroll but offset or different speed if config allowed, 
                but let's stick to a clean single large flow or two rows moving same direction for now to ensure smoothness without complex CSS additions inline. 
                Actually, let's make it a single impressive row or grid. 
                User asked for "scrolling or showcasing pictures each in its perfect state". 
                Let's do a single high-quality infinite scroll row.
            */}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block border-b border-saney-gold text-saney-gold pb-1 hover:text-white hover:border-white transition-all"
            >
              Voir plus sur Instagram
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
