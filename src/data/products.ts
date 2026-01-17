import heroJcb from "@/assets/hero-jcb.jpg";
import leylandTrucks from "@/assets/leyland-trucks.jpg";
import switchEvBus from "@/assets/switch-ev-bus.jpg";
import usedVehicles from "@/assets/used-vehicles.jpg";

export interface Product {
  id: string;
  name: string;
  nameHi?: string;
  category: string;
  categoryHi?: string;
  price: string;
  brand: 'JCB' | 'Ashok Leyland' | 'Switch EV' | 'Used';
  bestFor: string;
  bestForHi?: string;
  badge?: string | null;
  image: string;
  featured?: boolean;
  condition?: 'Certified' | 'Non-certified';
  specs: {
    fuel?: string;
    capacity?: string;
    power?: string;
    weight?: string;
    range?: string;
    charging?: string;
    warranty?: string;
    application?: string;
    seating?: number;
  };
}

export const allProducts: Product[] = [
  // JCB Products
  {
    id: "jcb-1",
    name: "JCB 3DX Super EcoXcellence",
    category: "Backhoe Loader",
    categoryHi: "बैकहो लोडर",
    price: "₹16.50 Lakh*",
    brand: "JCB",
    bestFor: "Road Construction, Farming",
    bestForHi: "सड़क निर्माण, खेती",
    badge: "BESTSELLER",
    image: heroJcb,
    featured: true,
    specs: { power: "81 HP", fuel: "Diesel", weight: "7,100 kg", capacity: "1.0 m³", warranty: "3 Years", application: "Construction" },
  },
  {
    id: "jcb-2",
    name: "JCB 3DX Plus",
    category: "Backhoe Loader",
    categoryHi: "बैकहो लोडर",
    price: "₹15.80 Lakh*",
    brand: "JCB",
    bestFor: "General Construction",
    bestForHi: "सामान्य निर्माण",
    badge: null,
    image: heroJcb,
    featured: false,
    specs: { power: "76 HP", fuel: "Diesel", weight: "6,900 kg", capacity: "0.9 m³", warranty: "3 Years", application: "Construction" },
  },
  {
    id: "jcb-3",
    name: "JCB JS205SC",
    category: "Excavator",
    categoryHi: "एक्सकेवेटर",
    price: "₹42.00 Lakh*",
    brand: "JCB",
    bestFor: "Heavy Earthmoving",
    bestForHi: "भारी मिट्टी का काम",
    badge: "NEW LAUNCH",
    image: heroJcb,
    featured: true,
    specs: { power: "143 HP", fuel: "Diesel", weight: "20,700 kg", capacity: "0.9 m³", warranty: "3 Years", application: "Construction" },
  },
  {
    id: "jcb-4",
    name: "JCB VM115",
    category: "Compactor",
    categoryHi: "कंपैक्टर",
    price: "₹28.50 Lakh*",
    brand: "JCB",
    bestFor: "Road Compaction",
    bestForHi: "सड़क कॉम्पैक्शन",
    badge: null,
    image: heroJcb,
    featured: false,
    specs: { power: "115 HP", fuel: "Diesel", weight: "11,500 kg", capacity: "11,500 kg", warranty: "2 Years", application: "Construction" },
  },
  // Ashok Leyland Products
  {
    id: "leyland-1",
    name: "Ashok Leyland BOSS 1920HB",
    category: "Heavy Truck",
    categoryHi: "भारी ट्रक",
    price: "₹32.00 Lakh*",
    brand: "Ashok Leyland",
    bestFor: "Long Haul Transport",
    bestForHi: "लंबी दूरी का परिवहन",
    badge: "POPULAR",
    image: leylandTrucks,
    featured: true,
    specs: { power: "190 HP", fuel: "Diesel", capacity: "19 Ton", warranty: "3 Years", application: "Transport" },
  },
  {
    id: "leyland-2",
    name: "Ashok Leyland Dost+",
    category: "Light Commercial",
    categoryHi: "हल्का कमर्शियल",
    price: "₹8.50 Lakh*",
    brand: "Ashok Leyland",
    bestFor: "City Distribution",
    bestForHi: "शहर वितरण",
    badge: null,
    image: leylandTrucks,
    featured: false,
    specs: { power: "55 HP", fuel: "Diesel", capacity: "1.25 Ton", warranty: "3 Years", application: "Transport" },
  },
  {
    id: "leyland-3",
    name: "Ashok Leyland Viking",
    category: "Bus",
    categoryHi: "बस",
    price: "₹28.00 Lakh*",
    brand: "Ashok Leyland",
    bestFor: "School/Staff Transport",
    bestForHi: "स्कूल/स्टाफ परिवहन",
    badge: null,
    image: leylandTrucks,
    featured: false,
    specs: { power: "130 HP", fuel: "Diesel", seating: 52, warranty: "2 Years", application: "Transport" },
  },
  // Switch EV Products
  {
    id: "ev-1",
    name: "Switch EiV 12",
    category: "Electric Bus",
    categoryHi: "इलेक्ट्रिक बस",
    price: "₹1.20 Cr*",
    brand: "Switch EV",
    bestFor: "City Transport",
    bestForHi: "शहर परिवहन",
    badge: "ECO CHOICE",
    image: switchEvBus,
    featured: true,
    specs: { power: "200 kW", fuel: "Electric", range: "200 km", charging: "3-4 hrs", seating: 35, warranty: "5 Years", application: "Municipality" },
  },
  {
    id: "ev-2",
    name: "Switch EiV 22",
    category: "Electric Bus",
    categoryHi: "इलेक्ट्रिक बस",
    price: "₹1.80 Cr*",
    brand: "Switch EV",
    bestFor: "BRT / Metro Feeder",
    bestForHi: "BRT / मेट्रो फीडर",
    badge: "PREMIUM",
    image: switchEvBus,
    featured: true,
    specs: { power: "250 kW", fuel: "Electric", range: "250 km", charging: "4-5 hrs", seating: 45, warranty: "5 Years", application: "Municipality" },
  },
  // Used Vehicles
  {
    id: "used-1",
    name: "JCB 3DX 2021",
    category: "Backhoe Loader",
    categoryHi: "बैकहो लोडर",
    price: "₹12.00 Lakh*",
    brand: "Used",
    bestFor: "Construction, Farming",
    bestForHi: "निर्माण, खेती",
    badge: "CERTIFIED",
    image: usedVehicles,
    featured: false,
    condition: "Certified",
    specs: { power: "76 HP", fuel: "Diesel", weight: "6,800 kg", warranty: "6 Months", application: "Construction" },
  },
  {
    id: "used-2",
    name: "Ashok Leyland 1618 2020",
    category: "Heavy Truck",
    categoryHi: "भारी ट्रक",
    price: "₹18.00 Lakh*",
    brand: "Used",
    bestFor: "Transport",
    bestForHi: "परिवहन",
    badge: null,
    image: usedVehicles,
    featured: false,
    condition: "Certified",
    specs: { power: "160 HP", fuel: "Diesel", capacity: "16 Ton", warranty: "3 Months", application: "Transport" },
  },
];

export const brands = ['JCB', 'Ashok Leyland', 'Switch EV', 'Used'] as const;

export const categories = {
  'JCB': ['Backhoe Loader', 'Excavator', 'Compactor', 'Telehandler'],
  'Ashok Leyland': ['Heavy Truck', 'Light Commercial', 'Bus', 'Tipper'],
  'Switch EV': ['Electric Bus'],
  'Used': ['Backhoe Loader', 'Excavator', 'Heavy Truck', 'Light Commercial'],
};

export const applications = ['Construction', 'Transport', 'Farming', 'Municipality', 'Mining', 'Other'];

export const fuelTypes = ['Diesel', 'Electric', 'CNG'];

export const conditions = ['Certified', 'Non-certified'];
