import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Mail, Check, Trash2, Reply, Send, X } from 'lucide-react';

export const AdminMessagesPage: React.FC = () => {
  const { contactMessages, deleteContactMessage, markMessageAsRead, replyToMessage } = useData();
  const [replyingTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleDelete = async (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce message ?')) {
      try {
        await deleteContactMessage(id);
      } catch (error) {
        alert('Erreur lors de la suppression.');
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleReply = async (id: string) => {
    if (!replyText.trim()) return;

    try {
      await replyToMessage(id, replyText);
      setReplyTo(null);
      setReplyText('');
      alert('Réponse envoyée avec succès !');
    } catch (error) {
      alert("Erreur lors de l'envoi de la réponse.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Messages reçus ({contactMessages.length})</h1>

      <div className="space-y-4">
        {contactMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${
              msg.read ? 'border-gray-100' : 'border-saney-gold/30 ring-1 ring-saney-gold/10'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${msg.read ? 'bg-gray-100 text-gray-400' : 'bg-saney-cream text-saney-dark'}`}>
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{msg.name}</h3>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{msg.subject}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()} à {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
                <div className="flex items-center gap-2">
                  {!msg.read && (
                    <button 
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="text-saney-gold hover:text-saney-dark text-xs font-medium flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded"
                    >
                      <Check size={14} /> Marquer lu
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pl-14 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
            </div>

            {/* Reply Section */}
            <div className="pl-14 pt-4 border-t border-gray-50">
              {msg.adminReply ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-saney-dark mb-1">
                    <Reply size={14} className="transform rotate-180" />
                    Réponse envoyée le {new Date(msg.replyAt!).toLocaleDateString()}
                  </div>
                  <p className="text-sm text-gray-600">{msg.adminReply}</p>
                </div>
              ) : (
                replyingTo === msg.id ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-gray-700">Répondre à {msg.name}</span>
                      <button onClick={() => setReplyTo(null)} className="text-gray-400 hover:text-gray-600">
                        <X size={16} />
                      </button>
                    </div>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-saney-gold focus:border-saney-gold outline-none mb-3"
                      rows={3}
                      placeholder="Votre réponse..."
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setReplyTo(null)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={() => handleReply(msg.id)}
                        disabled={!replyText.trim()}
                        className="px-3 py-1.5 text-xs font-bold bg-saney-dark text-white rounded hover:bg-black transition-colors flex items-center gap-1 disabled:opacity-50"
                      >
                        <Send size={12} /> Envoyer
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setReplyTo(msg.id);
                      setReplyText('');
                    }}
                    className="text-sm text-gray-500 hover:text-saney-gold flex items-center gap-1 transition-colors"
                  >
                    <Reply size={16} /> Répondre
                  </button>
                )
              )}
            </div>
          </div>
        ))}

        {contactMessages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Mail size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun message pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
