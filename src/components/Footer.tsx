import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import patliputraLogo from "@/assets/patliputra-logo.jpeg";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
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
    { name: t("nav.serviceWarranty"), path: "/service-warranty" },
    { name: t("nav.partsLubricants"), path: "/parts-lubricants" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
    { name: t("nav.careers"), path: "/careers" },
  ];

   const { settings } = useAdminSettings();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={patliputraLogo}
              alt="Patliputra Autos"
              className="h-20 rounded mb-4"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-jcb hover:text-jcb-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-jcb hover:text-jcb-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-leyland hover:text-leyland-foreground transition-all duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-ev hover:text-ev-foreground transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-jcb transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">More</h3>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-jcb transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-jcb flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  {settings?.address || "Near Didarganj Check Post, NH-30, Patna - 8"}
                </span>
              </li>
              <li>
             <a
  href={`tel:+91${settings?.primary_phone}`}
  className="flex items-center gap-3 text-primary-foreground/70 hover:text-jcb transition-colors"
>
  <Phone className="h-5 w-5 text-jcb flex-shrink-0" />
  <span className="text-sm">
    +91 {settings?.primary_phone || "9031053514"}
  </span>
</a>
              </li>
              <li>
            <a
  href={`mailto:${settings?.email}`}
  className="flex items-center gap-3 text-primary-foreground/70 hover:text-jcb transition-colors"
>
  <Mail className="h-5 w-5 text-jcb flex-shrink-0" />
  <span className="text-sm">
    {settings?.email || "marketingmanager@jcbpatliputra.com"}
  </span>
</a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.workingHours")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-jcb flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-primary-foreground font-medium">
                    {settings?.working_hours || "10:00 AM to 6:30 PM Mon-Sat"}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 pr-28 lg:pr-40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>{t("footer.copyright")}</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-jcb transition-colors">
                {t("footer.privacy")}
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-jcb transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
            <p className="text-center">
              {t("footer.managedBy")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}