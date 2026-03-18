import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Search,
  Mail,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";

const brands = ["All", "JCB", "Ashok Leyland", "Switch EV"];

const DealerLocatorPage = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("All");

  // 🔥 Fetch API
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const res = await fetch("https://api.patliputragroup.com/dealers");
        const data = await res.json();
        if (data.success) setDealers(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDealers();
  }, []);

  // 🔥 Filter Logic
  const filteredDealers = useMemo(() => {
    let result = dealers;

    if (selectedBrand !== "All") {
      result = result.filter(
        (d) => d.brand?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name?.toLowerCase().includes(q) ||
          d.city?.toLowerCase().includes(q) ||
          d.district?.toLowerCase().includes(q) ||
          d.pincode?.includes(q)
      );
    }

    return result;
  }, [search, dealers, selectedBrand]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <main className="pt-20">
        {/* 🔥 HEADER */}
        <section className="py-16 text-center bg-gradient-to-r from-primary to-secondary text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">
            {t("dealer.title")}
          </h1>
          <p className="text-lg opacity-80">{t("dealer.subtitle")}</p>
        </section>

        {/* 🔥 BRAND TOGGLE */}
        <section className="py-6 border-b bg-background sticky top-20 z-10">
          <div className="container mx-auto px-4 flex justify-center gap-3 flex-wrap">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    selectedBrand === brand
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-muted hover:bg-primary/10"
                  }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </section>

        {/* 🔥 SEARCH */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city, district, name..."
                className="pl-12 h-12 rounded-xl shadow"
              />
            </div>
          </div>
        </section>

        {/* 🔥 DEALERS */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            {loading ? (
              <p className="text-center py-20 text-muted-foreground">
                Loading dealers...
              </p>
            ) : filteredDealers.length === 0 ? (
              <p className="text-center py-20 text-muted-foreground">
                No dealers found
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDealers.map((dealer, i) => (
                  <motion.div
                    key={dealer._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Map */}
                    {dealer.latitude && dealer.longitude && (
                      <iframe
                        className="w-full h-44"
                        src={`https://maps.google.com/maps?q=${dealer.latitude},${dealer.longitude}&z=14&output=embed`}
                        loading="lazy"
                      />
                    )}

                    <div className="p-5">
                      {/* Name */}
                      <h3 className="font-bold text-lg mb-1">
                        {dealer.name}
                      </h3>

                      {/* Brand */}
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {dealer.brand}
                      </span>

                      {/* Address */}
                      <div className="flex gap-2 text-sm mt-3 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-1" />
                        <span>{dealer.address}</span>
                      </div>

                      {/* Location */}
                      <div className="grid grid-cols-2 gap-2 text-xs mt-4 text-muted-foreground">
                        <p><b>City:</b> {dealer.city}</p>
                        <p><b>District:</b> {dealer.district}</p>
                        <p><b>State:</b> {dealer.state}</p>
                        <p><b>Pincode:</b> {dealer.pincode}</p>
                      </div>

                      {/* Contact */}
                      <div className="mt-4 space-y-1 text-sm">
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${dealer.phone}`} className="hover:underline">
                            {dealer.phone}
                          </a>
                        </p>

                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <a href={`mailto:${dealer.email}`} className="hover:underline">
                            {dealer.email}
                          </a>
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-5 flex-wrap">
                        <a href={`tel:${dealer.phone}`}>
                          <Button size="sm" variant="outline">
                            Call
                          </Button>
                        </a>

                        <a
                          href={`https://wa.me/91${dealer.phone}`}
                          target="_blank"
                        >
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            WhatsApp
                          </Button>
                        </a>

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${dealer.latitude},${dealer.longitude}`}
                          target="_blank"
                        >
                          <Button size="sm" variant="secondary">
                            Directions
                          </Button>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default DealerLocatorPage;