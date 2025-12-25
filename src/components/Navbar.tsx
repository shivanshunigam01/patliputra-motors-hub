import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'JCB', path: '/jcb' },
  { name: 'Ashok Leyland', path: '/ashok-leyland' },
  { name: 'Switch EV', path: '/switch-ev' },
  { name: 'Used Vehicles', path: '/used-vehicles' },
  { name: 'Finance', path: '/finance' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-2 shadow-lg' : 'bg-primary/95 py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className={`font-bold transition-all duration-300 ${
                isScrolled ? 'text-xl text-primary' : 'text-2xl text-primary-foreground'
              }`}>
                <span className="text-jcb">Patliputra</span>
                <span className={isScrolled ? 'text-primary' : 'text-primary-foreground'}> Autos</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? isScrolled 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary-foreground/20 text-primary-foreground'
                      : isScrolled
                        ? 'text-foreground hover:bg-muted'
                        : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? 'text-foreground' : 'text-primary-foreground'}
              >
                <Search className="h-5 w-5" />
              </Button>
              <a href="tel:+919876543210">
                <Button
                  variant={isScrolled ? 'outline' : 'secondary'}
                  size="sm"
                  className="gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-foreground hover:bg-muted' : 'text-primary-foreground hover:bg-primary-foreground/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-lg">
              <div className="flex flex-col h-full pt-20 px-6 pb-8">
                <nav className="flex-1 flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`block py-4 px-4 text-lg font-medium rounded-xl transition-all ${
                          location.pathname === link.path
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 mt-auto">
                  <a href="tel:+919876543210" className="w-full">
                    <Button variant="secondary" size="lg" className="w-full gap-2">
                      <Phone className="h-5 w-5" />
                      Call Now
                    </Button>
                  </a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button size="lg" className="w-full gap-2 bg-success hover:bg-success/90 text-success-foreground">
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
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
