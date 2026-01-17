import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { biharDistricts } from "@/data/dealers";

const ContactPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `PAT${Date.now().toString(36).toUpperCase()}`;
    setReferenceId(refId);
    setSubmitted(true);
    toast({ title: t("contact.successTitle"), description: t("contact.successMessage") });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ev/20 text-ev rounded-full text-sm font-medium mb-4">
                <Mail className="h-4 w-4" />
                {t("contact.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("contact.heroTitle")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("contact.heroSubtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-jcb/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-jcb" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.addressTitle")}</h3>
                      <p className="text-muted-foreground">{t("contact.address")}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-ev/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-ev" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.phoneTitle")}</h3>
                      <a href="tel:+919876543210" className="text-muted-foreground hover:text-ev">+91 98765 43210</a>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-leyland/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-leyland" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.emailTitle")}</h3>
                      <a href="mailto:sales@patliputraautos.com" className="text-muted-foreground hover:text-leyland">sales@patliputraautos.com</a>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{t("contact.hoursTitle")}</h3>
                      <p className="text-muted-foreground text-sm">{t("contact.mondayToSaturday")}: 9:00 AM - 7:00 PM</p>
                      <p className="text-muted-foreground text-sm">{t("contact.sunday")}: 10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border shadow-lg space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">{t("contact.formTitle")}</h2>
                    <div>
                      <Label>{t("contact.nameLabel")} *</Label>
                      <Input placeholder={t("contact.namePlaceholder")} required className="mt-1" />
                    </div>
                    <div>
                      <Label>{t("contact.mobileLabel")} *</Label>
                      <Input type="tel" placeholder={t("contact.mobilePlaceholder")} required className="mt-1" />
                    </div>
                    <div>
                      <Label>{t("contact.districtLabel")} *</Label>
                      <Select required>
                        <SelectTrigger className="mt-1"><SelectValue placeholder={t("contact.districtPlaceholder")} /></SelectTrigger>
                        <SelectContent>
                          {biharDistricts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t("contact.messageLabel")}</Label>
                      <Textarea placeholder={t("contact.messagePlaceholder")} className="mt-1" rows={4} />
                    </div>
                    <div>
                      <Label className="mb-2 block">{t("contact.contactMethod")}</Label>
                      <RadioGroup defaultValue="call" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="call" id="call" />
                          <Label htmlFor="call">{t("common.call")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="whatsapp" id="whatsapp" />
                          <Label htmlFor="whatsapp">{t("common.whatsapp")}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button type="submit" size="lg" className="w-full gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90">
                      <Send className="h-5 w-5" />
                      {t("contact.submitBtn")}
                    </Button>
                  </form>
                ) : (
                  <div className="bg-card p-8 rounded-xl border border-border shadow-lg text-center">
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">{t("contact.successTitle")}</h2>
                    <p className="text-muted-foreground mb-4">{t("contact.successMessage")}</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">{t("contact.referenceId")}</p>
                      <p className="text-xl font-bold text-foreground">{referenceId}</p>
                    </div>
                  </div>
                )}
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

export default ContactPage;
