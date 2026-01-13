import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Shield,
  Calendar,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ProductCompareCheckbox } from "@/components/ProductCompareCheckbox";

import usedVehicles from "@/assets/used-vehicles.jpg";

const vehicles = [
  {
    id: "used-1",
    name: "Ashok Leyland 1616 Tipper",
    year: "2019",
    km: "85,000 km",
    price: "₹12.50 Lakh",
    emi: "₹28,500/month",
    badge: "CERTIFIED",
    image: usedVehicles,
    condition: "Excellent",
    owner: "First Owner",
    specs: { fuel: "Diesel", capacity: "16T GVW", warranty: "1 Year", application: "Mining, Construction" },
  },
  {
    id: "used-2",
    name: "JCB 3DX Backhoe Loader",
    year: "2020",
    km: "3,500 hrs",
    price: "₹11.80 Lakh",
    emi: "₹26,800/month",
    badge: "TOP PICK",
    image: usedVehicles,
    condition: "Good",
    owner: "First Owner",
    specs: { fuel: "Diesel", capacity: "1.0 m³", warranty: "6 Months", application: "Construction, Farming" },
  },
  {
    id: "used-3",
    name: "Ashok Leyland 4825 Truck",
    year: "2018",
    km: "1,20,000 km",
    price: "₹18.00 Lakh",
    emi: "₹41,000/month",
    badge: "BEST VALUE",
    image: usedVehicles,
    condition: "Excellent",
    owner: "Second Owner",
    specs: { fuel: "Diesel", capacity: "49T GVW", warranty: "6 Months", application: "Long Haul Transport" },
  },
  {
    id: "used-4",
    name: "Tata Prima 4928",
    year: "2021",
    km: "65,000 km",
    price: "₹22.50 Lakh",
    emi: "₹51,200/month",
    badge: "LOW KM",
    image: usedVehicles,
    condition: "Excellent",
    owner: "First Owner",
    specs: { fuel: "Diesel", capacity: "49T GVW", warranty: "1 Year", application: "Heavy Transport" },
  },
  {
    id: "used-5",
    name: "Ashok Leyland DOST+",
    year: "2022",
    km: "35,000 km",
    price: "₹5.80 Lakh",
    emi: "₹13,200/month",
    badge: "LIKE NEW",
    image: usedVehicles,
    condition: "Excellent",
    owner: "First Owner",
    specs: { fuel: "Diesel", capacity: "2.5T", warranty: "1 Year", application: "Last Mile Delivery" },
  },
  {
    id: "used-6",
    name: "JCB JS205 Excavator",
    year: "2019",
    km: "5,200 hrs",
    price: "₹28.00 Lakh",
    emi: "₹63,700/month",
    badge: "INSPECTED",
    image: usedVehicles,
    condition: "Good",
    owner: "First Owner",
    specs: { fuel: "Diesel", capacity: "0.9 m³", warranty: "6 Months", application: "Heavy Earthmoving" },
  },
];

const categories = [
  "All",
  "Tipper Trucks",
  "Loaders/JCB",
  "Buses",
  "LCV/Pickup",
];

const UsedVehiclesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Banner - Fixed height with min-height and padding */}
        <section className="relative min-h-[55vh] lg:min-h-[65vh] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="absolute inset-0">
            <img
              src={usedVehicles}
              alt="Certified Used Vehicles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/20 text-success rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                150-Point Inspection Certified
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                <span className="text-jcb">Certified Used</span> Commercial
                Vehicles
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-8">
                Pre-owned vehicles with warranty. Inspected, certified, and
                ready for work. Finance available.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919876543210">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold"
                  >
                    <Phone className="h-5 w-5" />
                    Get Best Deals
                  </Button>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Schedule Inspection
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-muted border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 text-success mb-2" />
                <p className="font-semibold text-foreground">
                  150-Point Inspection
                </p>
                <p className="text-sm text-muted-foreground">
                  Thorough quality check
                </p>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCcw className="h-8 w-8 text-jcb mb-2" />
                <p className="font-semibold text-foreground">
                  7-Day Return Policy
                </p>
                <p className="text-sm text-muted-foreground">
                  No questions asked
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-ev mb-2" />
                <p className="font-semibold text-foreground">
                  Finance Pre-Approved
                </p>
                <p className="text-sm text-muted-foreground">
                  Easy loan process
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-8 w-8 text-leyland mb-2" />
                <p className="font-semibold text-foreground">
                  Warranty Available
                </p>
                <p className="text-sm text-muted-foreground">
                  Up to 1 year coverage
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    category === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-success text-success-foreground rounded-full text-xs font-bold tracking-wide">
                        🎖️ {vehicle.badge}
                      </div>
                      {/* Compare Checkbox */}
                      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                        <ProductCompareCheckbox
                          product={{
                            id: vehicle.id,
                            name: vehicle.name,
                            category: `${vehicle.year} • ${vehicle.km}`,
                            price: vehicle.price,
                            brand: 'Used Vehicle',
                            image: vehicle.image,
                            specs: vehicle.specs,
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {vehicle.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span>{vehicle.year}</span>
                        <span>•</span>
                        <span>{vehicle.km}</span>
                        <span>•</span>
                        <span>{vehicle.owner}</span>
                      </div>

                      {/* Condition */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-muted-foreground">
                          Condition:
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            vehicle.condition === "Excellent"
                              ? "text-success"
                              : "text-jcb"
                          }`}
                        >
                          {vehicle.condition}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-2xl font-bold text-foreground">
                              {vehicle.price}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              💳 EMI: {vehicle.emi}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a href="tel:+919876543210" className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-jcb text-jcb-foreground hover:bg-jcb/90"
                            >
                              Call Seller
                            </Button>
                          </a>
                          <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                            >
                              WhatsApp
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Sell Your Vehicle
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Looking to sell your commercial vehicle? Get the best price from
              Bihar's most trusted dealer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210">
                <Button
                  size="lg"
                  className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  Get Free Valuation
                </Button>
              </a>
              <Link to="/finance">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold"
                >
                  Used Vehicle Finance
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default UsedVehiclesPage;
