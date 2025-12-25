import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Patna Contractor',
    rating: 5,
    text: 'JCB 3DX se hamara construction business double ho gaya. Patliputra ki service bhi bahut acchi hai. Highly recommended for Bihar contractors!',
    avatar: 'RK',
  },
  {
    id: 2,
    name: 'Mohammad Imran',
    role: 'Transport Business Owner',
    rating: 5,
    text: 'Ashok Leyland trucks ka fleet liya yahan se. Finance bhi easy mila, aur after-sales support excellent hai. Bihar mein best dealer!',
    avatar: 'MI',
  },
  {
    id: 3,
    name: 'Priya Singh',
    role: 'Municipality Officer',
    rating: 5,
    text: 'Switch EV buses ne hamari city transport ko completely change kar diya. Zero emission, low running cost. Future of Bihar transport!',
    avatar: 'PS',
  },
  {
    id: 4,
    name: 'Sunil Choudhary',
    role: 'Farmer & Contractor',
    rating: 5,
    text: 'Used tipper truck liya Patliputra se. 150-point inspection ke baad bahut confidence mila. Price bhi market se kam tha!',
    avatar: 'SC',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            Customer Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by 5000+ happy customers across Bihar
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
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-jcb text-jcb" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonials[currentIndex].role}
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
