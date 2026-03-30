import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Search,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import patliputraLogo from "@/assets/patliputra-logo.jpeg";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { settings } = useAdminSettings();

  // ✅ Dynamic WhatsApp Number Logic
  const getWhatsAppNumber = () => {
    const path = location.pathname;

    if (path === "/ashok-leyland" || path === "/switch-ev") {
      return "9264196630";
    }

    if (path === "/jcb" || path === "/used-vehicles") {
      return "9031053514";
    }

    return settings?.whatsapp_number;
  };

  // ✅ Dynamic WhatsApp Message Logic
  const getWhatsAppMessage = () => {
    const path = location.pathname;

    if (path === "/jcb") {
      return "Hi, I am looking for JCB machines from Patliputra JCB. Please connect with me for further details.";
    }

    if (path === "/ashok-leyland") {
      return "Hi, I am looking for Ashok Leyland vehicles from Patliputra Motors. Please connect with me for further details.";
    }

    if (path === "/switch-ev") {
      return "Hi, I am looking for Switch Mobility E-Vehicles from Patliputra JCB. Please connect with me for further details.";
    }

    if (path === "/used-vehicles") {
      return "Hi, I am looking for Pre-Owned JCB machines from Patliputra JCB. Please connect with me for further details.";
    }

    // Default (Home + others)
    return "Hi, I am looking for Product & Services from Patliputra Group. Please connect with me for further details.";
  };

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.jcb"), path: "/jcb" },
    { name: t("nav.ashokLeyland"), path: "/ashok-leyland" },
    { name: t("nav.switchEv"), path: "/switch-ev" },
    { name: t("nav.certifiedRefurbished"), path: "/used-vehicles" },
    { name: t("nav.finance"), path: "/finance" },
  ];

  const moreLinks = [
    { name: t("nav.gallery"), path: "/gallery" },
    { name: t("nav.offers"), path: "/offers" },
    { name: t("nav.productFinder"), path: "/product-finder" },
    { name: t("nav.dealerLocator"), path: "/dealer-locator" },
    { name: t("nav.serviceWarranty"), path: "/service-warranty" },
    { name: t("nav.partsLubricants"), path: "/parts-lubricants" },
    { name: t("nav.companyAlbum"), path: "/company-album" },
    { name: t("nav.cibilScore"), path: "/cibil-score" },
    { name: t("nav.careers"), path: "/careers" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary ${
          isScrolled ? "py-1 shadow-lg" : "py-2"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={patliputraLogo}
                alt="Patliputra Autos"
                className={`transition-all duration-300 rounded ${
                  isScrolled ? "h-14" : "h-16"
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                    More <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {moreLinks.map((link) => (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link to={link.path} className="w-full cursor-pointer">
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageToggle isScrolled={false} />

              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>

              <a href={`tel:+91${settings?.primary_phone}`}>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  {t("common.call")}
                </Button>
              </a>

              {/* ✅ WhatsApp Button */}
              <a
                href={getWhatsAppUrl(getWhatsAppNumber(), getWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("common.whatsapp")}
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary-foreground"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden">
            <div className="bg-primary min-h-full pt-20 px-6 pb-8">
              <nav className="flex flex-col gap-2">
                {[...navLinks, ...moreLinks].map((link) => (
                  <Link key={link.path} to={link.path} className="py-3">
                    {link.name}
                  </Link>
                ))}
              </nav>
              {/* code */}
              <div className="mt-6 flex flex-col gap-3">
                <a href={`tel:+91${settings?.primary_phone}`}>
                  <Button className="w-full gap-2">
                    <Phone className="h-5 w-5" />
                    {t("common.callNow")}
                  </Button>
                </a>

                {/* ✅ Mobile WhatsApp */}
                <a
                  href={getWhatsAppUrl(
                    getWhatsAppNumber(),
                    getWhatsAppMessage(),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full gap-2 bg-success">
                    <MessageCircle className="h-5 w-5" />
                    {t("common.whatsapp")}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
