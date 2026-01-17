import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import { galleryItems, galleryCategories, GalleryItem } from "@/data/gallery";
import { Skeleton } from "@/components/ui/skeleton";

const GalleryPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const filteredItems = activeCategory === "All" ? galleryItems : galleryItems.filter(item => item.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    All: t("gallery.all"), JCB: t("gallery.jcb"), Leyland: t("gallery.leyland"),
    EV: t("gallery.ev"), Events: t("gallery.events"), Delivery: t("gallery.delivery"), Workshop: t("gallery.workshop"),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ev/20 text-ev rounded-full text-sm font-medium mb-4">
                <ImageIcon className="h-4 w-4" />
                {t("gallery.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("gallery.title")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("gallery.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {galleryCategories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-ev text-ev-foreground" : "bg-muted text-muted-foreground hover:bg-ev/10 hover:text-ev"}`}>
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} onClick={() => setSelectedItem(item)} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
                  {!loaded[item.id] && <Skeleton className="absolute inset-0" />}
                  <img src={item.url} alt={language === "hi" ? item.titleHi : item.title} className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${loaded[item.id] ? "opacity-100" : "opacity-0"}`} onLoad={() => setLoaded(prev => ({ ...prev, [item.id]: true }))} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-medium">{language === "hi" ? item.titleHi : item.title}</p>
                  </div>
                  {item.type === "video" && <div className="absolute inset-0 flex items-center justify-center"><Play className="h-12 w-12 text-white/80" /></div>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <button className="absolute top-4 right-4 text-white p-2"><X className="h-8 w-8" /></button>
            <img src={selectedItem.url} alt={language === "hi" ? selectedItem.titleHi : selectedItem.title} className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default GalleryPage;
