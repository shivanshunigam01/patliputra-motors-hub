import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "JCB Machines", path: "/jcb" },
  { name: "Ashok Leyland", path: "/ashok-leyland" },
  { name: "Switch EV", path: "/switch-ev" },
  { name: "Used Vehicles", path: "/used-vehicles" },
  { name: "Finance Options", path: "/finance" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-jcb">Patliputra</span>
              <span className="text-primary-foreground"> Autos</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Bihar ka bharosemand partner for JCB Machines, Ashok Leyland
              Trucks, Switch Electric Vehicles, and Certified Used Commercial
              Vehicles.
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-jcb flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Bailey Road, Near AIIMS,
                  <br />
                  Patna, Bihar 800001
                </span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-jcb transition-colors"
                >
                  <Phone className="h-5 w-5 text-jcb flex-shrink-0" />
                  <span className="text-sm">+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@patliputraautos.com"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-jcb transition-colors"
                >
                  <Mail className="h-5 w-5 text-jcb flex-shrink-0" />
                  <span className="text-sm">sales@patliputraautos.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-jcb flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-primary-foreground/70">
                    Monday - Saturday
                  </p>
                  <p className="text-primary-foreground font-medium">
                    9:00 AM - 7:00 PM
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-ev flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-primary-foreground/70">Sunday</p>
                  <p className="text-primary-foreground font-medium">
                    10:00 AM - 5:00 PM
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
            <p>© 2025 Patliputra Virtual Showroom. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-jcb transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-jcb transition-colors">
                Terms of Service
              </Link>
            </div>
            <p className="text-center">
              Managed by Zentroverse Global pvt. ltd
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
