import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Formation } from '../../types';
import { Edit, Trash2, Plus, X, Save, FileText, ChevronRight } from 'lucide-react';

export const AdminFormationsPage: React.FC = () => {
  const { formations, questionnaires, addFormation, updateFormation, deleteFormation } = useData();
  const [activeTab, setActiveTab] = useState<'formations' | 'questionnaires'>('formations');
  const [isEditing, setIsEditing] = useState(false);
  const [currentFormation, setCurrentFormation] = useState<Partial<Formation>>({});
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string | null>(null);

  // --- Formation CRUD Handlers ---
  const handleEdit = (formation: Formation) => {
    setCurrentFormation(formation);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentFormation({
      id: Math.random().toString(36).substr(2, 9),
      program: []
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentFormation.id && currentFormation.title) {
      if (formations.find(f => f.id === currentFormation.id)) {
        updateFormation(currentFormation as Formation);
      } else {
        addFormation(currentFormation as Formation);
      }
      setIsEditing(false);
      setCurrentFormation({});
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      deleteFormation(id);
    }
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Split by new line to create array
    const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
    setCurrentFormation({ ...currentFormation, program: lines });
  };

  // --- Render Functions ---

  const renderFormationsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">Catalogue des Formations</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-saney-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Plus size={20} />
          Ajouter une formation
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              {formations.find(f => f.id === currentFormation.id) ? 'Modifier la formation' : 'Nouvelle formation'}
            </h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input
                type="text"
                value={currentFormation.title || ''}
                onChange={e => setCurrentFormation({ ...currentFormation, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={currentFormation.description || ''}
                onChange={e => setCurrentFormation({ ...currentFormation, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                <input
                  type="number"
                  value={currentFormation.price || ''}
                  onChange={e => setCurrentFormation({ ...currentFormation, price: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                <input
                  type="text"
                  value={currentFormation.duration || ''}
                  onChange={e => setCurrentFormation({ ...currentFormation, duration: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={currentFormation.image || ''}
                onChange={e => setCurrentFormation({ ...currentFormation, image: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Programme (un élément par ligne)</label>
              <textarea
                value={currentFormation.program?.join('\n') || ''}
                onChange={handleProgramChange}
                className="w-full p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold h-32"
                placeholder="Module 1: Introduction&#10;Module 2: Pratique..."
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
        <div className="space-y-4">
          {formations.map((formation) => (
            <div key={formation.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-6">
              <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                {formation.image && <img src={formation.image} alt={formation.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{formation.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                      <span>{formation.duration}</span>
                      <span>{formation.price} €</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(formation)} className="text-blue-500 hover:text-blue-700 p-2">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(formation.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{formation.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {formation.program.slice(0, 3).map((mod, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{mod}</span>
                  ))}
                  {formation.program.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">+{formation.program.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderQuestionnairesTab = () => {
    if (selectedQuestionnaire) {
      const q = questionnaires.find(q => q.id === selectedQuestionnaire);
      if (!q) return <div>Questionnaire introuvable</div>;
      const formation = formations.find(f => f.id === q.formationId);

      return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setSelectedQuestionnaire(null)}
            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-saney-dark"
          >
            <ChevronRight className="rotate-180" size={20} />
            Retour à la liste
          </button>

          <div className="border-b border-gray-100 pb-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{q.userName}</h3>
            <p className="text-gray-500">{q.userEmail}</p>
            <p className="text-sm text-gray-400 mt-1">Soumis le {new Date(q.submittedAt).toLocaleDateString()}</p>
            <div className="mt-4 inline-block bg-saney-cream px-3 py-1 rounded-full text-saney-dark text-sm font-medium">
              Formation : {formation?.title || 'Inconnue'}
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(q.answers).map(([question, answer], idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">{question}</p>
                <p className="text-gray-700">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Candidat</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Formation</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {questionnaires.map((q) => {
              const formation = formations.find(f => f.id === q.formationId);
              return (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{q.userName}</p>
                    <p className="text-sm text-gray-500">{q.userEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formation?.title || 'Formation supprimée'}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(q.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedQuestionnaire(q.id)}
                      className="text-saney-gold hover:text-saney-dark font-medium text-sm flex items-center gap-1"
                    >
                      Voir les réponses <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {questionnaires.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Aucun questionnaire reçu pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === 'formations' ? 'text-saney-dark' : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => { setActiveTab('formations'); setSelectedQuestionnaire(null); }}
        >
          Formations
          {activeTab === 'formations' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-saney-dark"></div>}
        </button>
        <button
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === 'questionnaires' ? 'text-saney-dark' : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => setActiveTab('questionnaires')}
        >
          Questionnaires Reçus
          {activeTab === 'questionnaires' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-saney-dark"></div>}
        </button>
      </div>

      {activeTab === 'formations' ? renderFormationsTab() : renderQuestionnairesTab()}
    </div>
  );
};
