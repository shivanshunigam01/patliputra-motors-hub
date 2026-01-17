export interface Dealer {
  id: string;
  name: string;
  nameHi?: string;
  address: string;
  addressHi?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  lat?: number;
  lng?: number;
}

export const dealers: Dealer[] = [
  {
    id: "dealer-1",
    name: "Patliputra Automobiles - Main Showroom",
    nameHi: "पाटलिपुत्र ऑटोमोबाइल्स - मुख्य शोरूम",
    address: "Bailey Road, Near AIIMS, Patna, Bihar 800001",
    addressHi: "बेली रोड, एम्स के पास, पटना, बिहार 800001",
    city: "Patna",
    district: "Patna",
    state: "Bihar",
    pincode: "800001",
    phone: "+919876543210",
    whatsapp: "919876543210",
    lat: 25.6093,
    lng: 85.1376,
  },
  {
    id: "dealer-2",
    name: "Patliputra Automobiles - Muzaffarpur",
    nameHi: "पाटलिपुत्र ऑटोमोबाइल्स - मुजफ्फरपुर",
    address: "Station Road, Near Railway Station, Muzaffarpur, Bihar 842001",
    addressHi: "स्टेशन रोड, रेलवे स्टेशन के पास, मुजफ्फरपुर, बिहार 842001",
    city: "Muzaffarpur",
    district: "Muzaffarpur",
    state: "Bihar",
    pincode: "842001",
    phone: "+919876543211",
    whatsapp: "919876543211",
    lat: 26.1225,
    lng: 85.3906,
  },
  {
    id: "dealer-3",
    name: "Patliputra Automobiles - Bhagalpur",
    nameHi: "पाटलिपुत्र ऑटोमोबाइल्स - भागलपुर",
    address: "Tilka Manjhi Chowk, Bhagalpur, Bihar 812001",
    addressHi: "तिलका मांझी चौक, भागलपुर, बिहार 812001",
    city: "Bhagalpur",
    district: "Bhagalpur",
    state: "Bihar",
    pincode: "812001",
    phone: "+919876543212",
    whatsapp: "919876543212",
    lat: 25.2425,
    lng: 86.9842,
  },
  {
    id: "dealer-4",
    name: "Patliputra Automobiles - Gaya",
    nameHi: "पाटलिपुत्र ऑटोमोबाइल्स - गया",
    address: "GT Road, Near Bus Stand, Gaya, Bihar 823001",
    addressHi: "GT रोड, बस स्टैंड के पास, गया, बिहार 823001",
    city: "Gaya",
    district: "Gaya",
    state: "Bihar",
    pincode: "823001",
    phone: "+919876543213",
    whatsapp: "919876543213",
    lat: 24.7955,
    lng: 85.0002,
  },
  {
    id: "dealer-5",
    name: "Patliputra Automobiles - Darbhanga",
    nameHi: "पाटलिपुत्र ऑटोमोबाइल्स - दरभंगा",
    address: "Laheriasarai, Darbhanga, Bihar 846001",
    addressHi: "लहेरियासराय, दरभंगा, बिहार 846001",
    city: "Darbhanga",
    district: "Darbhanga",
    state: "Bihar",
    pincode: "846001",
    phone: "+919876543214",
    whatsapp: "919876543214",
    lat: 26.1542,
    lng: 85.8918,
  },
  {
    id: "dealer-6",
    name: "Patliputra Automobiles - Purnia",
    nameHi: "पाटलिपुत्र ऑटोमोबाइल्स - पूर्णिया",
    address: "Line Bazaar, Purnia, Bihar 854301",
    addressHi: "लाइन बाजार, पूर्णिया, बिहार 854301",
    city: "Purnia",
    district: "Purnia",
    state: "Bihar",
    pincode: "854301",
    phone: "+919876543215",
    whatsapp: "919876543215",
    lat: 25.7771,
    lng: 87.4753,
  },
];

export const biharDistricts = [
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur",
  "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad",
  "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani",
  "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
  "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul",
  "Vaishali", "West Champaran"
];
