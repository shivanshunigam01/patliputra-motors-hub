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


// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Play, Image as ImageIcon, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { FloatingCTA } from "@/components/FloatingCTA";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { galleryItems, galleryCategories, GalleryItem } from "@/data/gallery";
// import { Skeleton } from "@/components/ui/skeleton";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface GroupedGallery {
//   monthKey: string;       // "2024-03"
//   label: string;          // "March 2024"
//   labelHi: string;        // Hindi label
//   items: GalleryItem[];
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// const MONTHS_HI = ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"];

// /** Group items by their `date` field (ISO string). Falls back to item index bucketing. */
// function groupByMonth(items: GalleryItem[]): GroupedGallery[] {
//   const map = new Map<string, GalleryItem[]>();

//   items.forEach((item, idx) => {
//     // Use item.date if available, else spread items across fake months
//     const raw: string = (item as any).date ?? null;
//     let key: string;
//     if (raw) {
//       const d = new Date(raw);
//       key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
//     } else {
//       // Fallback: bucket by every 6 items starting from a recent date
//       const bucket = Math.floor(idx / 6);
//       const base = new Date();
//       base.setMonth(base.getMonth() - bucket);
//       key = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}`;
//     }
//     if (!map.has(key)) map.set(key, []);
//     map.get(key)!.push(item);
//   });

//   return Array.from(map.entries())
//     .sort(([a], [b]) => b.localeCompare(a))
//     .map(([key, items]) => {
//       const [y, m] = key.split("-").map(Number);
//       return {
//         monthKey: key,
//         label: `${MONTHS_EN[m - 1]} ${y}`,
//         labelHi: `${MONTHS_HI[m - 1]} ${y}`,
//         items,
//       };
//     });
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// const GalleryPage = () => {
//   const { t, language } = useLanguage();
//   const [activeCategory, setActiveCategory] = useState<string>("All");
//   const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
//   const [loaded, setLoaded] = useState<Record<string, boolean>>({});
//   const [activeMonth, setActiveMonth] = useState<string>("");
//   const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   const filtered =
//     activeCategory === "All"
//       ? galleryItems
//       : galleryItems.filter((i) => i.category === activeCategory);

//   const groups = groupByMonth(filtered);

//   // Track which month section is in view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveMonth(entry.target.getAttribute("data-month") ?? "");
//           }
//         });
//       },
//       { rootMargin: "-40% 0px -55% 0px" }
//     );
//     Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
//     return () => observer.disconnect();
//   }, [groups]);

//   // Lightbox prev/next
//   const currentGroup = groups.find((g) => g.items.some((i) => i.id === selectedItem?.id));
//   const allFiltered = groups.flatMap((g) => g.items);
//   const selectedIndex = allFiltered.findIndex((i) => i.id === selectedItem?.id);

//   const goPrev = () => selectedIndex > 0 && setSelectedItem(allFiltered[selectedIndex - 1]);
//   const goNext = () => selectedIndex < allFiltered.length - 1 && setSelectedItem(allFiltered[selectedIndex + 1]);

//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (!selectedItem) return;
//       if (e.key === "ArrowLeft") goPrev();
//       if (e.key === "ArrowRight") goNext();
//       if (e.key === "Escape") setSelectedItem(null);
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [selectedItem, selectedIndex]);

//   const categoryLabels: Record<string, string> = {
//     All: t("gallery.all"), JCB: t("gallery.jcb"), Leyland: t("gallery.leyland"),
//     EV: t("gallery.ev"), Events: t("gallery.events"), Delivery: t("gallery.delivery"), Workshop: t("gallery.workshop"),
//   };

//   const scrollToMonth = (key: string) => {
//     sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="pt-20">
//         {/* ── Hero ── */}
//         <section className="relative py-16 bg-gradient-to-br from-primary to-secondary overflow-hidden">
//           {/* subtle grid overlay */}
//           <div
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",
//               backgroundSize: "40px 40px",
//             }}
//           />
//           <div className="container mx-auto px-4 text-center relative">
//             <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4 backdrop-blur">
//                 <ImageIcon className="h-4 w-4" />
//                 {t("gallery.badge")}
//               </div>
//               <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-3">{t("gallery.title")}</h1>
//               <p className="text-lg text-primary-foreground/80 mb-2">{t("gallery.subtitle")}</p>
//               <p className="text-sm text-primary-foreground/50">{allFiltered.length} photos · {groups.length} months</p>
//             </motion.div>
//           </div>
//         </section>

//         {/* ── Category Filter (sticky) ── */}
//         <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
//           <div className="container mx-auto px-4">
//             <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
//               {galleryCategories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
//                     activeCategory === cat
//                       ? "bg-ev text-ev-foreground shadow"
//                       : "bg-muted text-muted-foreground hover:bg-ev/10 hover:text-ev"
//                   }`}
//                 >
//                   {categoryLabels[cat]}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── Main layout: timeline sidebar + grid ── */}
//         <section className="py-8">
//           <div className="container mx-auto px-4">
//             <div className="flex gap-8">

//               {/* ── Left: Timeline sidebar (hidden on mobile) ── */}
//               <aside className="hidden lg:flex flex-col gap-0 w-36 shrink-0">
//                 <div className="sticky top-36">
//                   <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-1.5">
//                     <Calendar className="h-3.5 w-3.5" /> Timeline
//                   </p>
//                   <div className="relative">
//                     {/* vertical line */}
//                     <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
//                     <div className="flex flex-col gap-1">
//                       {groups.map((g) => (
//                         <button
//                           key={g.monthKey}
//                           onClick={() => scrollToMonth(g.monthKey)}
//                           className={`relative flex items-center gap-3 text-left pl-5 py-1 rounded-md transition-all duration-200 group ${
//                             activeMonth === g.monthKey
//                               ? "text-ev"
//                               : "text-muted-foreground hover:text-foreground"
//                           }`}
//                         >
//                           {/* dot */}
//                           <span
//                             className={`absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
//                               activeMonth === g.monthKey
//                                 ? "border-ev bg-ev scale-110"
//                                 : "border-muted-foreground bg-background group-hover:border-foreground"
//                             }`}
//                           />
//                           <span className="text-xs font-medium leading-tight">
//                             {language === "hi" ? g.labelHi : g.label}
//                           </span>
//                           <span className="text-[10px] text-muted-foreground ml-auto">{g.items.length}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </aside>

//               {/* ── Right: Photo groups ── */}
//               <div className="flex-1 min-w-0 space-y-12">
//                 {groups.map((group) => (
//                   <div
//                     key={group.monthKey}
//                     data-month={group.monthKey}
//                     ref={(el) => { sectionRefs.current[group.monthKey] = el; }}
//                   >
//                     {/* Month header */}
//                     <div className="flex items-center gap-4 mb-5">
//                       <div>
//                         <h2 className="text-xl font-bold text-foreground">
//                           {language === "hi" ? group.labelHi : group.label}
//                         </h2>
//                         <p className="text-xs text-muted-foreground mt-0.5">{group.items.length} photo{group.items.length !== 1 ? "s" : ""}</p>
//                       </div>
//                       <div className="flex-1 h-px bg-border" />
//                     </div>

//                     {/* Photo grid for this month */}
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                       {group.items.map((item, i) => (
//                         <motion.div
//                           key={item.id}
//                           initial={{ opacity: 0, scale: 0.95 }}
//                           whileInView={{ opacity: 1, scale: 1 }}
//                           viewport={{ once: true }}
//                           transition={{ delay: Math.min(i * 0.04, 0.3) }}
//                           onClick={() => setSelectedItem(item)}
//                           className="relative rounded-xl overflow-hidden cursor-pointer group bg-muted"
//                         >
//                           {/* Image */}
//                           <div className="relative aspect-square">
//                             {!loaded[item.id] && <Skeleton className="absolute inset-0 rounded-xl" />}
//                             <img
//                               src={item.url}
//                               alt={language === "hi" ? item.titleHi : item.title}
//                               className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
//                                 loaded[item.id] ? "opacity-100" : "opacity-0"
//                               }`}
//                               onLoad={() => setLoaded((p) => ({ ...p, [item.id]: true }))}
//                             />
//                             {/* Hover overlay */}
//                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
//                             {item.type === "video" && (
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <div className="bg-black/50 rounded-full p-2">
//                                   <Play className="h-6 w-6 text-white fill-white" />
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           {/* ── Caption (always visible) ── */}
//                           <div className="px-2.5 py-2 bg-background border-t border-border/50">
//                             <p className="text-xs font-medium text-foreground leading-snug line-clamp-1">
//                               {language === "hi" ? item.titleHi : item.title}
//                             </p>
//                             {(item as any).date && (
//                               <p className="text-[10px] text-muted-foreground mt-0.5">
//                                 {new Date((item as any).date).toLocaleDateString(
//                                   language === "hi" ? "hi-IN" : "en-IN",
//                                   { day: "numeric", month: "short" }
//                                 )}
//                               </p>
//                             )}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}

//                 {groups.length === 0 && (
//                   <div className="py-24 text-center text-muted-foreground">
//                     <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
//                     <p>No photos found in this category.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* ── Lightbox ── */}
//       <AnimatePresence>
//         {selectedItem && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-50 bg-black/95 flex flex-col"
//             onClick={() => setSelectedItem(null)}
//           >
//             {/* Top bar */}
//             <div className="flex items-center justify-between px-4 py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
//               <div>
//                 <p className="text-white font-semibold text-sm">
//                   {language === "hi" ? selectedItem.titleHi : selectedItem.title}
//                 </p>
//                 {(selectedItem as any).date && (
//                   <p className="text-white/50 text-xs mt-0.5">
//                     {new Date((selectedItem as any).date).toLocaleDateString(
//                       language === "hi" ? "hi-IN" : "en-IN",
//                       { weekday: "long", year: "numeric", month: "long", day: "numeric" }
//                     )}
//                   </p>
//                 )}
//               </div>
//               <button className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors" onClick={() => setSelectedItem(null)}>
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Image area */}
//             <div className="flex-1 flex items-center justify-center relative px-12 min-h-0" onClick={(e) => e.stopPropagation()}>
//               <button
//                 onClick={goPrev}
//                 disabled={selectedIndex === 0}
//                 className="absolute left-2 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white disabled:opacity-20 transition-all"
//               >
//                 <ChevronLeft className="h-7 w-7" />
//               </button>

//               <motion.img
//                 key={selectedItem.id}
//                 initial={{ opacity: 0, scale: 0.97 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.15 }}
//                 src={selectedItem.url}
//                 alt={language === "hi" ? selectedItem.titleHi : selectedItem.title}
//                 className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
//               />

//               <button
//                 onClick={goNext}
//                 disabled={selectedIndex === allFiltered.length - 1}
//                 className="absolute right-2 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white disabled:opacity-20 transition-all"
//               >
//                 <ChevronRight className="h-7 w-7" />
//               </button>
//             </div>

//             {/* Bottom strip: counter + category */}
//             <div className="flex items-center justify-center gap-3 py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
//               <span className="text-white/40 text-xs">{selectedIndex + 1} / {allFiltered.length}</span>
//               <span className="w-px h-3 bg-white/20" />
//               <span className="text-white/40 text-xs">{selectedItem.category}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Footer />
//       <FloatingCTA />
//     </div>
//   );
// };

// export default GalleryPage;
