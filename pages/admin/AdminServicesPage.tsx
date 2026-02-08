import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceItem } from '../../types';
import { Edit, Trash2, Plus, X, Save } from 'lucide-react';
import { Sparkles, Syringe, Wind, Scissors } from 'lucide-react';

export const AdminServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<ServiceItem>>({});
  const [newBenefit, setNewBenefit] = useState('');

  const AVAILABLE_ICONS = [
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Syringe', icon: Syringe },
    { name: 'Wind', icon: Wind },
    { name: 'Scissors', icon: Scissors }
  ];

  const handleEdit = (service: ServiceItem) => {
    setCurrentService(service);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentService({
      id: Math.random().toString(36).substr(2, 9),
      benefits: [],
      iconName: 'Sparkles'
    });
    setIsEditing(true);
  };

  const handleAddBenefit = () => {
    if (newBenefit && currentService.benefits) {
      setCurrentService({
        ...currentService,
        benefits: [...currentService.benefits, newBenefit]
      });
      setNewBenefit('');
    } else if (newBenefit) {
      setCurrentService({
        ...currentService,
        benefits: [newBenefit]
      });
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    if (currentService.benefits) {
      const newBenefits = [...currentService.benefits];
      newBenefits.splice(index, 1);
      setCurrentService({
        ...currentService,
        benefits: newBenefits
      });
    }
  };

  const handleSave = () => {
    if (!currentService.title || !currentService.description || !currentService.price) {
      alert('Veuillez remplir les champs obligatoires (Titre, Description, Prix).');
      return;
    }

    if (currentService.id) {
      if (services.find(s => s.id === currentService.id)) {
        updateService(currentService as ServiceItem);
      } else {
        addService(currentService as ServiceItem);
      }
      setIsEditing(false);
      setCurrentService({});
      setNewBenefit('');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      deleteService(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Services</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-saney-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Plus size={20} />
          Ajouter un service
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {services.find(s => s.id === currentService.id) ? 'Modifier le service' : 'Nouveau service'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input
                type="text"
                value={currentService.title || ''}
                onChange={e => setCurrentService({ ...currentService, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={currentService.description || ''}
                onChange={e => setCurrentService({ ...currentService, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                <input
                  type="text"
                  value={currentService.price || ''}
                  onChange={e => setCurrentService({ ...currentService, price: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                <input
                  type="text"
                  value={currentService.duration || ''}
                  onChange={e => setCurrentService({ ...currentService, duration: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
              <div className="flex gap-4">
                {AVAILABLE_ICONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setCurrentService({ ...currentService, iconName: item.name })}
                      className={`p-3 rounded-lg border transition-all ${
                        currentService.iconName === item.name
                          ? 'border-saney-gold bg-saney-cream text-saney-dark'
                          : 'border-gray-200 hover:border-saney-gold/50'
                      }`}
                    >
                      <Icon size={24} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avantages</label>
              <div className="space-y-2 mb-2">
                {currentService.benefits?.map((benefit, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-700">{benefit}</span>
                    <button onClick={() => handleRemoveBenefit(index)} className="text-red-400 hover:text-red-600">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={e => setNewBenefit(e.target.value)}
                  placeholder="Ajouter un avantage..."
                  className="flex-1 p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                  onKeyPress={e => e.key === 'Enter' && handleAddBenefit()}
                />
                <button
                  onClick={handleAddBenefit}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-lg"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={currentService.image || ''}
                onChange={e => setCurrentService({ ...currentService, image: e.target.value })}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
              <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                {service.image && <img src={service.image} alt={service.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-900">{service.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(service)} className="text-blue-500 hover:text-blue-700">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{service.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm font-medium text-saney-dark">
                  <span>{service.price}</span>
                  <span>•</span>
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
