import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceItem, Product, GalleryImage, Formation, QuestionnaireAnswer, ContactMessage, User, Order } from '../types';
import { SERVICES, PRODUCTS, GALLERY_IMAGES } from '../constants';

interface DataContextType {
  services: ServiceItem[];
  products: Product[];
  galleryImages: GalleryImage[];
  formations: Formation[];
  questionnaires: QuestionnaireAnswer[];
  contactMessages: ContactMessage[];
  users: User[];
  orders: Order[];

  // CRUD Operations
  addService: (service: ServiceItem) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;

  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;

  addFormation: (formation: Formation) => void;
  updateFormation: (formation: Formation) => void;
  deleteFormation: (id: string) => void;

  addQuestionnaireAnswer: (answer: QuestionnaireAnswer) => void;
  
  addContactMessage: (message: ContactMessage) => void;
  markMessageAsRead: (id: string) => void;

  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;

  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or Constants
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('saney_services');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('saney_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('saney_gallery');
    if (saved) return JSON.parse(saved);
    // Convert string URLs from constants to GalleryImage objects
    return GALLERY_IMAGES.map((url, index) => ({
      id: `gal_${index}`,
      url,
      category: 'General',
      title: `Gallery Image ${index + 1}`
    }));
  });

  const [formations, setFormations] = useState<Formation[]>(() => {
    const saved = localStorage.getItem('saney_formations');
    return saved ? JSON.parse(saved) : [];
  });

  const [questionnaires, setQuestionnaires] = useState<QuestionnaireAnswer[]>(() => {
    const saved = localStorage.getItem('saney_questionnaires');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('saney_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('saney_users_list');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('saney_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to LocalStorage whenever state changes
  useEffect(() => localStorage.setItem('saney_services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('saney_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('saney_gallery', JSON.stringify(galleryImages)), [galleryImages]);
  useEffect(() => localStorage.setItem('saney_formations', JSON.stringify(formations)), [formations]);
  useEffect(() => localStorage.setItem('saney_questionnaires', JSON.stringify(questionnaires)), [questionnaires]);
  useEffect(() => localStorage.setItem('saney_messages', JSON.stringify(contactMessages)), [contactMessages]);
  useEffect(() => localStorage.setItem('saney_users_list', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('saney_orders', JSON.stringify(orders)), [orders]);

  // CRUD Implementations
  const addService = (item: ServiceItem) => setServices([...services, item]);
  const updateService = (item: ServiceItem) => setServices(services.map(s => s.id === item.id ? item : s));
  const deleteService = (id: string) => setServices(services.filter(s => s.id !== id));

  const addProduct = (item: Product) => setProducts([...products, item]);
  const updateProduct = (item: Product) => setProducts(products.map(p => p.id === item.id ? item : p));
  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

  const addGalleryImage = (item: GalleryImage) => setGalleryImages([...galleryImages, item]);
  const deleteGalleryImage = (id: string) => setGalleryImages(galleryImages.filter(img => img.id !== id));

  const addFormation = (item: Formation) => setFormations([...formations, item]);
  const updateFormation = (item: Formation) => setFormations(formations.map(f => f.id === item.id ? item : f));
  const deleteFormation = (id: string) => setFormations(formations.filter(f => f.id !== id));

  const addQuestionnaireAnswer = (item: QuestionnaireAnswer) => setQuestionnaires([...questionnaires, item]);

  const addContactMessage = (item: ContactMessage) => setContactMessages([...contactMessages, item]);
  const markMessageAsRead = (id: string) => setContactMessages(contactMessages.map(m => m.id === id ? { ...m, read: true } : m));

  const addOrder = (item: Order) => setOrders([...orders, item]);
  const updateOrderStatus = (id: string, status: Order['status']) => setOrders(orders.map(o => o.id === id ? { ...o, status } : o));

  const addUser = (user: User) => {
    if (!users.some(u => u.email === user.email)) {
      setUsers([...users, user]);
    }
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <DataContext.Provider value={{
      services, products, galleryImages, formations, questionnaires, contactMessages, users, orders,
      addService, updateService, deleteService,
      addProduct, updateProduct, deleteProduct,
      addGalleryImage, deleteGalleryImage,
      addFormation, updateFormation, deleteFormation,
      addQuestionnaireAnswer,
      addContactMessage, markMessageAsRead,
      addOrder, updateOrderStatus,
      addUser, deleteUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
