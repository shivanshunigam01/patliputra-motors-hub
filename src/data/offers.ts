export interface Offer {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  brand?: 'JCB' | 'Ashok Leyland' | 'Switch EV' | 'Used' | 'All';
  validFrom: string;
  validTill: string;
  featured: boolean;
  image?: string;
}

export const offers: Offer[] = [
  {
    id: "offer-1",
    title: "Zero Down Payment on JCB 3DX",
    titleHi: "JCB 3DX पर जीरो डाउन पेमेंट",
    description: "Get your JCB 3DX with 0% down payment. Limited period offer for select customers.",
    descriptionHi: "अपना JCB 3DX 0% डाउन पेमेंट के साथ पाएं। चुनिंदा ग्राहकों के लिए सीमित अवधि का ऑफर।",
    brand: "JCB",
    validFrom: "2025-01-01",
    validTill: "2025-03-31",
    featured: true,
  },
  {
    id: "offer-2",
    title: "Low Interest Rate - 8.99% p.a.",
    titleHi: "कम ब्याज दर - 8.99% प्रति वर्ष",
    description: "Special interest rate of 8.99% p.a. on all Ashok Leyland trucks. Valid for salaried customers.",
    descriptionHi: "सभी अशोक लेलैंड ट्रकों पर 8.99% प्रति वर्ष की विशेष ब्याज दर। वेतनभोगी ग्राहकों के लिए मान्य।",
    brand: "Ashok Leyland",
    validFrom: "2025-01-01",
    validTill: "2025-02-28",
    featured: true,
  },
  {
    id: "offer-3",
    title: "Exchange Bonus ₹50,000",
    titleHi: "एक्सचेंज बोनस ₹50,000",
    description: "Get ₹50,000 exchange bonus when you trade-in your old vehicle for a new one.",
    descriptionHi: "अपना पुराना वाहन नए के लिए बदलने पर ₹50,000 का एक्सचेंज बोनस पाएं।",
    brand: "All",
    validFrom: "2025-01-01",
    validTill: "2025-04-30",
    featured: true,
  },
  {
    id: "offer-4",
    title: "Free Insurance - First Year",
    titleHi: "मुफ्त बीमा - पहला साल",
    description: "Get complimentary first-year comprehensive insurance on all Switch EV buses.",
    descriptionHi: "सभी स्विच EV बसों पर पहले साल का व्यापक बीमा मुफ्त पाएं।",
    brand: "Switch EV",
    validFrom: "2025-01-01",
    validTill: "2025-06-30",
    featured: false,
  },
  {
    id: "offer-5",
    title: "Extended Warranty - 2 Extra Years",
    titleHi: "विस्तारित वारंटी - 2 अतिरिक्त वर्ष",
    description: "Purchase any certified used vehicle and get 2 years extended warranty free.",
    descriptionHi: "कोई भी सर्टिफाइड पुराना वाहन खरीदें और 2 साल की विस्तारित वारंटी मुफ्त पाएं।",
    brand: "Used",
    validFrom: "2025-01-01",
    validTill: "2025-03-31",
    featured: false,
  },
  {
    id: "offer-6",
    title: "Corporate Fleet Discount - 15%",
    titleHi: "कॉर्पोरेट फ्लीट छूट - 15%",
    description: "Special 15% discount for corporate customers purchasing 5+ vehicles.",
    descriptionHi: "5+ वाहन खरीदने वाले कॉर्पोरेट ग्राहकों के लिए विशेष 15% छूट।",
    brand: "All",
    validFrom: "2025-01-01",
    validTill: "2025-12-31",
    featured: true,
  },
];

export const getActiveOffers = () => {
  const today = new Date().toISOString().split('T')[0];
  return offers.filter(offer => offer.validTill >= today);
};

export const getFeaturedOffers = () => {
  return getActiveOffers().filter(offer => offer.featured).slice(0, 6);
};
