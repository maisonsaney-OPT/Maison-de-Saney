import { ServiceItem, NavLink, Testimonial, Product } from './types';
import brandLogo from './src/logo.jpeg';
import collageOne from './src/4 pics 1.png';
import collageTwo from './src/4 pics 2.png';
import heroImageMobile from './src/9.png';
import salon1 from './src/salon 1.PNG';
import salon2 from './src/salon 2.PNG';
import salon3 from './src/salon 3.PNG';
import salon4 from './src/salon 4.PNG';
import salon5 from './src/salon 5 massage room.PNG';
import vitrine from './src/vitrine.PNG';
import about1 from './src/8.png';
import about2 from './src/13.png';
import about3 from './src/17.png';

// Gallery Imports
import g1 from './src/gallery section/1.png';
import g2 from './src/gallery section/2.png';
import g3 from './src/gallery section/3.png';
import g4 from './src/gallery section/4.png';
import g5 from './src/gallery section/5.png';
import g6 from './src/gallery section/6.png';
import g7 from './src/gallery section/7.png';
import g8 from './src/gallery section/8.png';
import g9 from './src/gallery section/9.png';
import g10 from './src/gallery section/10.png';
import g12 from './src/gallery section/12.png';
import g14 from './src/gallery section/14.png';
import gOne from './src/gallery section/one.png';
import gFive from './src/gallery section/five.png';
import gSeven from './src/gallery section/seven.png';
import img2 from './src/2.png';
import img3 from './src/3.png';
import img6 from './src/6.png';
import img10 from './src/10.png';
import img11 from './src/11.png';
import img16 from './src/16.png';
import nails from './src/nails.png';
import { PLANITY_FORMATIONS, PLANITY_SERVICES } from './data/planityCatalog.js';

export const APP_NAME = "Maison Saney";
export const BRAND_LOGO = brandLogo;
export const ADDRESS = "18 Av. Jean Moulin, 34500 Beziers";
export const PHONE = "06 22 71 90 56";
export const SOCIAL_INSTAGRAM = "@maisondesaney";
export const SOCIAL_FACEBOOK = "Maison Saney";
export const INSTAGRAM_URL = "https://www.instagram.com/maisondesaney/";
export const PLANITY_URL = "https://www.planity.com/maison-de-saney-34500-beziers";
export const LOCAL_COLLAGES = [collageOne, collageTwo];
export const HERO_IMAGE = collageOne;
export const HERO_IMAGE_MOBILE = heroImageMobile;
export const ABOUT_IMAGES = [about1, about2, about3];
export const SERVICE_IMAGES = [salon1, salon2, salon3, salon4, salon5];
export const GALLERY_IMAGES = [
  vitrine, salon5, collageOne, collageTwo,
  g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g12, g14, gOne, gFive, gSeven,
  img2, img3, img6, img10, img11, img16, nails
];
export const CONTACT_IMAGE = vitrine;

export const NAV_LINKS: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Le Salon', href: '/about' },
  { label: 'Prestations', href: '/services' },
  { label: 'Formations', href: '/formations' },
  { label: 'Boutique', href: '/products' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const CATEGORY_ICON_MAP: Record<string, string> = {
  'Offres du moment': 'Sparkles',
  'Beauté du regard': 'Sparkles',
  'Extension & pose de cils': 'Sparkles',
  'Maquillage permanent & retouches': 'Syringe',
  'Beauté des mains & ongles': 'Sparkles',
  'Manucure japonaise': 'Sparkles',
  'Beauté des pieds': 'Wind',
  'Soins cheveux & lissages': 'Scissors',
  'Soins visage': 'Sparkles',
  'Soins corps': 'Wind',
  'Microneedling': 'Syringe',
  'Hollywood Peel / Carbon Peel': 'Syringe',
  'Peeling aux algues': 'Syringe',
  'Hammam': 'Wind',
  'Hammam & Jacuzzi': 'Wind',
  'Head Spa': 'Wind',
  'Modelage & détente': 'Wind',
  'Épilations cire femme': 'Scissors',
  'Épilations définitive': 'Syringe',
  'Blanchiment dentaire': 'Sparkles',
  'Détatouage': 'Syringe',
  'Kids Spa Premium': 'Sparkles',
  'Forfait mariée / fiancée': 'Sparkles',
  'Carte cadeaux': 'Sparkles',
};

export const SERVICE_CATEGORY_VISUALS: Record<string, string> = {
  'Offres du moment': salon1,
  'Beauté du regard': img10,
  'Extension & pose de cils': img11,
  'Maquillage permanent & retouches': img16,
  'Beauté des mains & ongles': nails,
  'Manucure japonaise': salon2,
  'Beauté des pieds': salon4,
  'Soins cheveux & lissages': salon5,
  'Soins visage': about1,
  'Soins corps': about2,
  'Microneedling': about3,
  'Hollywood Peel / Carbon Peel': img6,
  'Peeling aux algues': img3,
  'Hammam': vitrine,
  'Hammam & Jacuzzi': collageOne,
  'Head Spa': salon3,
  'Modelage & détente': salon5,
  'Épilations cire femme': img2,
  'Épilations définitive': img10,
  'Blanchiment dentaire': img11,
  'Détatouage': img16,
  'Kids Spa Premium': collageTwo,
  'Forfait mariée / fiancée': heroImageMobile,
  'Carte cadeaux': brandLogo,
};

export const SERVICES: ServiceItem[] = PLANITY_SERVICES.map((service, index) => ({
  id: `${slugify(service.category)}-${slugify(service.title)}`,
  category: service.category,
  title: service.title,
  description: service.description,
  benefits: [service.category, service.duration, service.price],
  duration: service.duration,
  price: service.price,
  iconName: CATEGORY_ICON_MAP[service.category] || 'Sparkles',
  image: SERVICE_CATEGORY_VISUALS[service.category] || salon1,
  sortOrder: index + 1,
}));

export const DEFAULT_FORMATIONS = PLANITY_FORMATIONS.map((formation, index) => ({
  id: `formation-${slugify(formation.title)}`,
  title: formation.title,
  description: formation.description,
  price: formation.price,
  duration: formation.duration,
  image: img11,
  program: formation.program,
  sortOrder: index + 1,
}));

export const HOME_EXPLORER_CARDS = [
  { label: 'Le Salon', href: '/about', image: about1, description: 'Découvrez les lieux, l ambiance et l univers Maison de Saney.' },
  { label: 'Prestations', href: '/services', image: salon1, description: 'Parcourez nos prestations classees par categorie.' },
  { label: 'Formations', href: '/formations', image: img11, description: 'Consultez les formations proposees et candidatez en ligne.' },
  { label: 'Boutique', href: '/products', image: salon3, description: 'Retrouvez notre selection de produits et d essentiels beaute.' },
  { label: 'Galerie', href: '/gallery', image: collageOne, description: 'Inspirez-vous de nos realisations et de l atmosphere du salon.' },
  { label: 'Contact', href: '/contact', image: vitrine, description: 'Accedez aux informations utiles pour nous joindre facilement.' },
  { label: 'Prendre RDV', href: PLANITY_URL, image: collageTwo, description: 'Reservez votre prochain rendez-vous directement sur Planity.', external: true },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sophie M.", text: "Pose semi-permanente irreprochable, zero decollement apres 3 semaines. Accueil chaleureux et ambiance chic.", rating: 5 },
  { id: 2, name: "Julie D.", text: "Le nail art est magnifique et precis. On voit la passion et le souci du detail a chaque etape.", rating: 5 },
  { id: 3, name: "Amandine L.", text: "Moment detente absolu avec le spa mains et pieds. Mes ongles nont jamais ete aussi beaux.", rating: 5 },
];

export const PRODUCTS: Product[] = [];
