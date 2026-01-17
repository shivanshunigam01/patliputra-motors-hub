import heroJcb from "@/assets/hero-jcb.jpg";
import leylandTrucks from "@/assets/leyland-trucks.jpg";
import switchEvBus from "@/assets/switch-ev-bus.jpg";
import usedVehicles from "@/assets/used-vehicles.jpg";

export interface GalleryItem {
  id: string;
  title: string;
  titleHi: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  category: 'JCB' | 'Leyland' | 'EV' | 'Events' | 'Delivery' | 'Workshop';
  featured: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "JCB 3DX at Construction Site",
    titleHi: "निर्माण स्थल पर JCB 3DX",
    type: "image",
    url: heroJcb,
    category: "JCB",
    featured: true,
  },
  {
    id: "gallery-2",
    title: "Ashok Leyland Fleet",
    titleHi: "अशोक लेलैंड फ्लीट",
    type: "image",
    url: leylandTrucks,
    category: "Leyland",
    featured: true,
  },
  {
    id: "gallery-3",
    title: "Switch EV Bus Launch Event",
    titleHi: "स्विच EV बस लॉन्च इवेंट",
    type: "image",
    url: switchEvBus,
    category: "Events",
    featured: true,
  },
  {
    id: "gallery-4",
    title: "Customer Delivery Ceremony",
    titleHi: "ग्राहक डिलीवरी समारोह",
    type: "image",
    url: usedVehicles,
    category: "Delivery",
    featured: true,
  },
  {
    id: "gallery-5",
    title: "Service Workshop",
    titleHi: "सर्विस वर्कशॉप",
    type: "image",
    url: heroJcb,
    category: "Workshop",
    featured: false,
  },
  {
    id: "gallery-6",
    title: "JCB Excavator Demo",
    titleHi: "JCB एक्सकेवेटर डेमो",
    type: "image",
    url: heroJcb,
    category: "JCB",
    featured: false,
  },
  {
    id: "gallery-7",
    title: "Annual Customer Meet",
    titleHi: "वार्षिक ग्राहक मिलन",
    type: "image",
    url: leylandTrucks,
    category: "Events",
    featured: false,
  },
  {
    id: "gallery-8",
    title: "Electric Bus in Patna",
    titleHi: "पटना में इलेक्ट्रिक बस",
    type: "image",
    url: switchEvBus,
    category: "EV",
    featured: true,
  },
];

export const galleryCategories = ['All', 'JCB', 'Leyland', 'EV', 'Events', 'Delivery', 'Workshop'] as const;
