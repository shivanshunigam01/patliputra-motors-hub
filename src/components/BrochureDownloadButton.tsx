import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";

const STORAGE_KEY = "brochure_lead_info";

interface BrochureLeadInfo {
  name: string;
  email: string;
  mobile: string;
}

function getSavedLead(): BrochureLeadInfo | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.email && parsed.mobile) return parsed;
    return null;
  } catch {
    return null;
  }
}

function saveLead(info: BrochureLeadInfo) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
}

function triggerDownload(brochureUrl?: string | null) {
  const url = brochureUrl || "/dummy-brochure.pdf";
  const API_BASE = import.meta.env.VITE_API_URL || "https://api.patliputragroup.com";
  const finalUrl = url.startsWith("http")
    ? url
    : `${API_BASE}${url.startsWith("/") ? url : `/${url}`}`;

  const a = document.createElement("a");
  a.href = finalUrl;
  a.download = "Patliputra-Motors-Brochure.pdf";
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

interface Props {
  productName: string;
  brochureUrl?: string | null;
  brandColor?: string;
  className?: string;
}

export function BrochureDownloadButton({
  productName,
  brochureUrl,
  brandColor,
  className = "",
}: Props) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<BrochureLeadInfo>({
    name: "",
    email: "",
    mobile: "",
  });

  const handleClick = () => {
    const saved = getSavedLead();
    if (saved) {
      triggerDownload(brochureUrl);
      toast({
        title: language === "hi" ? "ब्रोशर डाउनलोड हो रहा है" : "Downloading Brochure",
        description: productName,
      });
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim()) {
      toast({
        title: language === "hi" ? "सभी फील्ड भरें" : "All fields required",
        variant: "destructive",
      });
      return;
    }
    if (!/^\d{10}$/.test(form.mobile.trim())) {
      toast({
        title: language === "hi" ? "सही मोबाइल नंबर दर्ज करें" : "Enter valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/final-submit", {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        message: `Brochure download request for: ${productName}`,
        source: "brochure_download",
        product: productName,
      });
    } catch {
      // Still allow download even if API fails
    }

    saveLead({
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
    });
    setSubmitting(false);
    setOpen(false);
    triggerDownload(brochureUrl);
    toast({
      title: language === "hi" ? "ब्रोशर डाउनलोड हो रहा है" : "Downloading Brochure",
      description: productName,
    });
  };

  const buttonStyle = brandColor
    ? { borderColor: `${brandColor}30`, color: brandColor }
    : {};

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={`w-full gap-2 ${className}`}
        style={buttonStyle}
        onClick={handleClick}
      >
        <Download className="h-4 w-4" />
        {language === "hi" ? "ब्रोशर डाउनलोड करें" : "Download Brochure"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "hi" ? "ब्रोशर डाउनलोड करें" : "Download Brochure"}
            </DialogTitle>
            <DialogDescription>
              {language === "hi"
                ? "ब्रोशर प्राप्त करने के लिए अपना विवरण दर्ज करें"
                : "Enter your details to receive the brochure"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="brochure-name">
                {language === "hi" ? "नाम" : "Name"}
              </Label>
              <Input
                id="brochure-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={language === "hi" ? "आपका नाम" : "Your name"}
                maxLength={100}
                required
              />
            </div>
            <div>
              <Label htmlFor="brochure-email">
                {language === "hi" ? "ईमेल" : "Email"}
              </Label>
              <Input
                id="brochure-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={language === "hi" ? "आपका ईमेल" : "your@email.com"}
                maxLength={255}
                required
              />
            </div>
            <div>
              <Label htmlFor="brochure-mobile">
                {language === "hi" ? "मोबाइल नंबर" : "Mobile Number"}
              </Label>
              <Input
                id="brochure-mobile"
                type="tel"
                value={form.mobile}
                onChange={(e) =>
                  setForm({ ...form, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                placeholder="9876543210"
                maxLength={10}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {language === "hi" ? "डाउनलोड करें" : "Download Now"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
