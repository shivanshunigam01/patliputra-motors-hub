"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CreditCard,
  User,
  Phone,
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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


const CheckCibilScore = () => {
  const { t } = useLanguage();
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const aadhaarInputRef = useRef<HTMLInputElement>(null);
  const panInputRef = useRef<HTMLInputElement>(null);


  const [form, setForm] = useState({
    name: "",
    mobile: "",
    pan: "",
  });

  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    toast.loading("Generating CIBIL PDF…", { id: "cibil-pdf" });
    try {
      const res = await fetch(
        "https://api.patliputragroup.com/payments/experian-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            mobile: form.mobile,
            pan: form.pan,
            consent: "Y",
          }),
        }
      );

      const data = await res.json();
      if (!data.ok || !data.credit_report_link) {
        toast.error("Failed to generate CIBIL PDF", { id: "cibil-pdf" });
        return;
      }

      toast.success("CIBIL PDF ready", { id: "cibil-pdf" });
      window.open(data.credit_report_link, "_blank");
    } catch (err) {
      toast.error("PDF download failed", { id: "cibil-pdf" });
    } finally {
      setPdfLoading(false);
    }
  };

  const handleCheckCibil = async () => {
    if (!form.name || !form.mobile || !form.pan) {
      toast.warning("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const ok = await loadRazorpay();
      if (!ok) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const orderRes = await fetch(
        "https://api.patliputragroup.com/payments/razorpay/order",
        { method: "POST" }
      );

      const order = await orderRes.json();
         console.log("ORDER RESPONSE:", order);
      if (!order.id) {
        throw new Error("Order creation failed");
      }

     const rzp = new (window as any).Razorpay({
  key: order.key_id,
  order_id: order.id,
  amount: order.amount,
  currency: "INR",
  name: "Patliputra Group",
  description: "CIBIL Check",
  prefill: {
    name: form.name,
    contact: form.mobile,
  },
  theme: {
    color: "#facc15",
  },
  handler: async function (resp: any) {
    console.log("RAZORPAY SUCCESS:", resp);
    toast.success("Payment successful. Downloading CIBIL PDF...");
    await handleDownloadPdf();
  },
});


      rzp.open();
    } catch (err) {
      toast.error("CIBIL check failed");
    } finally {
      setLoading(false);
    }
  };

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
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />

                    <Input
                      icon={Phone}
                      label={t("cibil.mobileLabel")}
                      value={form.mobile}
                      onChange={(v) =>
                        setForm({ ...form, mobile: v.replace(/\D/g, "").slice(0, 10) })
                      }
                    />

                    <Input
                      icon={CreditCard}
                      label={t("cibil.panLabel")}
                      value={form.pan}
                      onChange={(v) =>
                        setForm({ ...form, pan: v.toUpperCase().slice(0, 10) })
                      }
                    />
                    <Input icon={Lock} label={t("cibil.aadhaarLabel")} />

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
                      disabled={loading || pdfLoading}
                    >
                      {loading || pdfLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing payment...
                        </span>
                      ) : (
                        "Pay & Download CIBIL Report"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {t("cibil.consent")}
                    </p>
                  </div>
                </motion.div>

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
  value,
  onChange,
}: {
  label: string;
  icon: any;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
}) => (
  <div>
    <label className="text-sm font-medium text-muted-foreground mb-1 block">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={label}
      />
    </div>
  </div>
);


export default CheckCibilScore;