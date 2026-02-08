import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Facebook, Clock, ArrowRight, Send } from 'lucide-react';
import { ADDRESS, PHONE, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, INSTAGRAM_URL, PLANITY_URL, CONTACT_IMAGE } from '../constants';
import { useData } from '../context/DataContext';

export const Contact: React.FC = () => {
  const { addContactMessage } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContactMessage({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      read: false,
      createdAt: new Date().toISOString()
    });
    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-saney-beige/30 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row mb-12">
          
          {/* Info Side */}
          <div className="lg:w-1/2 p-12 lg:p-16 space-y-10">
            <div>
              <h2 className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">Contact</h2>
              <h3 className="font-serif text-4xl text-saney-dark">Rendez-vous & Accès</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-saney-cream p-3 rounded-full text-saney-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Adresse</h4>
                  <p className="text-gray-600">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-saney-cream p-3 rounded-full text-saney-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Téléphone</h4>
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-gray-600 hover:text-saney-gold transition-colors text-lg font-serif">
                    {PHONE}
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Uniquement sur rendez-vous</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-saney-cream p-3 rounded-full text-saney-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Horaires</h4>
                  <p className="text-gray-600">Lundi - Samedi</p>
                  <p className="text-gray-600">Sur créneau réservé</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
               <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-4">Suivez-nous</h4>
               <div className="flex gap-4">
                 <a href={INSTAGRAM_URL} className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors" target="_blank" rel="noreferrer">
                    <Instagram size={24} />
                    <span className="text-sm">{SOCIAL_INSTAGRAM}</span>
                 </a>
                 <a href={INSTAGRAM_URL} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noreferrer">
                    <Facebook size={24} />
                    <span className="text-sm">{SOCIAL_FACEBOOK}</span>
                 </a>
               </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="lg:w-1/2 bg-gray-50 p-12 lg:p-16">
            <h3 className="font-serif text-2xl text-saney-dark mb-6">Envoyez-nous un message</h3>
            
            {success ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center gap-2">
                <Send size={20} />
                <p>Message envoyé avec succès ! Nous vous répondrons bientôt.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-saney-gold focus:border-saney-gold outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-saney-gold focus:border-saney-gold outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-saney-gold focus:border-saney-gold outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-saney-gold focus:border-saney-gold outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-saney-dark text-white py-3 rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Envoyer
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Image Banner */}
        <div className="relative h-[400px] w-full bg-gray-200 overflow-hidden shadow-xl">
           <img
            src={CONTACT_IMAGE}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
            alt="Localisation du salon"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md px-8 py-6 shadow-xl text-center border-2 border-white">
              <p className="font-serif text-xl text-saney-dark font-bold mb-1">Maison de Saney</p>
              <p className="font-serif text-lg text-gray-800">18 Av. Jean Moulin</p>
              <p className="text-sm text-gray-600">34500 Béziers</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a 
                  href="https://maps.google.com/?q=18+Avenue+Jean+Moulin+34500+Beziers" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-saney-gold hover:text-saney-dark font-bold text-sm pointer-events-auto"
                >
                  Voir sur la carte →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
