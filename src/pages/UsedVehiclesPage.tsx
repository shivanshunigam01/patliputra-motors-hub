import { useState, useMemo } from "react";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Shield,
  Calendar,
  RefreshCcw,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrochureDownloadButton } from "@/components/BrochureDownloadButton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

import { useLanguage } from "@/i18n/LanguageContext";
import { useCompare } from "@/context/CompareContext";
import { CompareFloatingBar } from "@/components/CompareFloatingBar";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

import usedVehiclesImg from "@/assets/hero-jcb.jpg";
import { getImageUrl } from "@/lib/imageUrl";

interface ApiUsedVehicle {
  _id: string;
  vehicle_type: string;
  brand: string;
  model: string;
  year: number;
  kilometers: number;
  hours: number;
  price: number;
  featured_image: string;
  inspection_report_url?: string;
  fuel_type: string;
  ownership: string;
  condition_report?: { engine: string };
  is_certified: boolean;
  has_warranty: boolean;
  finance_available: boolean;
  status: string;
  is_active: boolean;
}

const UsedVehiclesPage = () => {
  const { language } = useLanguage();
  const { settings } = useAdminSettings();

  const {
    selectedProducts,
    addProduct,
    removeProduct,
    clearProducts,
    isSelected,
  } = useCompare();

  const { data: apiVehicles = [], isLoading } = useQuery({
    queryKey: ["used-vehicles"],
    queryFn: async () => {
      const res = await api.get("/used-vehicles");
      return res.data.data as ApiUsedVehicle[];
    },
  });

  const vehicles = useMemo(() => {
    return apiVehicles
      .filter((v) => v.is_active && v.status === "available")
      .map((v) => ({
        id: v._id,
        name: `${v.brand} ${v.model}`,
        year: String(v.year),
        km: v.kilometers
          ? `${v.kilometers.toLocaleString("en-IN")} km`
          : `${v.hours?.toLocaleString("en-IN")} hrs`,
        price: `₹${v.price.toLocaleString("en-IN")}`,
        image: getImageUrl(v.featured_image) || usedVehiclesImg,
        brochureUrl: v.inspection_report_url
          ? v.inspection_report_url.startsWith("http")
            ? v.inspection_report_url
            : `${import.meta.env.VITE_API_URL}${v.inspection_report_url}`
          : null,
      }));
  }, [apiVehicles]);

  const handleCompareSelect = (vehicle: typeof vehicles[0]) => {
    if (isSelected(vehicle.id)) {
      removeProduct(vehicle.id);
    } else {
      const result = addProduct({
        id: vehicle.id, name: vehicle.name, brand: 'Certified Refurbished',
        price: vehicle.price, image: vehicle.image, category: 'Used',
        specifications: { Year: vehicle.year, Kilometers: vehicle.km },
        specs: {},
      });
      if (!result.success) {
        if (result.reason === 'max_limit') toast.error('Maximum 2 products can be compared');
        else if (result.reason === 'different_category') toast.error('You can only compare products of the same brand');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* 🔥 HERO HEADER (NOT REMOVED) */}
        <section className="relative min-h-[55vh] lg:min-h-[65vh] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="absolute inset-0">
            <img
              src={usedVehiclesImg}
              alt="Certified Used Vehicles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/20 text-success rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                Certified & Inspected Vehicles
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                Trusted <span className="text-jcb">Used Commercial</span> Vehicles
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-8">
                Pre-owned vehicles, fully inspected and ready for work.
                Finance available.
              </p>
            </motion.div>
          </div>
        </section>

        {/* VEHICLE GRID */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border flex flex-col">
                      <Link to={`/product/${vehicle.id}`} className="relative aspect-[4/3] overflow-hidden block">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="p-6 flex flex-col flex-1">
                        <Link to={`/product/${vehicle.id}`} className="hover:text-primary transition-colors">
                          <h3 className="text-lg font-bold mb-2">
                            {vehicle.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-muted-foreground mb-4">
                          {vehicle.year} • {vehicle.km}
                        </p>

                        {/* DOWNLOAD BROCHURE BUTTON */}
                        <div className="mb-4 mt-auto">
                          <BrochureDownloadButton
                            productName={vehicle.name}
                            brochureUrl={vehicle.brochureUrl}
                            className="border-primary/30 text-primary hover:bg-primary/10"
                          />
                        </div>
                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <Link to="/contact"><Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">Get Latest Price</Button></Link>

                          <a
                            href={getWhatsAppUrl(
                              settings?.whatsapp_number,
                              vehicle.name
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="gap-1.5 bg-success text-success-foreground hover:bg-success/90 rounded-full"
                            >
                              <MessageCircle className="h-4 w-4" />
                              Enquire
                            </Button>
                          </a>
                        </div>
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
      <CompareFloatingBar />
    </div>
  );
};

export default UsedVehiclesPage;