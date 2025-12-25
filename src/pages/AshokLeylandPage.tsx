import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, CheckCircle, Fuel, Gauge, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';

import leylandTrucks from '@/assets/leyland-trucks.jpg';

const products = [
  {
    id: 1,
    name: 'Ashok Leyland 4825',
    category: 'Heavy Truck',
    price: '₹32.00 Lakh*',
    bestFor: 'Long Haul Transport',
    badge: 'BESTSELLER',
    image: leylandTrucks,
    specs: { power: '250 HP', capacity: '49T GVW', fuel: 'Diesel' },
  },
  {
    id: 2,
    name: 'Ashok Leyland 1616',
    category: 'Tipper',
    price: '₹18.50 Lakh*',
    bestFor: 'Mining, Construction',
    badge: 'POPULAR',
    image: leylandTrucks,
    specs: { power: '160 HP', capacity: '16T GVW', fuel: 'Diesel' },
  },
  {
    id: 3,
    name: 'Ashok Leyland BOSS 1615',
    category: 'Intermediate Truck',
    price: '₹16.80 Lakh*',
    bestFor: 'City Distribution',
    badge: null,
    image: leylandTrucks,
    specs: { power: '152 HP', capacity: '16T GVW', fuel: 'Diesel' },
  },
  {
    id: 4,
    name: 'Ashok Leyland Viking',
    category: 'Bus Chassis',
    price: '₹24.00 Lakh*',
    bestFor: 'Passenger Transport',
    badge: 'NEW',
    image: leylandTrucks,
    specs: { power: '180 HP', capacity: '50+ Seats', fuel: 'Diesel' },
  },
  {
    id: 5,
    name: 'Ashok Leyland DOST+',
    category: 'Light Commercial',
    price: '₹8.50 Lakh*',
    bestFor: 'Last Mile Delivery',
    badge: 'VALUE CHOICE',
    image: leylandTrucks,
    specs: { power: '60 HP', capacity: '2.5T', fuel: 'Diesel' },
  },
  {
    id: 6,
    name: 'Ashok Leyland 2825',
    category: 'Multi-Axle Truck',
    price: '₹28.00 Lakh*',
    bestFor: 'Medium Distance',
    badge: null,
    image: leylandTrucks,
    specs: { power: '220 HP', capacity: '28T GVW', fuel: 'Diesel' },
  },
];

const categories = ['All', 'Heavy Trucks', 'Tippers', 'Buses', 'Light Commercial'];

const AshokLeylandPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-[50vh] lg:h-[60vh] flex items-center pt-20">
          <div className="absolute inset-0">
            <img
              src={leylandTrucks}
              alt="Ashok Leyland Trucks"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-leyland/20 text-leyland rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4" />
                Authorized Ashok Leyland Dealer
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                India's Trusted <span className="text-leyland">Commercial Fleet</span>
              </h1>
              
              <p className="text-lg text-primary-foreground/80 mb-8">
                Power every journey with Ashok Leyland's legendary reliability and performance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919876543210">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-leyland text-leyland-foreground hover:bg-leyland/90 font-semibold">
                    <Phone className="h-5 w-5" />
                    Get Best Price
                  </Button>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                    <MessageCircle className="h-5 w-5" />
                    Book Test Drive
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    category === 'All'
                      ? 'bg-leyland text-leyland-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-leyland/10 hover:text-leyland'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full card-leyland">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-leyland text-leyland-foreground rounded-full text-xs font-bold tracking-wide">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-leyland font-medium mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Best for: {product.bestFor}
                      </p>

                      {/* Specs */}
                      <div className="flex gap-4 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Gauge className="h-3 w-3" />
                          {product.specs.power}
                        </div>
                        <div className="flex items-center gap-1">
                          <Weight className="h-3 w-3" />
                          {product.specs.capacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" />
                          {product.specs.fuel}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <p className="text-xl font-bold text-foreground">
                          {product.price}
                        </p>
                        <div className="flex gap-2">
                          <a href="tel:+919876543210">
                            <Button size="sm" variant="outline" className="border-leyland text-leyland hover:bg-leyland hover:text-leyland-foreground">
                              Enquiry
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Fleet Solutions Available
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Special pricing for fleet purchases. Get customized solutions for your transport business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210">
                <Button size="lg" className="gap-2 bg-leyland text-leyland-foreground hover:bg-leyland/90 font-semibold">
                  <Phone className="h-5 w-5" />
                  Talk to Fleet Manager
                </Button>
              </a>
              <Link to="/finance">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                  Fleet Finance Options
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default AshokLeylandPage;
