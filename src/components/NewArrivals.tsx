import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

import heroJcb from '@/assets/hero-jcb.jpg';
import leylandTrucks from '@/assets/leyland-trucks.jpg';
import switchEvBus from '@/assets/switch-ev-bus.jpg';

const products = [
  {
    id: 1,
    name: 'JCB 3DX Super EcoXcellence',
    category: 'Backhoe Loader',
    categoryHi: 'बैकहो लोडर',
    price: '₹16.50 Lakh*',
    badge: 'NEW LAUNCH',
    badgeHi: 'नई लॉन्च',
    image: heroJcb,
    path: '/jcb',
    accentColor: 'bg-jcb text-jcb-foreground',
  },
  {
    id: 2,
    name: 'Ashok Leyland 4825',
    category: 'Heavy Truck',
    categoryHi: 'हैवी ट्रक',
    price: '₹32.00 Lakh*',
    badge: 'BESTSELLER',
    badgeHi: 'बेस्टसेलर',
    image: leylandTrucks,
    path: '/ashok-leyland',
    accentColor: 'bg-leyland text-leyland-foreground',
  },
  {
    id: 3,
    name: 'Switch IeV 4 Electric Bus',
    category: 'EV Bus',
    categoryHi: 'इलेक्ट्रिक बस',
    price: '₹85.00 Lakh*',
    badge: 'ECO CHOICE',
    badgeHi: 'इको चॉइस',
    image: switchEvBus,
    path: '/switch-ev',
    accentColor: 'bg-ev text-ev-foreground',
  },
];

export function NewArrivals() {
  const { t, language } = useLanguage();

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
              <span className="text-sm font-medium text-leyland">
                {language === 'hi' ? 'हॉट डील्स' : 'Hot Deals'}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {language === 'hi' ? 'नई आमद' : 'New Arrivals'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'hi' ? 'विशेष ऑफर के साथ नवीनतम लॉन्च' : 'Latest launches with special offers'}
            </p>
          </div>
          <Link to="/jcb" className="mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              {t('common.viewAll')} {language === 'hi' ? 'उत्पाद' : 'Products'}
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
                      {language === 'hi' ? product.badgeHi : product.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'hi' ? product.categoryHi : product.category}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-jcb transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-foreground">
                        {product.price}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-jcb transition-colors">
                        <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
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
