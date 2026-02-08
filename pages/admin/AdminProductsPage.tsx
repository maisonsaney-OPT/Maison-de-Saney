import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { Edit, Trash2, Plus, X, Save } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentProduct({
      id: Math.random().toString(36).substr(2, 9),
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentProduct.name || !currentProduct.price || !currentProduct.category) {
      alert('Veuillez remplir tous les champs obligatoires (Nom, Prix, Catégorie).');
      return;
    }

    if (currentProduct.id) {
      if (products.find(p => p.id === currentProduct.id)) {
        updateProduct(currentProduct as Product);
      } else {
        addProduct(currentProduct as Product);
      }
      setIsEditing(false);
      setCurrentProduct({});
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestion de la Boutique</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-saney-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Plus size={20} />
          Ajouter un produit
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {products.find(p => p.id === currentProduct.id) ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                value={currentProduct.name || ''}
                onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={currentProduct.description || ''}
                onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={currentProduct.price || ''}
                  onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <input
                  type="text"
                  value={currentProduct.category || ''}
                  onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={currentProduct.image || ''}
                onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-saney-dark text-white py-3 rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Enregistrer
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-48 bg-gray-100 relative">
                {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => handleEdit(product)} className="bg-white p-2 rounded-full shadow-md text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="bg-white p-2 rounded-full shadow-md text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs font-bold text-saney-gold uppercase mb-1">{product.category}</div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
                <div className="font-bold text-saney-dark">{product.price.toFixed(2)} €</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
