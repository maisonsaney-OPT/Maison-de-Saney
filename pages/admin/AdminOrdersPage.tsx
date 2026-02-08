import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Order } from '../../types';
import { Package, Clock, CheckCircle, Truck, XCircle, ChevronDown, ChevronUp, User } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, users } = useData();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'processing': return <Package size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Utilisateur inconnu';
  };

  const getUserEmail = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.email : '';
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  // Sort by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const toggleExpand = (id: string) => {
    if (expandedOrder === id) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(id);
    }
  };

  const handleStatusUpdate = (id: string, newStatus: Order['status']) => {
    updateOrderStatus(id, newStatus);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Commandes</h1>
        <div className="flex gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded-lg focus:ring-saney-gold focus:border-saney-gold bg-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En traitement</option>
            <option value="shipped">Expédié</option>
            <option value="delivered">Livré</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID / Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Client</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 p-1 rounded-full">
                        <User size={16} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{getUserName(order.userId)}</p>
                        <p className="text-xs text-gray-500">{getUserEmail(order.userId)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {order.total.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status === 'pending' && 'En attente'}
                      {order.status === 'processing' && 'En traitement'}
                      {order.status === 'shipped' && 'Expédié'}
                      {order.status === 'delivered' && 'Livré'}
                      {order.status === 'cancelled' && 'Annulé'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleExpand(order.id)}
                      className="text-saney-gold hover:text-saney-dark transition-colors"
                    >
                      {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-3">Détails de la commande</h4>
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm text-gray-900">{item.name}</p>
                                  <p className="text-xs text-gray-500">Qté: {item.quantity} × {item.price.toFixed(2)} €</p>
                                </div>
                                <div className="font-bold text-sm text-gray-900">
                                  {(item.price * item.quantity).toFixed(2)} €
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="w-full md:w-64 space-y-4">
                          <h4 className="font-bold text-gray-800">Mettre à jour le statut</h4>
                          <div className="space-y-2">
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusUpdate(order.id, status as Order['status'])}
                                disabled={order.status === status}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                  order.status === status 
                                    ? 'bg-saney-gold text-white font-medium' 
                                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                                }`}
                              >
                                {status === 'pending' && 'En attente'}
                                {status === 'processing' && 'En traitement'}
                                {status === 'shipped' && 'Expédié'}
                                {status === 'delivered' && 'Livré'}
                                {status === 'cancelled' && 'Annulé'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {sortedOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Aucune commande trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
