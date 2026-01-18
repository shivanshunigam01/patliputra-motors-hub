import { motion } from 'framer-motion';
import { Shield, Wrench, CreditCard, Trophy, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const trustPillars = [
  {
    icon: Shield,
    titleEn: 'Authorized Dealer',
    titleHi: 'अधिकृत डीलर',
    descriptionEn: "Bihar's official partner for JCB, Leyland, Switch",
    descriptionHi: 'JCB, लेलैंड, स्विच के लिए बिहार का आधिकारिक साथी',
    badgeEn: 'Genuine products, official warranty',
    badgeHi: 'असली उत्पाद, आधिकारिक वारंटी',
    color: 'text-jcb',
    bgColor: 'bg-jcb/10',
  },
  {
    icon: Wrench,
    titleEn: 'Service Network',
    titleHi: 'सेवा नेटवर्क',
    descriptionEn: '20+ service points across Bihar',
    descriptionHi: 'बिहार भर में 20+ सेवा केंद्र',
    badgeEn: '24/7 breakdown support',
    badgeHi: '24/7 ब्रेकडाउन सहायता',
    color: 'text-leyland',
    bgColor: 'bg-leyland/10',
  },
  {
    icon: CreditCard,
    titleEn: 'Easy Finance',
    titleHi: 'आसान फाइनेंस',
    descriptionEn: '80% approval rate, low interest',
    descriptionHi: '80% अनुमोदन दर, कम ब्याज',
    badgeEn: 'Same-day processing',
    badgeHi: 'उसी दिन प्रोसेसिंग',
    color: 'text-ev',
    bgColor: 'bg-ev/10',
  },
  {
    icon: Trophy,
    titleEn: '5000+ Happy Customers',
    titleHi: '5000+ खुश ग्राहक',
    descriptionEn: '5-star rated on Google',
    descriptionHi: 'Google पर 5-स्टार रेटिंग',
    badgeEn: 'Since 2010',
    badgeHi: '2010 से',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export function TrustSection() {
  const { t, language } = useLanguage();

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
            {t('trust.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('trust.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={pillar.titleEn}
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
                  {language === 'hi' ? pillar.titleHi : pillar.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {language === 'hi' ? pillar.descriptionHi : pillar.descriptionEn}
                </p>
                
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className={`h-4 w-4 ${pillar.color}`} />
                  <span className="text-foreground font-medium">
                    {language === 'hi' ? pillar.badgeHi : pillar.badgeEn}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
