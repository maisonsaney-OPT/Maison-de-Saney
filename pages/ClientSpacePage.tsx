import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ShoppingBag, MessageSquare, LogOut, Send, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClientSpacePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { addContactMessage, orders, contactMessages } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'messages'>('orders');
  const [newMessage, setNewMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      addContactMessage({
        id: Math.random().toString(36).substr(2, 9),
        name: user.name,
        email: user.email,
        subject: 'Message depuis Espace Client',
        message: newMessage,
        read: false,
        createdAt: new Date().toISOString()
      });
      setNewMessage('');
      setSuccessMsg('Votre message a été envoyé avec succès !');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const userOrders = orders.filter(o => o.userId === user.id);
  // Filter messages for current user
  const userMessages = contactMessages
    .filter(m => m.email === user.email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-saney-dark p-8 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold">Bonjour, {user.name}</h1>
                <p className="text-white/70">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>

          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'orders' ? 'text-saney-dark border-b-2 border-saney-dark' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                Mes Commandes
              </div>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'messages' ? 'text-saney-dark border-b-2 border-saney-dark' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageSquare size={20} />
                Mes Messages
              </div>
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'orders' ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Historique des commandes</h2>
                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Vous n'avez pas encore passé de commande.</p>
                  </div>
                ) : (
                  userOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-lg">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status === 'pending' ? 'En attente' : order.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">{new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-700 text-sm">
                          {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-saney-dark">{order.total.toFixed(2)} €</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Contacter le service client</h2>
                
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h3 className="font-bold mb-4">Envoyer un message</h3>
                  <form onSubmit={handleSendMessage}>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-saney-gold focus:border-saney-gold h-32 mb-4"
                      placeholder="Comment pouvons-nous vous aider ?"
                      required
                    />
                    <div className="flex justify-between items-center">
                      {successMsg && <p className="text-green-600 text-sm font-medium">{successMsg}</p>}
                      <button
                        type="submit"
                        className="bg-saney-dark text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition-colors flex items-center gap-2 ml-auto"
                      >
                        <Send size={18} />
                        Envoyer
                      </button>
                    </div>
                  </form>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700">Historique des messages</h3>
                  {userMessages.length > 0 ? (
                    userMessages.map((msg) => (
                      <div key={msg.id} className="border border-gray-100 rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-gray-500 text-xs">
                            {new Date(msg.createdAt).toLocaleDateString()} à {new Date(msg.createdAt).toLocaleTimeString()}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${msg.read ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {msg.read ? 'Lu' : 'Envoyé'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Vous avez écrit :</p>
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm">{msg.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      Aucun message envoyé pour le moment.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
