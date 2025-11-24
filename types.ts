import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  duration?: string;
  price?: string;
  icon?: LucideIcon;
  image?: string;
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

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}