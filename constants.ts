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

export const SERVICES: ServiceItem[] = [
  {
    id: 'semi',
    title: 'Manucure & Semi-permanent',
    description: 'Preparation en douceur, cuticules soignees et pose de vernis longue tenue pour des mains impeccables.',
    benefits: ['Preparation russe maitrisee', 'Brillance 3 semaines', 'Palette de teintes signature'],
    duration: '45-60 min',
    price: 'Des 40 EUR',
    iconName: 'Sparkles',
    image: salon1
  },
  {
    id: 'gel',
    title: 'Extensions Gel / Acrygel',
    description: 'Architecture personnalisee, renforcement et mise en forme elegante pour des ongles elances et resistants.',
    benefits: ['Courbe C soignee', 'Formes modernes', 'Finition ultra brillante'],
    duration: '75-120 min',
    price: 'Sur devis',
    iconName: 'Syringe',
    image: salon2
  },
  {
    id: 'nailart',
    title: 'Nail Art Signature',
    description: 'Creations artistiques minimalistes ou audacieuses : baby boomer, lignes graphiques, effets chrome ou cat-eye.',
    benefits: ['Designs sur-mesure', 'Pigments premium', 'Details haute precision'],
    duration: '30-60 min',
    price: 'A partir de 15 EUR',
    iconName: 'Sparkles',
    image: salon3
  },
  {
    id: 'spa',
    title: 'Spa Mains & Pieds',
    description: 'Rituel relaxant : bain tiede, gommage, masque hydratant et modelage, suivi dune pose soignee.',
    benefits: ['Peau douce et nourrie', 'Cuticules assouplies', 'Moment de detente'],
    duration: '60 min',
    price: 'Des 55 EUR',
    iconName: 'Wind',
    image: salon4
  },
  {
    id: 'soin',
    title: 'Reparation & Renfort',
    description: 'Soin fortifiant, gainage en rubber base ou reparation dongles fragilises pour retrouver une base saine.',
    benefits: ['Renforcement durable', 'Protection des ongles naturels', 'Finition naturelle'],
    duration: '45 min',
    price: 'Des 35 EUR',
    iconName: 'Scissors',
    image: salon5
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sophie M.", text: "Pose semi-permanente irreprochable, zero decollement apres 3 semaines. Accueil chaleureux et ambiance chic.", rating: 5 },
  { id: 2, name: "Julie D.", text: "Le nail art est magnifique et precis. On voit la passion et le souci du detail a chaque etape.", rating: 5 },
  { id: 3, name: "Amandine L.", text: "Moment detente absolu avec le spa mains et pieds. Mes ongles nont jamais ete aussi beaux.", rating: 5 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Huile Cuticules Gold',
    description: 'Une huile riche et nourrissante pour des cuticules saines et hydratées. Parfum délicat de vanille.',
    price: 15.90,
    image: salon4, // Using salon image as placeholder
    category: 'Soin'
  },
  {
    id: 'prod_2',
    name: 'Crème Mains Velours',
    description: 'Crème hydratante intense, non grasse, qui laisse les mains douces comme du velours.',
    price: 24.50,
    image: salon5, // Using salon image as placeholder
    category: 'Soin'
  },
  {
    id: 'prod_3',
    name: 'Kit Press-on Nails Nude',
    description: 'Un kit complet de faux ongles réutilisables, forme amande, teinte nude parfaite.',
    price: 35.00,
    image: salon1, // Using salon image as placeholder
    category: 'Ongles'
  },
  {
    id: 'prod_4',
    name: 'Lime à Ongles Pro',
    description: 'Lime professionnelle double face grains 100/180 pour un limage précis.',
    price: 4.90,
    image: salon3, // Using salon image as placeholder
    category: 'Accessoires'
  }
];

