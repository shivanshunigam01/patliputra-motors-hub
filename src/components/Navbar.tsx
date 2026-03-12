import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, Search, ChevronDown } from "lucide-react";
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

   const { settings } = useAdminSettings();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary ${
          isScrolled ? "py-2 shadow-lg" : "py-4"
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
                  isScrolled ? "h-12" : "h-14"
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
                      ? isScrolled
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary-foreground/20 text-primary-foreground"
                      : isScrolled
                      ? "text-foreground hover:bg-muted"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                      isScrolled
                        ? "text-foreground hover:bg-muted"
                        : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                  >
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
              <LanguageToggle isScrolled={isScrolled} />
              <Button
                variant="ghost"
                size="icon"
                className={
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                }
              >
                <Search className="h-5 w-5" />
              </Button>
              <a href={`tel:+91${settings?.primary_phone}`}>
                <Button
                  variant={isScrolled ? "outline" : "secondary"}
                  size="sm"
                  className="gap-2 hover:bg-jcb hover:text-jcb-foreground hover:border-jcb transition-all"
                >
                  <Phone className="h-4 w-4" />
                  {t("common.call")}
                </Button>
              </a>
              <a
                href={getWhatsAppUrl(settings?.whatsapp_number)}
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
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-lg overflow-y-auto">
              <div className="flex flex-col min-h-full pt-20 px-6 pb-8">
                {/* Language Toggle */}
                <div className="mb-4">
                  <LanguageToggle variant="mobile" />
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                  {[...navLinks, ...moreLinks].map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link
                        to={link.path}
                        className={`block py-3 px-4 text-base font-medium rounded-xl transition-all ${
                          location.pathname === link.path
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 mt-auto pt-4">
                  <a href={`tel:+91${settings?.primary_phone}`} className="w-full">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full gap-2 hover:bg-jcb hover:text-jcb-foreground transition-all"
                    >
                      <Phone className="h-5 w-5" />
                      {t("common.callNow")}
                    </Button>
                  </a>
                  <a
                    href={getWhatsAppUrl(settings?.whatsapp_number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      size="lg"
                      className="w-full gap-2 bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {t("common.whatsapp")}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}