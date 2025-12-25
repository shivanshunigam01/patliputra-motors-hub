import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, CheckCircle, Zap, Battery, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';

import switchEvBus from '@/assets/switch-ev-bus.jpg';

const products = [
  {
    id: 1,
    name: 'Switch IeV 4',
    category: 'Electric Bus',
    price: '₹85.00 Lakh*',
    bestFor: 'City Transport',
    badge: 'ZERO EMISSION',
    image: switchEvBus,
    specs: { range: '200+ km', capacity: '34 Seats', charging: '3 hrs Fast' },
  },
  {
    id: 2,
    name: 'Switch IeV 7',
    category: 'Electric Bus',
    price: '₹95.00 Lakh*',
    bestFor: 'Intercity Routes',
    badge: 'LONG RANGE',
    image: switchEvBus,
    specs: { range: '300+ km', capacity: '45 Seats', charging: '4 hrs Fast' },
  },
  {
    id: 3,
    name: 'Switch EiV 12',
    category: 'Electric Bus',
    price: '₹1.10 Cr*',
    bestFor: 'Premium City Transit',
    badge: 'FLAGSHIP',
    image: switchEvBus,
    specs: { range: '250+ km', capacity: '60 Seats', charging: '4 hrs Fast' },
  },
  {
    id: 4,
    name: 'Switch Solo EV',
    category: 'Electric LCV',
    price: '₹12.50 Lakh*',
    bestFor: 'Last Mile Delivery',
    badge: 'NEW LAUNCH',
    image: switchEvBus,
    specs: { range: '150+ km', capacity: '1.5T Payload', charging: '2 hrs Fast' },
  },
];

const categories = ['All', 'Electric Buses', 'Electric LCV'];

const SwitchEVPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-[50vh] lg:h-[60vh] flex items-center pt-20">
          <div className="absolute inset-0">
            <img
              src={switchEvBus}
              alt="Switch Electric Vehicle"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ev/20 text-ev rounded-full text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Zero Emission Mobility
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                <span className="text-ev">Electric Future</span> of Bihar Transport
              </h1>
              
              <p className="text-lg text-primary-foreground/80 mb-8">
                Switch to sustainable mobility. Lower running costs, zero emissions, government subsidies available.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919876543210">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-ev text-ev-foreground hover:bg-ev/90 font-semibold">
                    <Phone className="h-5 w-5" />
                    Get Subsidy Info
                  </Button>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                    <MessageCircle className="h-5 w-5" />
                    Schedule Demo
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EV Benefits */}
        <section className="py-12 bg-ev/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-ev/10 flex items-center justify-center mb-3">
                  <Leaf className="h-6 w-6 text-ev" />
                </div>
                <p className="font-semibold text-foreground">Zero Emissions</p>
                <p className="text-sm text-muted-foreground">Clean air for Bihar</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-ev/10 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-ev" />
                </div>
                <p className="font-semibold text-foreground">70% Lower Running Cost</p>
                <p className="text-sm text-muted-foreground">vs Diesel vehicles</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-ev/10 flex items-center justify-center mb-3">
                  <Battery className="h-6 w-6 text-ev" />
                </div>
                <p className="font-semibold text-foreground">8 Year Warranty</p>
                <p className="text-sm text-muted-foreground">On battery pack</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-ev/10 flex items-center justify-center mb-3">
                  <CheckCircle className="h-6 w-6 text-ev" />
                </div>
                <p className="font-semibold text-foreground">Govt Subsidy</p>
                <p className="text-sm text-muted-foreground">FAME II benefits</p>
              </div>
            </div>
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
                      ? 'bg-ev text-ev-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-ev/10 hover:text-ev'
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full card-ev">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-ev text-ev-foreground rounded-full text-xs font-bold tracking-wide">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-ev font-medium mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Best for: {product.bestFor}
                      </p>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Battery className="h-3 w-3" />
                          {product.specs.range}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {product.specs.capacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {product.specs.charging}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <p className="text-xl font-bold text-foreground">
                          {product.price}
                        </p>
                        <div className="flex gap-2">
                          <a href="tel:+919876543210">
                            <Button size="sm" variant="outline" className="border-ev text-ev hover:bg-ev hover:text-ev-foreground">
                              Get Quote
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
        <section className="py-16 bg-gradient-to-br from-ev/10 via-ev/5 to-transparent border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Government Subsidies Available
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take advantage of FAME II subsidies and state incentives. Our team will help you maximize your savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210">
                <Button size="lg" className="gap-2 bg-ev text-ev-foreground hover:bg-ev/90 font-semibold">
                  <Phone className="h-5 w-5" />
                  Learn About Subsidies
                </Button>
              </a>
              <Link to="/finance">
                <Button size="lg" variant="outline" className="gap-2 border-ev text-ev hover:bg-ev/10 font-semibold">
                  EV Finance Options
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

export default SwitchEVPage;
