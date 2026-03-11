import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ShoppingBag, MessageSquare, LogOut, Send, Package, Home, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const ClientSpacePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { addContactMessage, deleteContactMessage, orders, contactMessages } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'messages'>('orders');
  const [newMessage, setNewMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [msgStatus, setMsgStatus] = useState<'success' | 'error' | ''>('');
  const [isSending, setIsSending] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const getErrorText = (err: unknown) => {
    const anyErr = err as any;
    return (
      anyErr?.message ||
      anyErr?.error_description ||
      anyErr?.details ||
      (typeof anyErr === 'string' ? anyErr : '')
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (newMessage.trim() && user) {
      try {
        setIsSending(true);
        await addContactMessage({
          id: crypto.randomUUID(),
          userId: user.id,
          name: user.name,
          email: user.email,
          subject: 'Message depuis Espace Client',
          message: newMessage,
          read: false,
          createdAt: new Date().toISOString()
        });

        setNewMessage('');
        setMsgStatus('success');
        setSuccessMsg('Votre message a été envoyé avec succès !');
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (error) {
        console.error('Error sending message:', error);
        const detail = getErrorText(error);
        setMsgStatus('error');
        setSuccessMsg(`Erreur lors de l'envoi du message.${detail ? ` (${detail})` : ''}`);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (isDeletingId) return;
    if (window.confirm('Voulez-vous vraiment supprimer ce message ?')) {
      try {
        setIsDeletingId(id);
        await deleteContactMessage(id);
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Erreur lors de la suppression.');
      } finally {
        setIsDeletingId(null);
      }
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const userOrders = orders.filter(o => o.userId === user.id);
  // Filter messages for current user
  const userMessages = contactMessages
    .filter(m => (m.userId ? m.userId === user.id : m.email === user.email))
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
            
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-bold uppercase tracking-wider"
              >
                <Home size={18} />
                Retour au site
              </Link>
              
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-red-500/80 p-2 rounded-lg transition-colors text-white/70 hover:text-white"
                title="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            </div>
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
                      disabled={isSending}
                    />
                    <div className="flex justify-between items-center">
                      {successMsg && (
                        <p className={`text-sm font-medium ${msgStatus === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                          {successMsg}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={isSending || !newMessage.trim()}
                        className="bg-saney-dark text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition-colors flex items-center gap-2 ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Send size={18} />
                        {isSending ? 'Envoi...' : 'Envoyer'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700">Historique des messages</h3>
                  {userMessages.length > 0 ? (
                    userMessages.map((msg) => (
                      <div key={msg.id} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-gray-500 text-xs">
                              {new Date(msg.createdAt).toLocaleDateString()} à {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${msg.read ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {msg.read ? 'Lu' : 'Envoyé'}
                              </span>
                              <button 
                                onClick={() => handleDeleteMessage(msg.id)}
                                disabled={isDeletingId === msg.id}
                                className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                title="Supprimer mon message"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Vous avez écrit :</p>
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm mb-4">{msg.message}</p>
                        
                        {/* Admin Reply */}
                        {msg.adminReply && (
                          <div className="ml-4 pl-4 border-l-2 border-saney-gold/50">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-5 h-5 rounded-full bg-saney-dark text-white flex items-center justify-center text-[10px] font-bold">
                                S
                              </div>
                              <p className="text-saney-dark text-xs font-bold">Réponse de Maison Saney</p>
                              <span className="text-[10px] text-gray-400">
                                {new Date(msg.replyAt!).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm bg-saney-cream/50 p-3 rounded-lg border border-saney-gold/10">
                              {msg.adminReply}
                            </p>
                          </div>
                        )}
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
