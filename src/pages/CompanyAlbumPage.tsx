// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Camera, Play, X } from "lucide-react";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { FloatingCTA } from "@/components/FloatingCTA";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { galleryItems } from "@/data/gallery";

// const CompanyAlbumPage = () => {
//   const { t } = useLanguage();
//   const [activeTab, setActiveTab] = useState("all");
//   const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

//   const tabs = [
//     { id: "all", label: t("companyAlbum.all") },
//     { id: "events", label: t("companyAlbum.events") },
//     { id: "testimonials", label: t("gallery.testimonials") },
//   ];

//   const filteredItems = galleryItems.filter((item) => {
//     if (activeTab === "all") return item.category === "Events" || item.category === "Delivery";
//     if (activeTab === "events") return item.category === "Events";
//     if (activeTab === "testimonials") return item.category === "Delivery";
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="pt-20">
//         <section className="relative py-20 bg-gradient-to-br from-primary to-secondary">
//           <div className="container mx-auto px-4 text-center">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-6">
//                 <Camera className="h-4 w-4" />
//                 {t("companyAlbum.badge")}
//               </div>
//               <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("companyAlbum.title")}</h1>
//               <p className="text-lg text-primary-foreground/80">{t("companyAlbum.subtitle")}</p>
//             </motion.div>
//           </div>
//         </section>

//         <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
//           <div className="container mx-auto px-4">
//             <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
//               {tabs.map((tab) => (
//                 <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-jcb text-jcb-foreground" : "bg-muted text-muted-foreground hover:bg-jcb/10"}`}>
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="py-12">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {filteredItems.map((item, i) => (
//                 <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} onClick={() => setLightboxItem(item)} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
//                   <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
//                   <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all flex items-center justify-center">
//                     {item.type === "video" && <Play className="h-10 w-10 text-primary-foreground opacity-80" />}
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                     <p className="text-sm text-primary-foreground font-medium truncate">{item.title}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {lightboxItem && (
//           <div className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}>
//             <button className="absolute top-4 right-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
//               <X className="h-8 w-8" />
//             </button>
//             <img src={lightboxItem.url} alt={lightboxItem.title} className="max-w-full max-h-[90vh] rounded-xl" onClick={(e) => e.stopPropagation()} />
//           </div>
//         )}
//       </main>
//       <Footer />
//       <FloatingCTA />
//     </div>
//   );
// };

// export default CompanyAlbumPage;


import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Camera,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { useLanguage } from "@/i18n/LanguageContext";

import { Skeleton } from "@/components/ui/skeleton";

// type AlbumItem = (typeof galleryItems)[number];

// interface GroupedAlbum {
//   monthKey: string;
//   label: string;
//   labelHi: string;
//   items: AlbumItem[];
// }

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_HI = [
  "जनवरी",
  "फरवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

function groupByMonth(items: AlbumItem[]): GroupedAlbum[] {
  const map = new Map<string, AlbumItem[]>();

  items.forEach((item, idx) => {
    const rawDate = (item as any).date ?? null;
    let key: string;

    if (rawDate) {
      const d = new Date(rawDate);
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    } else {
      const bucket = Math.floor(idx / 6);
      const base = new Date();
      base.setMonth(base.getMonth() - bucket);
      key = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    }

    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, items]) => {
      const [y, m] = key.split("-").map(Number);

      return {
        monthKey: key,
        label: `${MONTHS_EN[m - 1]} ${y}`,
        labelHi: `${MONTHS_HI[m - 1]} ${y}`,
        items,
      };
    });
}

const CompanyAlbumPage = () => {
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState("all");
  // const [selectedItem, setSelectedItem] = useState<AlbumItem | null>(null);
  const [loaded, setLoaded] = useState<Record<string | number, boolean>>({});
  const [activeMonth, setActiveMonth] = useState("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // const [galleryItems, setGalleryItems] = useState<AlbumItem[]>([]);
const [loadingData, setLoadingData] = useState(true);
useEffect(() => {
  const fetchTimeline = async () => {
    try {
      const res = await fetch("https://api.patliputragroup.com/timeline");
      const data = await res.json();

      if (data.success) {
        const mappedData = data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          url: item.image,
          type: "image",
          category: "Events", // you can customize later
          date: item.createdAt || `${item.year}-01-01`,
        }));

        setGalleryItems(mappedData);
      }
    } catch (err) {
      console.error("Timeline API Error:", err);
    } finally {
      setLoadingData(false);
    }
  };

  fetchTimeline();
}, []);

  const tabs = [
    { id: "all", label: t("companyAlbum.all") },
    { id: "events", label: t("companyAlbum.events") },
    { id: "testimonials", label: t("gallery.testimonials") },
  ];

const filteredItems = useMemo(() => {
  if (loadingData) return [];

  return galleryItems.filter((item) => {
    if (activeTab === "all") {
      return item.category === "Events" || item.category === "Delivery";
    }
    if (activeTab === "events") return item.category === "Events";
    if (activeTab === "testimonials") return item.category === "Delivery";
    return true;
  });
}, [activeTab, galleryItems, loadingData]);
  const groups = useMemo(() => groupByMonth(filteredItems), [filteredItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMonth(entry.target.getAttribute("data-month") ?? "");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  const allFiltered = groups.flatMap((group) => group.items);
  const selectedIndex = allFiltered.findIndex((i) => i.id === selectedItem?.id);

  const goPrev = () => {
    if (selectedIndex > 0) setSelectedItem(allFiltered[selectedIndex - 1]);
  };

  const goNext = () => {
    if (selectedIndex < allFiltered.length - 1) {
      setSelectedItem(allFiltered[selectedIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedItem, selectedIndex, allFiltered]);

  const scrollToMonth = (key: string) => {
    sectionRefs.current[key]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-primary to-secondary overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4 backdrop-blur">
                <Camera className="h-4 w-4" />
                {t("companyAlbum.badge")}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-3">
                {t("companyAlbum.title")}
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-2">
                {t("companyAlbum.subtitle")}
              </p>

              <p className="text-sm text-primary-foreground/55">
                {allFiltered.length} photos · {groups.length} months
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sticky tabs */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-jcb text-jcb-foreground shadow"
                      : "bg-muted text-muted-foreground hover:bg-jcb/10 hover:text-jcb"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main layout */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Timeline sidebar */}
              <aside className="hidden lg:flex flex-col w-40 shrink-0">
                <div className="sticky top-36">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Timeline
                  </p>

                  <div className="relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                    <div className="flex flex-col gap-1">
                      {groups.map((group) => (
                        <button
                          key={group.monthKey}
                          onClick={() => scrollToMonth(group.monthKey)}
                          className={`relative flex items-center gap-3 text-left pl-5 py-1 rounded-md transition-all duration-200 group ${
                            activeMonth === group.monthKey
                              ? "text-jcb"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                              activeMonth === group.monthKey
                                ? "border-jcb bg-jcb scale-110"
                                : "border-muted-foreground bg-background group-hover:border-foreground"
                            }`}
                          />

                          <span className="text-xs font-medium leading-tight">
                            {language === "hi" ? group.labelHi : group.label}
                          </span>

                          <span className="text-[10px] text-muted-foreground ml-auto">
                            {group.items.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Right content */}
              <div className="flex-1 min-w-0 space-y-12">
                {groups.map((group) => (
                  <div
                    key={group.monthKey}
                    data-month={group.monthKey}
                    ref={(el) => {
                      sectionRefs.current[group.monthKey] = el;
                    }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div>
                        <h2 className="text-xl font-bold text-foreground">
                          {language === "hi" ? group.labelHi : group.label}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {group.items.length} photo
                          {group.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {group.items.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: Math.min(i * 0.04, 0.3) }}
                          onClick={() => setSelectedItem(item)}
                          className="relative rounded-xl overflow-hidden cursor-pointer group bg-muted border border-border/50 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="relative aspect-square">
                            {!loaded[item.id] && (
                              <Skeleton className="absolute inset-0 rounded-xl" />
                            )}

                            <img
                              src={item.url}
                              alt={
                                language === "hi" && (item as any).titleHi
                                  ? (item as any).titleHi
                                  : item.title
                              }
                              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                                loaded[item.id] ? "opacity-100" : "opacity-0"
                              }`}
                              onLoad={() =>
                                setLoaded((prev) => ({
                                  ...prev,
                                  [item.id]: true,
                                }))
                              }
                            />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

                            {item.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 rounded-full p-2">
                                  <Play className="h-6 w-6 text-white fill-white" />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="px-2.5 py-2 bg-background border-t border-border/50">
                            <p className="text-xs font-medium text-foreground leading-snug line-clamp-1">
                              {language === "hi" && (item as any).titleHi
                                ? (item as any).titleHi
                                : item.title}
                            </p>

                            {(item as any).date && (
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {new Date((item as any).date).toLocaleDateString(
                                  language === "hi" ? "hi-IN" : "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                  }
                                )}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {groups.length === 0 && (
                  <div className="py-24 text-center text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No photos found in this section.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <p className="text-white font-semibold text-sm">
                  {language === "hi" && (selectedItem as any).titleHi
                    ? (selectedItem as any).titleHi
                    : selectedItem.title}
                </p>

                {(selectedItem as any).date && (
                  <p className="text-white/50 text-xs mt-0.5">
                    {new Date((selectedItem as any).date).toLocaleDateString(
                      language === "hi" ? "hi-IN" : "en-IN",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                )}
              </div>

              <button
                className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setSelectedItem(null)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div
              className="flex-1 flex items-center justify-center relative px-12 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={goPrev}
                disabled={selectedIndex === 0}
                className="absolute left-2 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white disabled:opacity-20 transition-all"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <motion.img
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                src={selectedItem.url}
                alt={
                  language === "hi" && (selectedItem as any).titleHi
                    ? (selectedItem as any).titleHi
                    : selectedItem.title
                }
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />

              <button
                onClick={goNext}
                disabled={selectedIndex === allFiltered.length - 1}
                className="absolute right-2 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white disabled:opacity-20 transition-all"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>

            <div
              className="flex items-center justify-center gap-3 py-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white/40 text-xs">
                {selectedIndex + 1} / {allFiltered.length}
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-white/40 text-xs">
                {selectedItem.category}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />  
      <FloatingCTA />
    </div>
  );
};

export default CompanyAlbumPage;