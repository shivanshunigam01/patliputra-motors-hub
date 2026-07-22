export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://patliputraautos.com";
export const SITE_NAME = "Patliputra Virtual Showroom";
export const SITE_NAME_SHORT = "Patliputra";

export const ORGANIZATION = {
  name: "Patliputra Virtual Showroom",
  legalName: "Patliputra Equipments Private Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  phone: "+91-9031053514",
  email: "info@patliputragroup.com",
  address: {
    streetAddress: "Near Didarganj Check Post, NH-30",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    postalCode: "800008",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/JCBPEPL",
    "https://www.instagram.com/patliputra_jcb",
    "https://www.youtube.com/@Patliputragroup",
    "https://www.linkedin.com/company/patliputra-equipments-private-limited-pepl",
  ],
  openingHours: ["Mo-Sa 09:00-19:00", "Su 10:00-17:00"],
  priceRange: "₹₹₹",
  areaServed: "Bihar, India",
};
