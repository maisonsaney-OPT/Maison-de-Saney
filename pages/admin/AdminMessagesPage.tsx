import React from 'react';
import { useData } from '../../context/DataContext';
import { Mail, Check, Trash2 } from 'lucide-react';

export const AdminMessagesPage: React.FC = () => {
  const { contactMessages, markMessageAsRead } = useData();

  // Sort by date desc
  const sortedMessages = [...contactMessages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Messages reçus</h1>

      <div className="space-y-4">
        {sortedMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${
              msg.read ? 'border-gray-100 opacity-75' : 'border-saney-gold/30 ring-1 ring-saney-gold/10'
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
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()} à {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
                {!msg.read && (
                  <button 
                    onClick={() => markMessageAsRead(msg.id)}
                    className="text-saney-gold hover:text-saney-dark text-sm font-medium flex items-center gap-1"
                  >
                    <Check size={16} /> Marquer comme lu
                  </button>
                )}
              </div>
            </div>
            
            <div className="pl-14">
              <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
            </div>
          </div>
        ))}

        {sortedMessages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Mail size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun message pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
