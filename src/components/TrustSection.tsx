import { motion } from 'framer-motion';
import { Shield, Wrench, CreditCard, Trophy, CheckCircle } from 'lucide-react';

const trustPillars = [
  {
    icon: Shield,
    title: 'Authorized Dealer',
    description: 'Bihar\'s official partner for JCB, Leyland, Switch',
    badge: 'Genuine products, official warranty',
    color: 'text-jcb',
    bgColor: 'bg-jcb/10',
  },
  {
    icon: Wrench,
    title: 'Service Network',
    description: '20+ service points across Bihar',
    badge: '24/7 breakdown support',
    color: 'text-leyland',
    bgColor: 'bg-leyland/10',
  },
  {
    icon: CreditCard,
    title: 'Easy Finance',
    description: '80% approval rate, low interest',
    badge: 'Same-day processing',
    color: 'text-ev',
    bgColor: 'bg-ev/10',
  },
  {
    icon: Trophy,
    title: '5000+ Happy Customers',
    description: '5-star rated on Google',
    badge: 'Since 2010',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export function TrustSection() {
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
            Why Choose Patliputra?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bihar's most trusted name in commercial vehicles since 2010
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 ${pillar.bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className={`h-7 w-7 ${pillar.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {pillar.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className={`h-4 w-4 ${pillar.color}`} />
                  <span className="text-foreground font-medium">{pillar.badge}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
