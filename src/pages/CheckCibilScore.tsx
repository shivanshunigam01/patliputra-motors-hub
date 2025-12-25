"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CreditCard,
  User,
  Calendar,
  Phone,
  FileDown,
  Gauge,
  Lock,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";

const CheckCibilScore = () => {
  const [submitted, setSubmitted] = useState(false);

  const dummyScore = 742;

  const scoreLabel =
    dummyScore >= 750
      ? "Excellent"
      : dummyScore >= 700
      ? "Good"
      : "Needs Improvement";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/20 text-success rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                100% Secure • No Impact on Score
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Apna <span className="text-jcb">CIBIL Score</span> Check Karein
              </h1>

              <p className="text-lg text-primary-foreground/80">
                Commercial Vehicle Finance ke liye eligibility sirf 30 seconds
                mein jaaniye.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FORM + RESULT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* FORM */}
              {!submitted && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-6">
                    Enter Your Details
                  </h2>

                  <div className="space-y-4">
                    <Input icon={User} label="Full Name" />
                    <Input icon={Calendar} label="Date of Birth" type="date" />
                    <Input icon={Phone} label="Mobile Number" />
                    <Input icon={CreditCard} label="PAN Number" />
                    <Input icon={Lock} label="Aadhaar Number (Masked)" />

                    <Button
                      size="lg"
                      className="w-full bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold mt-4"
                      onClick={() => setSubmitted(true)}
                    >
                      Check CIBIL Score
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      By proceeding, you agree to our Terms & RBI-compliant
                      consent.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* RESULT */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center"
                >
                  <Gauge className="h-12 w-12 text-jcb mx-auto mb-4" />

                  <p className="text-muted-foreground mb-2">
                    Your Estimated CIBIL Score
                  </p>

                  <h3 className="text-6xl font-bold text-foreground mb-2">
                    {dummyScore}
                  </h3>

                  <span className="inline-block px-4 py-1 rounded-full bg-success/20 text-success text-sm font-medium mb-4">
                    {scoreLabel}
                  </span>

                  <p className="text-muted-foreground mb-6">
                    Aap commercial vehicle loan ke liye{" "}
                    <span className="font-semibold text-foreground">
                      eligible
                    </span>{" "}
                    hain. Finance approval fast-track hoga.
                  </p>

                  <Button
                    size="lg"
                    className="w-full gap-2 bg-primary text-primary-foreground mb-4"
                  >
                    <FileDown className="h-5 w-5" />
                    Download CIBIL Report (PDF)
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => setSubmitted(false)}
                  >
                    Check Another Customer
                  </Button>
                </motion.div>
              )}

              {/* TRUST PANEL */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-muted rounded-2xl p-6 border border-border"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Why Check CIBIL with Patliputra?
                </h3>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>✔ RBI & NBFC finance ready eligibility</li>
                  <li>✔ No impact on your actual CIBIL score</li>
                  <li>✔ Used & New Vehicle Finance supported</li>
                  <li>✔ Bihar-specific banks & NBFCs</li>
                  <li>✔ Assistance from Patliputra Finance Team</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

/* ---------- INPUT COMPONENT ---------- */
const Input = ({
  label,
  icon: Icon,
  type = "text",
}: {
  label: string;
  icon: any;
  type?: string;
}) => (
  <div>
    <label className="text-sm font-medium text-muted-foreground mb-1 block">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <input
        type={type}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={label}
      />
    </div>
  </div>
);

export default CheckCibilScore;
