import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    roleEn: 'Patna Contractor',
    roleHi: 'पटना ठेकेदार',
    rating: 5,
    textEn: "The JCB 3DX doubled our construction business output. Patliputra's service is excellent. Highly recommended for Bihar contractors!",
    textHi: 'JCB 3DX ने हमारे निर्माण व्यवसाय की उत्पादकता दोगुनी कर दी। पाटलिपुत्र की सेवा उत्कृष्ट है। बिहार के ठेकेदारों के लिए अत्यधिक अनुशंसित!',
    avatar: 'RK',
  },
  {
    id: 2,
    name: 'Mohammad Imran',
    roleEn: 'Transport Business Owner',
    roleHi: 'परिवहन व्यवसाय मालिक',
    rating: 5,
    textEn: 'Purchased a fleet of Ashok Leyland trucks from here. Got easy financing and excellent after-sales support. Best dealer in Bihar!',
    textHi: 'यहां से अशोक लेलैंड ट्रकों का फ्लीट खरीदा। आसान फाइनेंसिंग और उत्कृष्ट आफ्टर-सेल्स सपोर्ट मिला। बिहार का सबसे अच्छा डीलर!',
    avatar: 'MI',
  },
  {
    id: 3,
    name: 'Priya Singh',
    roleEn: 'Municipality Officer',
    roleHi: 'नगरपालिका अधिकारी',
    rating: 5,
    textEn: 'Switch EV buses completely transformed our city transport. Zero emissions, low running cost. The future of Bihar transport!',
    textHi: 'स्विच EV बसों ने हमारे शहरी परिवहन को पूरी तरह बदल दिया। शून्य उत्सर्जन, कम परिचालन लागत। बिहार परिवहन का भविष्य!',
    avatar: 'PS',
  },
  {
    id: 4,
    name: 'Sunil Choudhary',
    roleEn: 'Farmer & Contractor',
    roleHi: 'किसान और ठेकेदार',
    rating: 5,
    textEn: 'Bought a Pre-Owned Machines tipper truck from Patliputra. The 150-point inspection gave me confidence. Price was below market!',
    textHi: 'पाटलिपुत्र से सर्टिफाइड रिफर्बिश्ड टिपर ट्रक खरीदा। 150-पॉइंट निरीक्षण से विश्वास मिला। कीमत बाजार से कम थी!',
    avatar: 'SC',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="w-12 h-12 rounded-full shadow-lg bg-card hover:bg-jcb hover:text-jcb-foreground hover:border-jcb transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="w-12 h-12 rounded-full shadow-lg bg-card hover:bg-jcb hover:text-jcb-foreground hover:border-jcb transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Testimonial Card */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl p-8 lg:p-12 shadow-xl border border-border"
              >
                <Quote className="h-12 w-12 text-jcb/20 mb-6" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-jcb text-jcb" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                  "{language === 'hi' ? currentTestimonial.textHi : currentTestimonial.textEn}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {currentTestimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {language === 'hi' ? currentTestimonial.roleHi : currentTestimonial.roleEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-jcb w-8'
                    : 'bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
