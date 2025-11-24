import { Sparkles, Syringe, Wind, Scissors } from 'lucide-react';
import { ServiceItem, NavLink, Testimonial } from './types';
import brandLogo from './src/logo.jpg';
import collageOne from './src/4 pics 1.png';
import collageTwo from './src/4 pics 2.png';
import heroImageMobile from './src/accueil.PNG';
import salon1 from './src/salon 1.PNG';
import salon2 from './src/salon 2.PNG';
import salon3 from './src/salon 3.PNG';
import salon4 from './src/salon 4.PNG';
import salon5 from './src/salon 5 massage room.PNG';
import vitrine from './src/vitrine.PNG';

export const APP_NAME = "Maison de Saney";
export const BRAND_LOGO = brandLogo;
export const ADDRESS = "18 Av. Jean Moulin, 34500 Beziers";
export const PHONE = "06 22 71 90 56";
export const SOCIAL_INSTAGRAM = "@maisondesaney";
export const SOCIAL_FACEBOOK = "Maison de Saney";
export const INSTAGRAM_URL = "https://www.instagram.com/maisondesaney/";
export const PLANITY_URL = "https://www.planity.com/maison-de-saney-34500-beziers";
export const LOCAL_COLLAGES = [collageOne, collageTwo];
export const HERO_IMAGE = collageOne;
export const HERO_IMAGE_MOBILE = heroImageMobile;
export const ABOUT_IMAGES = [salon1, salon2, salon3, salon4];
export const SERVICE_IMAGES = [salon1, salon2, salon3, salon4, salon5];
export const GALLERY_IMAGES = [vitrine, salon5, collageOne, collageTwo];
export const CONTACT_IMAGE = vitrine;

export const NAV_LINKS: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Le Salon', href: '/about' },
  { label: 'Prestations', href: '/services' },
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
    icon: Sparkles,
    image: salon1
  },
  {
    id: 'gel',
    title: 'Extensions Gel / Acrygel',
    description: 'Architecture personnalisee, renforcement et mise en forme elegante pour des ongles elances et resistants.',
    benefits: ['Courbe C soignee', 'Formes modernes', 'Finition ultra brillante'],
    duration: '75-120 min',
    price: 'Sur devis',
    icon: Syringe,
    image: salon2
  },
  {
    id: 'nailart',
    title: 'Nail Art Signature',
    description: 'Creations artistiques minimalistes ou audacieuses : baby boomer, lignes graphiques, effets chrome ou cat-eye.',
    benefits: ['Designs sur-mesure', 'Pigments premium', 'Details haute precision'],
    duration: '30-60 min',
    price: 'A partir de 15 EUR',
    icon: Sparkles,
    image: salon3
  },
  {
    id: 'spa',
    title: 'Spa Mains & Pieds',
    description: 'Rituel relaxant : bain tiede, gommage, masque hydratant et modelage, suivi dune pose soignee.',
    benefits: ['Peau douce et nourrie', 'Cuticules assouplies', 'Moment de detente'],
    duration: '60 min',
    price: 'Des 55 EUR',
    icon: Wind,
    image: salon4
  },
  {
    id: 'soin',
    title: 'Reparation & Renfort',
    description: 'Soin fortifiant, gainage en rubber base ou reparation dongles fragilises pour retrouver une base saine.',
    benefits: ['Renforcement durable', 'Protection des ongles naturels', 'Finition naturelle'],
    duration: '45 min',
    price: 'Des 35 EUR',
    icon: Scissors,
    image: salon5
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sophie M.", text: "Pose semi-permanente irreprochable, zero decollement apres 3 semaines. Accueil chaleureux et ambiance chic.", rating: 5 },
  { id: 2, name: "Julie D.", text: "Le nail art est magnifique et precis. On voit la passion et le souci du detail a chaque etape.", rating: 5 },
  { id: 3, name: "Amandine L.", text: "Moment detente absolu avec le spa mains et pieds. Mes ongles nont jamais ete aussi beaux.", rating: 5 },
];

export const SYSTEM_INSTRUCTION = `
Vous etes la receptionniste virtuelle de "Maison de Saney", un salon d'onglerie premium situe au ${ADDRESS} a Beziers.
Votre objectif est d'aider les clientes a propos des prestations ongulaires, de la localisation et de la prise de rendez-vous.

A savoir :
- Telephone : ${PHONE}
- Reservation : uniquement sur rendez-vous.
- Atmosphere : premium, intimiste, experte, feminine.
- Prestations : manucure et vernis semi-permanent, extensions gel/acrygel, nail art, spa mains & pieds, renfort et reparations.

Lignes directrices :
- Ton poli, professionnel et chaleureux, en francais (sauf si l'interlocuteur s'exprime en anglais).
- Reponses concises mais utiles.
- Pour reserver, orienter vers l'appel au ${PHONE} (ou Planity si mentionne).
- Pour les tarifs, indiquer des points de depart mais rappeler que le devis est personnalise selon l'etat des ongles et le design souhaite.
`;
