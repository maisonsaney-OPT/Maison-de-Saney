import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ShoppingBag, MessageSquare, Users, GraduationCap, ArrowRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, contactMessages, users, formations, orders } = useData();

  const stats = [
    { label: 'Commandes', value: orders.length, icon: ShoppingBag, color: 'bg-blue-500', link: '/admin/orders' },
    { label: 'Messages', value: contactMessages.length, icon: MessageSquare, color: 'bg-green-500', link: '/admin/messages' },
    { label: 'Clients', value: users.filter(u => u.role === 'client').length, icon: Users, color: 'bg-purple-500', link: '/admin/users' },
    { label: 'Formations', value: formations.length, icon: GraduationCap, color: 'bg-orange-500', link: '/admin/formations' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link to={stat.link} key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`${stat.color} p-4 rounded-full text-white`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Commandes récentes</h2>
          <Link to="/admin/orders" className="text-saney-gold hover:text-saney-dark text-sm font-medium flex items-center gap-1">
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(-5).reverse().map(order => {
                const user = users.find(u => u.id === order.userId);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{user?.name || 'Inconnu'}</td>
                    <td className="py-3 px-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-bold">{order.total.toFixed(2)} €</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status === 'pending' ? 'En attente' : order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {orders.length === 0 && <p className="text-gray-500 italic mt-4 text-center">Aucune commande récente.</p>}
        </div>
      </div>
    </div>
  );
};
