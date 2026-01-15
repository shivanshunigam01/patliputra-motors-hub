import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee, Phone } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EMICalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(1500000); // 15 Lakh default
  const [downPayment, setDownPayment] = useState(300000); // 3 Lakh default
  const [tenure, setTenure] = useState(36); // 36 months default

  // Separate input display states for free typing
  const [priceInput, setPriceInput] = useState(vehiclePrice.toLocaleString('en-IN'));
  const [downInput, setDownInput] = useState(downPayment.toLocaleString('en-IN'));
  const [tenureInput, setTenureInput] = useState(tenure.toString());

  const interestRate = 10.5; // Annual interest rate

  // Constraints
  const minPrice = 500000;
  const maxPrice = 5000000;
  const minDown = 0;
  const maxDown = 2000000;
  const minTenure = 12;
  const maxTenure = 60;

  const emiDetails = useMemo(() => {
    const principal = vehiclePrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const n = tenure;

    if (principal <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalAmount: 0 };
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    };
  }, [vehiclePrice, downPayment, tenure]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  // Handler for price input - allows free typing
  const handlePriceInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    setPriceInput(rawValue);
    
    const numValue = parseInt(rawValue) || 0;
    setVehiclePrice(numValue);
    
    // Adjust down payment if it exceeds new price limit
    if (downPayment > numValue * 0.5) {
      const newDown = Math.max(0, Math.min(numValue * 0.5, maxDown));
      setDownPayment(newDown);
      setDownInput(newDown.toLocaleString('en-IN'));
    }
  }, [downPayment]);

  // Clamp price on blur
  const handlePriceBlur = useCallback(() => {
    const clamped = Math.min(Math.max(vehiclePrice, minPrice), maxPrice);
    setVehiclePrice(clamped);
    setPriceInput(clamped.toLocaleString('en-IN'));
    
    // Also adjust down payment if needed
    if (downPayment > clamped * 0.5) {
      const newDown = Math.min(clamped * 0.5, maxDown);
      setDownPayment(newDown);
      setDownInput(newDown.toLocaleString('en-IN'));
    }
  }, [vehiclePrice, downPayment]);

  // Handler for down payment input - allows free typing
  const handleDownInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    setDownInput(rawValue);
    
    const numValue = parseInt(rawValue) || 0;
    setDownPayment(numValue);
  }, []);

  // Clamp down payment on blur
  const handleDownBlur = useCallback(() => {
    const maxAllowed = Math.min(vehiclePrice * 0.5, maxDown);
    const clamped = Math.min(Math.max(downPayment, minDown), maxAllowed);
    setDownPayment(clamped);
    setDownInput(clamped.toLocaleString('en-IN'));
  }, [vehiclePrice, downPayment]);

  // Handler for tenure input - allows free typing
  const handleTenureInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setTenureInput(rawValue);
    
    const numValue = parseInt(rawValue) || 0;
    setTenure(numValue);
  }, []);

  // Clamp tenure on blur
  const handleTenureBlur = useCallback(() => {
    const clamped = Math.min(Math.max(tenure, minTenure), maxTenure);
    setTenure(clamped);
    setTenureInput(clamped.toString());
  }, [tenure]);

  // Slider handlers - update both state and input display
  const handlePriceSlider = useCallback((value: number[]) => {
    setVehiclePrice(value[0]);
    setPriceInput(value[0].toLocaleString('en-IN'));
    
    // Adjust down payment if it exceeds new price limit
    if (downPayment > value[0] * 0.5) {
      const newDown = Math.min(value[0] * 0.5, maxDown);
      setDownPayment(newDown);
      setDownInput(newDown.toLocaleString('en-IN'));
    }
  }, [downPayment]);

  const handleDownSlider = useCallback((value: number[]) => {
    setDownPayment(value[0]);
    setDownInput(value[0].toLocaleString('en-IN'));
  }, []);

  const handleTenureSlider = useCallback((value: number[]) => {
    setTenure(value[0]);
    setTenureInput(value[0].toString());
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ev/10 text-ev rounded-full text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              Easy Finance
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Apna EMI Calculate Karein
            </h2>
            <p className="text-muted-foreground text-lg">
              Instant EMI calculation for your dream vehicle
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl p-6 lg:p-10 border border-border">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Sliders + Inputs */}
              <div className="space-y-8">
                {/* Vehicle Price */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-foreground">Vehicle Price</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">₹</span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={priceInput}
                        onChange={handlePriceInput}
                        onBlur={handlePriceBlur}
                        className="w-28 h-8 text-right text-sm font-bold text-jcb bg-jcb/5 border-jcb/20"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[Math.min(Math.max(vehiclePrice, minPrice), maxPrice)]}
                    onValueChange={handlePriceSlider}
                    min={minPrice}
                    max={maxPrice}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>₹5 Lakh</span>
                    <span>₹50 Lakh</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-foreground">Down Payment</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">₹</span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={downInput}
                        onChange={handleDownInput}
                        onBlur={handleDownBlur}
                        className="w-28 h-8 text-right text-sm font-bold text-ev bg-ev/5 border-ev/20"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[Math.min(Math.max(downPayment, minDown), Math.min(vehiclePrice * 0.5, maxDown))]}
                    onValueChange={handleDownSlider}
                    min={minDown}
                    max={Math.min(Math.max(vehiclePrice, minPrice) * 0.5, maxDown)}
                    step={25000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>₹0</span>
                    <span>₹20 Lakh</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-foreground">Loan Tenure</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={tenureInput}
                        onChange={handleTenureInput}
                        onBlur={handleTenureBlur}
                        className="w-16 h-8 text-right text-sm font-bold text-leyland bg-leyland/5 border-leyland/20"
                      />
                      <span className="text-sm text-muted-foreground">months</span>
                    </div>
                  </div>
                  <Slider
                    value={[Math.min(Math.max(tenure, minTenure), maxTenure)]}
                    onValueChange={handleTenureSlider}
                    min={minTenure}
                    max={maxTenure}
                    step={6}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>12 months</span>
                    <span>60 months</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 lg:p-8 text-primary-foreground">
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b border-primary-foreground/20">
                    <p className="text-sm text-primary-foreground/70 mb-2">Approx Monthly EMI</p>
                    <div className="flex items-center justify-center gap-2">
                      <IndianRupee className="h-8 w-8" />
                      <motion.span
                        key={emiDetails.emi}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl lg:text-5xl font-bold"
                      >
                        {emiDetails.emi.toLocaleString('en-IN')}
                      </motion.span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-primary-foreground/70 mb-1">Loan Amount</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(Math.max(0, vehiclePrice - downPayment))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-primary-foreground/70 mb-1">Total Interest</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(emiDetails.totalInterest)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-primary-foreground/20 text-center">
                    <p className="text-xs text-primary-foreground/60 mb-4">
                      * Final EMI bank approval par depend karega
                    </p>
                    <a href="tel:+919876543210">
                      <Button 
                        size="lg"
                        className="w-full bg-jcb text-jcb-foreground hover:bg-jcb/90 gap-2 font-semibold"
                      >
                        <Phone className="h-5 w-5" />
                        Finance Team se Baat Karein
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
