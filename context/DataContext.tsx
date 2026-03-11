import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceItem, Product, GalleryImage, Formation, QuestionnaireAnswer, ContactMessage, User, Order } from '../types';
import { SERVICES, PRODUCTS, GALLERY_IMAGES } from '../constants';
import { supabase } from '../lib/supabase';

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
  addService: (service: ServiceItem) => Promise<void>;
  updateService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  addGalleryImage: (image: GalleryImage) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;

  addFormation: (formation: Formation) => Promise<void>;
  updateFormation: (formation: Formation) => Promise<void>;
  deleteFormation: (id: string) => Promise<void>;

  addQuestionnaireAnswer: (answer: QuestionnaireAnswer) => Promise<void>;
  
  addContactMessage: (message: ContactMessage) => Promise<void>;
  markMessageAsRead: (id: string) => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;
  replyToMessage: (id: string, replyText: string) => Promise<void>;

  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;

  addUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    return GALLERY_IMAGES.map((url, index) => ({
      id: `gal_${index}`,
      url,
      category: 'General',
      title: `Gallery Image ${index + 1}`
    }));
  });
  const [formations, setFormations] = useState<Formation[]>([]);
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireAnswer[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch initial data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      console.log("DataContext: Fetching all data...");
      try {
        // Public Data
        const [servicesRes, productsRes, galleryRes, formationsRes] = await Promise.all([
          supabase.from('services').select('*'),
          supabase.from('products').select('*'),
          supabase.from('gallery').select('*'),
          supabase.from('formations').select('*')
        ]);

        if (servicesRes.data) {
          setServices(servicesRes.data.map(s => ({ ...s, iconName: s.icon_name, image: s.image_url })));
        }
        if (productsRes.data) {
          setProducts(productsRes.data.map(p => ({ ...p, image: p.image_url })));
        }
        if (galleryRes.data) {
          setGalleryImages(galleryRes.data.map(g => ({ id: g.id, url: g.image_url, category: g.category, title: g.title })));
        }
        if (formationsRes.data) {
          setFormations(formationsRes.data.map(f => ({ ...f, image: f.image_url })));
        }

        // Auth-dependent Data
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log("DataContext: Fetching user-specific data...");
          const [ordersRes, questionnairesRes, messagesRes] = await Promise.all([
            supabase.from('orders').select('*'),
            supabase.from('questionnaires').select('*'),
            supabase.from('messages').select('*').order('created_at', { ascending: false })
          ]);

          if (ordersRes.data) {
            setOrders(ordersRes.data.map(o => ({ ...o, userId: o.user_id, total: o.total_amount, items: o.items, createdAt: o.created_at })));
          }
          if (questionnairesRes.data) {
            setQuestionnaires(questionnairesRes.data.map(q => ({ id: q.id, formationId: q.formation_id, userId: q.user_id, userName: q.user_name, userEmail: q.user_email, answers: q.answers, submittedAt: q.submitted_at })));
          }
          if (messagesRes.data) {
            setContactMessages(messagesRes.data.map(m => ({ ...m, read: m.is_read, createdAt: m.created_at, adminReply: m.admin_reply, replyAt: m.reply_at })));
          }
        }
      } catch (err) {
        console.error("DataContext: Fetch error:", err);
      }
    };

    fetchData();

    // Listen for Auth changes to re-fetch private data
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchData();
      } else if (event === 'SIGNED_OUT') {
        setOrders([]);
        setContactMessages([]);
        setQuestionnaires([]);
      }
    });

    // Real-time Incremental Updates (The "Live" Part)
    const channel = supabase.channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
        console.log("Realtime Message Change:", payload);
        if (payload.eventType === 'INSERT') {
          const newMsg = payload.new as any;
          setContactMessages(prev => [{ ...newMsg, read: newMsg.is_read, createdAt: newMsg.created_at, adminReply: newMsg.admin_reply, replyAt: newMsg.reply_at }, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          const updatedMsg = payload.new as any;
          setContactMessages(prev => prev.map(m => m.id === updatedMsg.id ? { ...updatedMsg, read: updatedMsg.is_read, createdAt: updatedMsg.created_at, adminReply: updatedMsg.admin_reply, replyAt: updatedMsg.reply_at } : m));
        } else if (payload.eventType === 'DELETE') {
          setContactMessages(prev => prev.filter(m => m.id !== payload.old.id));
        }
      })
      // Repeat for other tables if necessary, but focus on messages for now
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchData)
      .subscribe((status) => {
        console.log("Realtime Status:", status);
      });

    return () => {
      authSub.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  // CRUD Implementations
  const addService = async (item: ServiceItem) => {
    const { data, error } = await supabase.from('services').insert({
      title: item.title,
      description: item.description,
      benefits: item.benefits,
      duration: item.duration,
      price: item.price,
      icon_name: item.iconName,
      image_url: item.image
    }).select().single();

    if (data && !error) {
      setServices(prev => [...prev, { ...item, id: data.id }]);
    }
  };

  const updateService = async (item: ServiceItem) => {
    const { error } = await supabase.from('services').update({
      title: item.title,
      description: item.description,
      benefits: item.benefits,
      duration: item.duration,
      price: item.price,
      icon_name: item.iconName,
      image_url: item.image
    }).eq('id', item.id);

    if (!error) {
      setServices(prev => prev.map(s => s.id === item.id ? item : s));
    }
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const addProduct = async (item: Product) => {
    const { data, error } = await supabase.from('products').insert({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image_url: item.image
    }).select().single();

    if (data && !error) {
      setProducts(prev => [...prev, { ...item, id: data.id }]);
    }
  };

  const updateProduct = async (item: Product) => {
    const { error } = await supabase.from('products').update({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image_url: item.image
    }).eq('id', item.id);

    if (!error) {
      setProducts(prev => prev.map(p => p.id === item.id ? item : p));
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const addGalleryImage = async (item: GalleryImage) => {
    const { data, error } = await supabase.from('gallery').insert({
      image_url: item.url,
      category: item.category,
      title: item.title
    }).select().single();

    if (data && !error) {
      setGalleryImages(prev => [...prev, { ...item, id: data.id }]);
    }
  };

  const deleteGalleryImage = async (id: string) => {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (!error) {
      setGalleryImages(prev => prev.filter(img => img.id !== id));
    }
  };

  const addFormation = async (item: Formation) => {
    const { data, error } = await supabase.from('formations').insert({
      title: item.title,
      description: item.description,
      price: item.price,
      duration: item.duration,
      image_url: item.image,
      program: item.program
    }).select().single();

    if (data && !error) {
      setFormations(prev => [...prev, { ...item, id: data.id }]);
    }
  };

  const updateFormation = async (item: Formation) => {
    const { error } = await supabase.from('formations').update({
      title: item.title,
      description: item.description,
      price: item.price,
      duration: item.duration,
      image_url: item.image,
      program: item.program
    }).eq('id', item.id);

    if (!error) {
      setFormations(prev => prev.map(f => f.id === item.id ? item : f));
    }
  };

  const deleteFormation = async (id: string) => {
    const { error } = await supabase.from('formations').delete().eq('id', id);
    if (!error) {
      setFormations(prev => prev.filter(f => f.id !== id));
    }
  };

  const addQuestionnaireAnswer = async (item: QuestionnaireAnswer) => {
    const { data, error } = await supabase.from('questionnaires').insert({
      formation_id: item.formationId === 'general' ? null : item.formationId,
      user_id: item.userId,
      user_name: item.userName,
      user_email: item.userEmail,
      answers: item.answers
    }).select().single();

    if (data && !error) {
      setQuestionnaires(prev => [...prev, { ...item, id: data.id }]);
    }
  };

  const addContactMessage = async (item: ContactMessage) => {
    // If ID is numeric/short (from temp optimistic update), ignore DB insert as it's handled in component
    // Only insert if it looks like a real new message call
    if (item.id.length < 10) return; 

    const { data, error } = await supabase.from('messages').insert({
      name: item.name,
      email: item.email,
      subject: item.subject,
      message: item.message,
      is_read: false
    }).select().single();

    if (data && !error) {
      setContactMessages(prev => [...prev, { 
        ...item, 
        id: data.id, 
        createdAt: data.created_at, 
        read: false 
      }]);
    }
  };

  const markMessageAsRead = async (id: string) => {
    const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id);
    if (!error) {
      setContactMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    }
  };

  const deleteContactMessage = async (id: string) => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
    // No need to manually update state here, real-time will handle it
  };

  const replyToMessage = async (id: string, replyText: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ 
        admin_reply: replyText,
        reply_at: new Date().toISOString(),
        is_read: true
      })
      .eq('id', id);

    if (error) {
      console.error('Error replying to message:', error);
      throw error;
    }
    // No need to manually update state here, real-time will handle it
  };

  const addOrder = async (item: Order) => {
    const { data, error } = await supabase.from('orders').insert({
      user_id: item.userId,
      total_amount: item.total,
      items: item.items,
      status: 'pending'
    }).select().single();

    if (data && !error) {
      setOrders(prev => [...prev, { ...item, id: data.id, createdAt: data.created_at }]);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (!error) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }
  };

  const addUser = async (user: User) => {
    // Users are managed via Auth, this might be redundant or for admin view
    // Here we just update local state if needed for admin UI
    if (!users.some(u => u.email === user.email)) {
      setUsers(prev => [...prev, user]);
    }
  };

  const deleteUser = async (id: string) => {
    // Admin function to delete user profile?
    // Supabase Auth deletion is separate, but we can delete profile
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (!error) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <DataContext.Provider value={{
      services, products, galleryImages, formations, questionnaires, contactMessages, users, orders,
      addService, updateService, deleteService,
      addProduct, updateProduct, deleteProduct,
      addGalleryImage, deleteGalleryImage,
      addFormation, updateFormation, deleteFormation,
      addQuestionnaireAnswer,
      addContactMessage, markMessageAsRead, deleteContactMessage, replyToMessage,
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
