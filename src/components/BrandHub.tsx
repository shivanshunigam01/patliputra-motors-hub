import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import heroJcb from '@/assets/hero-jcb.jpg';
import leylandTrucks from '@/assets/leyland-trucks.jpg';
import switchEvBus from '@/assets/switch-ev-bus.jpg';
import usedVehicles from '@/assets/used-vehicles.jpg';

const brands = [
  {
    id: 'jcb',
    name: 'JCB',
    tagline: 'Construction Machines',
    description: '150+ Models Available',
    image: heroJcb,
    path: '/jcb',
    cardClass: 'card-jcb',
    accentColor: 'text-jcb',
    hoverGlow: 'hover-glow-jcb',
  },
  {
    id: 'leyland',
    name: 'Ashok Leyland',
    tagline: 'Commercial Trucks',
    description: 'India\'s Trusted Fleet',
    image: leylandTrucks,
    path: '/ashok-leyland',
    cardClass: 'card-leyland',
    accentColor: 'text-leyland',
    hoverGlow: 'hover-glow-leyland',
  },
  {
    id: 'switch',
    name: 'Switch Mobility',
    tagline: 'Electric Vehicles',
    description: 'Future of Transport',
    image: switchEvBus,
    path: '/switch-ev',
    cardClass: 'card-ev',
    accentColor: 'text-ev',
    hoverGlow: 'hover-glow-ev',
  },
  {
    id: 'used',
    name: 'Certified Used',
    tagline: 'Pre-Owned Vehicles',
    description: '150-Point Inspection',
    image: usedVehicles,
    path: '/used-vehicles',
    cardClass: 'bg-card border border-border',
    accentColor: 'text-foreground',
    hoverGlow: '',
  },
];

export function BrandHub() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explore Our Brands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bihar's most trusted showroom for construction machines, commercial vehicles, and electric mobility solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={brand.path}>
                <div
                  className={`group relative overflow-hidden rounded-2xl ${brand.cardClass} ${brand.hoverGlow} transition-all duration-500 hover:scale-[1.02]`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className={`text-sm font-medium ${brand.accentColor} mb-1`}>
                          {brand.tagline}
                        </p>
                        <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
                          {brand.name}
                        </h3>
                        <p className="text-primary-foreground/70 text-sm">
                          {brand.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:bg-jcb group-hover:text-jcb-foreground transition-all duration-300">
                          <ArrowRight className="h-5 w-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
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
