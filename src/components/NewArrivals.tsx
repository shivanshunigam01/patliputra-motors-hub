import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

import heroJcb from '@/assets/hero-jcb.jpg';
import leylandTrucks from '@/assets/leyland-trucks.jpg';
import switchEvBus from '@/assets/switch-ev-bus.jpg';

const products = [
  {
    id: 1,
    name: 'JCB 3DX Super EcoXcellence',
    category: 'Backhoe Loader',
    price: '₹16.50 Lakh*',
    badge: 'NEW LAUNCH',
    image: heroJcb,
    path: '/jcb',
    accentColor: 'bg-jcb text-jcb-foreground',
  },
  {
    id: 2,
    name: 'Ashok Leyland 4825',
    category: 'Heavy Truck',
    price: '₹32.00 Lakh*',
    badge: 'BESTSELLER',
    image: leylandTrucks,
    path: '/ashok-leyland',
    accentColor: 'bg-leyland text-leyland-foreground',
  },
  {
    id: 3,
    name: 'Switch IeV 4 Electric Bus',
    category: 'EV Bus',
    price: '₹85.00 Lakh*',
    badge: 'ECO CHOICE',
    image: switchEvBus,
    path: '/switch-ev',
    accentColor: 'bg-ev text-ev-foreground',
  },
];

export function NewArrivals() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-leyland" />
              <span className="text-sm font-medium text-leyland">Hot Deals</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              New Arrivals
            </h2>
            <p className="text-lg text-muted-foreground">
              Latest launches with special offers
            </p>
          </div>
          <Link to="/jcb" className="mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={product.path}>
                <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 ${product.accentColor} rounded-full text-xs font-bold tracking-wide animate-pulse-glow`}>
                      {product.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-jcb transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-foreground">
                        {product.price}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-jcb transition-colors">
                        <span>Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
