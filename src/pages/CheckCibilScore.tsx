"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CreditCard,
  User,
  Phone,
  FileDown,
  Gauge,
  Lock,
  Upload,
  X,
  CheckCircle,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const CheckCibilScore = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const aadhaarInputRef = useRef<HTMLInputElement>(null);
  const panInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
  customer_name: "",
  mobile: "",
  pan: "",
  dob: "",
});

const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);

  const dummyScore = 742;

  const scoreLabel =
    dummyScore >= 750
      ? t("cibil.excellent")
      : dummyScore >= 700
      ? t("cibil.good")
      : t("cibil.needsImprovement");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "aadhaar" | "pan"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload PDF, PNG, or JPG file only");
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (type === "aadhaar") {
        setAadhaarFile(file);
      } else {
        setPanFile(file);
      }
    }
  };

  const removeFile = (type: "aadhaar" | "pan") => {
    if (type === "aadhaar") {
      setAadhaarFile(null);
      if (aadhaarInputRef.current) aadhaarInputRef.current.value = "";
    } else {
      setPanFile(null);
      if (panInputRef.current) panInputRef.current.value = "";
    }
  };

  const handleCheckCibil = async () => {
  try {
    setLoading(true);

    // 1️⃣ Create Razorpay order
    const orderRes = await createCibilOrder({
      customer_name: form.customer_name,
      mobile: form.mobile,
      pan: form.pan,
      dob: form.dob,
    });

    // 2️⃣ Open Razorpay Checkout
    const options = {
      key: orderRes.razorpay_key_id,
      amount: orderRes.order.amount,
      currency: orderRes.order.currency,
      name: "Patliputra Finance",
      description: "CIBIL Score Check",
      order_id: orderRes.order.id,
      handler: async (response: any) => {
        // 3️⃣ Verify payment + check CIBIL
        const result = await verifyCibilPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        setResult(result);
        setSubmitted(true);
      },
      prefill: {
        name: form.customer_name,
        contact: form.mobile,
      },
      theme: {
        color: "#FBBF24",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("Payment failed or cancelled");
  } finally {
    setLoading(false);
  }
};

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
                {t("cibil.badge")}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {t("cibil.title")}
              </h1>

              <p className="text-lg text-primary-foreground/80">
                {t("cibil.subtitle")}
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
                    {t("cibil.formTitle")}
                  </h2>

                  <div className="space-y-4">
                   <Input
  icon={User}
  label={t("cibil.nameLabel")}
  value={form.customer_name}
  onChange={(e) =>
    setForm({ ...form, customer_name: e.target.value })
  }
/>
                    <Input icon={Phone} label={t("cibil.mobileLabel")} value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} />
                    <Input icon={CreditCard} label={t("cibil.panLabel")} value={form.pan} onChange={(e) => setForm({...form, pan: e.target.value})} />
                    <Input icon={Lock} label={t("cibil.aadhaarLabel")} value={form.dob} onChange={(e) => setForm({...form, dob: e.target.value})} />

                    {/* Aadhaar Upload */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">
                        {t("cibil.aadhaarUploadLabel")} ({t("common.optional")})
                      </label>
                      <input
                        ref={aadhaarInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileChange(e, "aadhaar")}
                        className="hidden"
                        id="aadhaar-upload"
                      />
                      {!aadhaarFile ? (
                        <label
                          htmlFor="aadhaar-upload"
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-dashed border-border bg-background hover:bg-muted cursor-pointer transition-colors"
                        >
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {t("cibil.uploadHint")}
                          </span>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between gap-2 w-full py-3 px-4 rounded-xl border border-success/30 bg-success/5">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-success" />
                            <span className="text-sm text-foreground truncate max-w-[180px]">
                              {aadhaarFile.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile("aadhaar")}
                            className="p-1 hover:bg-muted rounded-full"
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* PAN Upload */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">
                        {t("cibil.panUploadLabel")} ({t("common.optional")})
                      </label>
                      <input
                        ref={panInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileChange(e, "pan")}
                        className="hidden"
                        id="pan-upload"
                      />
                      {!panFile ? (
                        <label
                          htmlFor="pan-upload"
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-dashed border-border bg-background hover:bg-muted cursor-pointer transition-colors"
                        >
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {t("cibil.uploadHint")}
                          </span>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between gap-2 w-full py-3 px-4 rounded-xl border border-success/30 bg-success/5">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-success" />
                            <span className="text-sm text-foreground truncate max-w-[180px]">
                              {panFile.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile("pan")}
                            className="p-1 hover:bg-muted rounded-full"
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      )}
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-jcb text-jcb-foreground hover:bg-jcb-hover font-semibold mt-4"
                    onClick={handleCheckCibil}
disabled={loading}
                    >
                      {t("cibil.checkScore")}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {t("cibil.consent")}
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
                    {t("cibil.resultTitle")}
                  </p>

                  <h3 className="text-6xl font-bold text-foreground mb-2">
                    {dummyScore}
                  </h3>

                  <span className="inline-block px-4 py-1 rounded-full bg-success/20 text-success text-sm font-medium mb-4">
                    {scoreLabel}
                  </span>

                  <p className="text-muted-foreground mb-6">
                    {t("cibil.eligibleMessage")}
                  </p>

                  <Button
                    size="lg"
                    className="w-full gap-2 bg-primary text-primary-foreground mb-4"
                  >
                    <FileDown className="h-5 w-5" />
                    {t("cibil.downloadReport")}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => setSubmitted(false)}
                  >
                    {t("cibil.checkAnother")}
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
                  {t("cibil.whyTitle")}
                </h3>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>✔ {t("cibil.reason1")}</li>
                  <li>✔ {t("cibil.reason2")}</li>
                  <li>✔ {t("cibil.reason3")}</li>
                  <li>✔ {t("cibil.reason4")}</li>
                  <li>✔ {t("cibil.reason5")}</li>
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