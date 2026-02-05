"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { biharDistricts } from "@/data/dealers";

const ContactPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    district: "",
    message: "",
    contactMethod: "call",
  });

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        description: "Enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    toast({
      title: "Submitting enquiry…",
      description: "Please wait",
    });

    try {
      const res = await fetch("http://localhost:5000/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Website",
          source_page: "Contact Page",

          customer_name: formData.name,
          customer_mobile: formData.mobile,
          customer_district: formData.district,

          note: formData.message
            ? `${formData.message} | Preferred contact: ${formData.contactMethod}`
            : `Preferred contact: ${formData.contactMethod}`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Submission failed");
      }

      setReferenceId(data.lead_number);
      setSubmitted(true);

      toast({
        title: "✅ Enquiry received!",
        description: "Our team will contact you shortly.",
      });
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
        {/* HERO */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {t("contact.heroTitle")}
              </h1>
              <p className="text-lg text-primary-foreground/80">
                {t("contact.heroSubtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* INFO */}
              <div className="space-y-6">
                <InfoBlock
                  icon={<MapPin />}
                  title={t("contact.addressTitle")}
                  text={t("contact.address")}
                />
                <InfoBlock
                  icon={<Phone />}
                  title={t("contact.phoneTitle")}
                  text="+91 98765 43210"
                  link="tel:+919876543210"
                />
                <InfoBlock
                  icon={<Mail />}
                  title={t("contact.emailTitle")}
                  text="sales@patliputraautos.com"
                  link="mailto:sales@patliputraautos.com"
                />
                <InfoBlock
                  icon={<Clock />}
                  title={t("contact.hoursTitle")}
                  text="Mon–Sat: 9:00 AM – 7:00 PM"
                />
              </div>

              {/* FORM */}
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="bg-card p-8 rounded-xl border border-border shadow-lg space-y-6"
                >
                  <h2 className="text-2xl font-bold">
                    {t("contact.formTitle")}
                  </h2>

                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Mobile Number *</Label>
                    <Input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>District *</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(val) =>
                        setFormData({ ...formData, district: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {biharDistricts.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Message</Label>
                    <Textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label className="block mb-2">
                      Preferred Contact Method
                    </Label>
                    <RadioGroup
                      value={formData.contactMethod}
                      onValueChange={(val) =>
                        setFormData({ ...formData, contactMethod: val })
                      }
                      className="flex gap-6"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="call" id="call" />
                        <Label htmlFor="call">Call</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <Label htmlFor="whatsapp">WhatsApp</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-jcb text-jcb-foreground"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Enquiry
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="bg-card p-8 rounded-xl border shadow-lg text-center">
                  <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    Enquiry Submitted
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Our team will contact you shortly.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Reference ID
                    </p>
                    <p className="text-xl font-bold">{referenceId}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

/* =========================
   INFO BLOCK
========================= */
function InfoBlock({
  icon,
  title,
  text,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  link?: string;
}) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border flex gap-4">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {link ? (
          <a href={link} className="text-muted-foreground hover:underline">
            {text}
          </a>
        ) : (
          <p className="text-muted-foreground">{text}</p>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
