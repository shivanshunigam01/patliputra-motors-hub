import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle, FileText, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { EMICalculator } from '@/components/EMICalculator';
import { useToast } from '@/hooks/use-toast';

const partners = ['HDFC Bank', 'SBI', 'Mahindra Finance', 'Tata Capital', 'Bajaj Finserv'];
const districts = ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Nalanda', 'Vaishali', 'Other'];



const FinancePage = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ vehicleType: '', business: '', name: '', mobile: '', district: '' });
  const [submitting, setSubmitting] = useState(false);


const handleSubmit = async () => {
  if (!formData.name || !formData.mobile || !formData.district) {
    toast({
      title: "Missing details",
      description: "Please fill all required fields",
      variant: "destructive",
    });
    return;
  }

  if (!/^\d{10}$/.test(formData.mobile)) {
    toast({
      title: "Invalid mobile number",
      description: "Please enter a valid 10-digit mobile number",
      variant: "destructive",
    });
    return;
  }

  setSubmitting(true);

  const toastId = toast({
    title: "Submitting application…",
    description: "Please wait while we process your request",
  });

  try {
    const res = await fetch("http://localhost:5000/finance/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicleType: formData.vehicleType,
        business: formData.business,
        name: formData.name,
        mobile: formData.mobile,
        district: formData.district,
        source: "Finance Page",
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data?.error || "Submission failed");
    }

    toast({
      title: "✅ Application Received!",
      description: `Application No: ${data.application_number}. Our finance team will call you within 2 hours.`,
    });

    setStep(4);
  } catch (err: any) {
    toast({
      title: "Submission failed",
      description: err.message || "Please try again",
      variant: "destructive",
    });
  } finally {
    setSubmitting(false);
  }
};



  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Bihar's <span className="text-jcb">Easiest</span> Finance
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {['80% Approval Rate', 'Low Interest Rates', 'Minimal Documentation', '48-Hour Approval'].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto bg-card rounded-2xl shadow-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Check Eligibility in 2 Minutes</h2>
              
              {step < 4 ? (
                <div className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">What type of vehicle are you looking for?</p>
                      <div className="grid grid-cols-2 gap-3">
                        {['JCB / Machine', 'Truck / Commercial', 'Bus', 'Used Vehicle'].map((type) => (
                          <Button key={type} variant={formData.vehicleType === type ? 'default' : 'outline'} className="h-14" onClick={() => { setFormData({ ...formData, vehicleType: type }); setStep(2); }}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">What is your business type?</p>
                      <div className="grid grid-cols-2 gap-3">
                        {['Construction', 'Transport', 'Farming', 'Municipality', 'Other'].map((biz) => (
                          <Button key={biz} variant={formData.business === biz ? 'default' : 'outline'} className="h-12" onClick={() => { setFormData({ ...formData, business: biz }); setStep(3); }}>
                            {biz}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-4">
                      <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      <Input type="tel" placeholder="Mobile Number" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                      <Select onValueChange={(val) => setFormData({ ...formData, district: val })}>
                        <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
                        <SelectContent>{districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                      </Select>
                    <Button
  className="w-full bg-jcb text-jcb-foreground hover:bg-jcb/90"
  onClick={handleSubmit}
  disabled={submitting || !formData.name || !formData.mobile}
>
  {submitting ? (
    <span className="flex items-center justify-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      Submitting…
    </span>
  ) : (
    'Submit Application'
  )}
</Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Application Received!</h3>
                  <p className="text-muted-foreground mb-6">Our finance team will call you within 2 hours.</p>
                  <a href="tel:+919876543210"><Button className="gap-2 bg-jcb text-jcb-foreground"><Phone className="h-4 w-4" />Call Now</Button></a>
                </div>
              )}
            </div>
          </div>
        </section>

        <EMICalculator />

        {/* Partners */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold text-muted-foreground mb-6">Our Finance Partners</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {partners.map((p) => (
                <div key={p} className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default FinancePage;
