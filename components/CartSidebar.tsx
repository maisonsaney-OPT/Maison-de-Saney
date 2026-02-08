import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useData();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!user) {
      alert("Veuillez vous connecter pour passer commande.");
      setIsCartOpen(false);
      navigate('/login');
      return;
    }

    const order = {
      id: `CMD-${Date.now()}`,
      userId: user.id,
      items: [...items],
      total: total,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    setIsCartOpen(false);
    alert("Commande passée avec succès !");
    navigate('/client');
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="font-serif text-2xl text-saney-dark flex items-center gap-2">
              <ShoppingBag className="text-saney-gold" />
              Mon Panier
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <ShoppingBag size={40} className="text-gray-300" />
                </div>
                <p className="text-gray-500 text-lg">Votre panier est vide</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-saney-gold font-bold hover:underline"
                >
                  Continuer mes achats
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-saney-dark font-bold line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="font-bold text-saney-dark">{item.price.toFixed(2)} €</div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-saney-gold disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-saney-gold"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold text-saney-dark">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <p className="text-xs text-gray-500 text-center">Frais de port calculés à l'étape suivante</p>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-saney-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-lg"
              >
                Commander
              </button>
              
              <button 
                onClick={clearCart}
                className="w-full text-xs text-gray-400 hover:text-red-500 underline"
              >
                Vider le panier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
