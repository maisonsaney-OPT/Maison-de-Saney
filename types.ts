import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  category?: string;
  title: string;
  description: string;
  benefits: string[];
  duration?: string;
  price?: string;
  iconName?: string;
  image?: string;
  sortOrder?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogInlineLink {
  label: string;
  href: string;
  description: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  heroImage: string;
  heroAlt: string;
  localAngle: string;
  intro: string;
  sections: BlogSection[];
  faq?: BlogFaqItem[];
  internalLinks: BlogInlineLink[];
  relatedSlugs: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  program: string[];
  sortOrder?: number;
}

export interface QuestionnaireAnswer {
  id: string;
  formationId: string;
  userId?: string;
  userEmail: string;
  userName: string;
  answers: Record<string, string>;
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  userId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  adminReply?: string;
  replyAt?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}
