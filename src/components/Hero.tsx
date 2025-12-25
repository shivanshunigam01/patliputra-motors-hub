import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  FileText,
  ArrowRight,
  CheckCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroJcb from "@/assets/hero-jcb.jpg";
import leyland from "@/assets/leyland-trucks.jpg";
import switchEv from "@/assets/switch-ev-bus.jpg";
import usedVehicles from "@/assets/used-vehicles.jpg";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const heroImages = [heroJcb, leyland, switchEv, usedVehicles];
const trustBadges = [
  "Authorized Dealer",
  "Finance Support",
  "24/7 Service",
  "Genuine Parts",
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-12 lg:py-0">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="trust-badge mb-6"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Authorized Dealer Since 2010</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Bihar का <span className="text-jcb">Bharosemand</span> Partner
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-primary-foreground/80 mb-8 leading-relaxed"
          >
            JCB Machines | Ashok Leyland Trucks | Switch Electric Vehicles |
            Certified Used
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <a href="tel:+919876543210">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold text-base px-8 shadow-lg hover:shadow-glow-jcb transition-all"
              >
                <Phone className="h-5 w-5" />
                Call Karein
              </Button>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-success text-success-foreground hover:bg-success/90 font-semibold text-base px-8 shadow-lg hover:shadow-glow-ev transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </a>
            <Link to="/finance">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold text-base px-8"
              >
                <FileText className="h-5 w-5" />
                Enquiry Karein
              </Button>
            </Link>
          </motion.div>

          {/* Used Vehicles Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/used-vehicles"
              className="inline-flex items-center gap-2 text-jcb hover:text-jcb/80 font-medium transition-colors group"
            >
              <span>👉 Used Gaadi Deals Dekhein</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Customer Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-primary-foreground/10 rounded-full backdrop-blur-sm">
              <Users className="h-5 w-5 text-jcb" />
              <span className="text-primary-foreground font-semibold">
                2,500+ Happy Customers
              </span>
            </div>
          </motion.div>

          {/* Trust Badges Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-3 py-2 bg-primary-foreground/5 rounded-lg backdrop-blur-sm"
              >
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm text-primary-foreground/80">
                  {badge}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-xs tracking-wider uppercase">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
