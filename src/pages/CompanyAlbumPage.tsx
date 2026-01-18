import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Play, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import { galleryItems } from "@/data/gallery";

const CompanyAlbumPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const tabs = [
    { id: "all", label: t("companyAlbum.all") },
    { id: "events", label: t("companyAlbum.events") },
    { id: "testimonials", label: t("gallery.testimonials") },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "all") return item.category === "Events" || item.category === "Delivery";
    if (activeTab === "events") return item.category === "Events";
    if (activeTab === "testimonials") return item.category === "Delivery";
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-6">
                <Camera className="h-4 w-4" />
                {t("companyAlbum.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("companyAlbum.title")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("companyAlbum.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-jcb text-jcb-foreground" : "bg-muted text-muted-foreground hover:bg-jcb/10"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} onClick={() => setLightboxItem(item)} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all flex items-center justify-center">
                    {item.type === "video" && <Play className="h-10 w-10 text-primary-foreground opacity-80" />}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm text-primary-foreground font-medium truncate">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {lightboxItem && (
          <div className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}>
            <button className="absolute top-4 right-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
              <X className="h-8 w-8" />
            </button>
            <img src={lightboxItem.url} alt={lightboxItem.title} className="max-w-full max-h-[90vh] rounded-xl" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default CompanyAlbumPage;