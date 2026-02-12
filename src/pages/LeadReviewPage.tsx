import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import { TCOItem } from '@/components/TCOPopup';

interface SelectedProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  category: string;
  tcoItems?: TCOItem[];
}

export function LeadReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    message: '',
  });

  const products: SelectedProduct[] = location.state?.products || [];

  // Fetch AI suggestion if 2 products selected
  const fetchAiSuggestion = async () => {
    if (products.length !== 2) return;

    setIsLoadingSuggestion(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-suggestion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            products: products.map(p => ({
              name: p.name,
              category: p.category,
              price: p.price,
              tcoItems: p.tcoItems,
            })),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAiSuggestion(data.suggestion);
      }
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.email) {
      toast.error(language === 'hi' ? 'सभी आवश्यक फील्ड भरें' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerData: formData,
        selectedProducts: products.map(p => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          price: p.price,
          category: p.category,
        })),
      };

      const response = await fetch('https://api.patliputragroup.com/final-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.success(language === 'hi' ? 'आपकी पूछताछ सफलतापूर्वक सबमिट की गई' : 'Your enquiry submitted successfully');
      navigate('/');
    } catch (error) {
      toast.error(language === 'hi' ? 'सबमिशन विफल' : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-4">
            {language === 'hi' ? 'कोई उत्पाद चयनित नहीं' : 'No products selected'}
          </p>
          <Button onClick={() => navigate(-1)}>
            {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

    <main className="flex-1 container mx-auto px-4 pt-32 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              {language === 'hi' ? 'आपकी समीक्षा' : 'Your Review'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'hi' ? 'अपना विवरण भरें और जारी रखें' : 'Complete your details and proceed'}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Products & AI Suggestion */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">
                {language === 'hi' ? 'चयनित उत्पाद' : 'Selected Products'}
              </h2>
              <div className="space-y-4">
                {products.map((product, idx) => (
                  <div key={product.id} className="flex gap-4 p-4 border border-border/50 rounded-lg bg-muted/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                      <p className="text-primary font-semibold mt-2">{product.price}</p>
                      
                      {/* TCO Summary */}
                      {product.tcoItems && product.tcoItems.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                            {language === 'hi' ? 'लागत' : 'Cost Details'}
                          </p>
                          <div className="space-y-1">
                            {product.tcoItems.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{item.label}</span>
                                <span className="font-medium">₹{item.value.toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Suggestion for Dual Selection */}
            {products.length === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    {language === 'hi' ? 'AI सुझाव' : 'AI Recommendation'}
                  </h2>
                  {isLoadingSuggestion && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                
                {aiSuggestion ? (
                  <p className="text-foreground leading-relaxed">{aiSuggestion}</p>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchAiSuggestion}
                    disabled={isLoadingSuggestion}
                  >
                    {isLoadingSuggestion ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
                      </>
                    ) : (
                      language === 'hi' ? 'सुझाव प्राप्त करें' : 'Get AI Suggestion'
                    )}
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-24"
          >
            <h2 className="text-xl font-bold text-foreground mb-6">
              {language === 'hi' ? 'अपना विवरण' : 'Your Details'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'hi' ? 'नाम *' : 'Name *'}
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={language === 'hi' ? 'आपका नाम' : 'Your name'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'hi' ? 'मोबाइल *' : 'Mobile *'}
                </label>
                <Input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder={language === 'hi' ? '10 अंक' : '10 digits'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'hi' ? 'ईमेल *' : 'Email *'}
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={language === 'hi' ? 'आपका ईमेल' : 'Your email'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'hi' ? 'शहर' : 'City'}
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder={language === 'hi' ? 'आपका शहर' : 'Your city'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'hi' ? 'संदेश' : 'Message'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={language === 'hi' ? 'कोई संदेश...' : 'Any message...'}
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {language === 'hi' ? 'सबमिट हो रहा है...' : 'Submitting...'}
                  </>
                ) : (
                  language === 'hi' ? 'पूछताछ सबमिट करें' : 'Submit Enquiry'
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
