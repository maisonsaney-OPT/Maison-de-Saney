import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GalleryImage } from '../../types';
import { Trash2, Plus, X, Save } from 'lucide-react';

export const AdminGalleryPage: React.FC = () => {
  const { galleryImages, addGalleryImage, deleteGalleryImage } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({});

  const handleAdd = () => {
    setNewImage({
      id: `gal_${Date.now()}`,
      category: 'General'
    });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (newImage.url) {
      addGalleryImage(newImage as GalleryImage);
      setIsAdding(false);
      setNewImage({});
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestion de la Galerie</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-saney-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Plus size={20} />
          Ajouter une image
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Nouvelle image</h2>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
              <input
                type="text"
                value={newImage.url || ''}
                onChange={e => setNewImage({ ...newImage, url: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <input
                type="text"
                value={newImage.category || ''}
                onChange={e => setNewImage({ ...newImage, category: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre (optionnel)</label>
              <input
                type="text"
                value={newImage.title || ''}
                onChange={e => setNewImage({ ...newImage, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-saney-dark text-white py-3 rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Ajouter
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative group rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-100">
            <img src={image.url} alt={image.title || 'Gallery'} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => handleDelete(image.id)}
                className="bg-white p-2 rounded-full text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm font-bold">{image.category}</p>
              {image.title && <p className="text-xs">{image.title}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
