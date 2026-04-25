"use client";

import { useState, useRef, useEffect } from "react";
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
  CheckCircle2,
  Gauge,
  FileDown,
  Loader2,
  Sparkles,
  FileCheck2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import experianLogo from "@/assets/cibil-experian-logo.png";

function CibilScoreRing({
  score,
  strokeColor,
}: {
  score: number | null;
  strokeColor: string;
}) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const raw =
    score == null
      ? 0
      : ((Math.min(900, Math.max(300, score)) - 300) / 600) * 100;
  const pct = Math.min(100, Math.max(0, raw));
  const offset = c - (pct / 100) * c;

  return (
    <div
      className="relative mx-auto my-2 flex w-full max-w-[220px] justify-center sm:max-w-[240px] sm:my-3"
      aria-live="polite"
    >
      <svg
        viewBox="0 0 120 120"
        className="h-40 w-40 -rotate-90 sm:h-44 sm:w-44"
        aria-hidden
      >
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          className="stroke-border/80"
          strokeWidth="9"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="text-4xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-5xl">
          {score ?? "—"}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          CIBIL
        </span>
      </div>
    </div>
  );
}

/** Prefer server / Surepass fields so toasts show the real API message. */
function pickApiError(
  body: Record<string, unknown> | null | undefined,
  fallback: string
): string {
  if (!body || typeof body !== "object") return fallback;
  const data = body.data;
  const dataObj =
    data != null && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;
  const candidates = [
    body.error,
    body.message,
    body.details,
    dataObj?.error,
    dataObj?.message,
  ];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  const code = body.message_code;
  if (typeof code === "string" && code.trim()) return code.trim();
  return fallback;
}

const CheckCibilScore = () => {
  const { t } = useLanguage();
  const [feeExperian, setFeeExperian] = useState(79);

  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const aadhaarInputRef = useRef<HTMLInputElement>(null);
  const panInputRef = useRef<HTMLInputElement>(null);


  const [form, setForm] = useState({
    name: "",
    mobile: "",
    pan: "",
    aadhaar: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  /** Full-screen message while auto PDF is fetched so the user knows to wait. */
  const [autoPdfPreparing, setAutoPdfPreparing] = useState(false);
  /** Dialog state kept for compatibility with existing UI */
  const [precheckRunning, setPrecheckRunning] = useState(false);

  const PAYMENTS_BASE = "https://api.patliputragroup.com/payments";

  useEffect(() => {
    // Only Experian PDF flow is active right now.
  }, []);

  const openPdfInNewTab = (href: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCibilPdf = async (fromAuto = false) => {
    if (!form.name || !form.mobile || !form.pan) {
      toast.error("Please fill name, mobile, and PAN before generating PDF.");
      return;
    }

    setPdfLoading(true);
    const toastId = fromAuto ? "cibil-pdf-auto" : "cibil-pdf";
    if (!fromAuto) {
      toast.loading("Generating credit report PDF…", { id: toastId });
    }

    try {
      console.log("[cibil-ui] /experian-pdf request start", {
        name: form.name,
        mobile: form.mobile,
        pan: form.pan,
      });
      const res = await fetch(`${PAYMENTS_BASE}/experian-pdf`, {
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
      });
      console.log("[cibil-ui] /experian-pdf response received", {
        status: res.status,
        ok: res.ok,
      });

      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      console.log("[cibil-ui] /experian-pdf payload summary", {
        ok: data.ok === true,
        hasScore: data.score != null,
        hasLink:
          typeof data.credit_report_link === "string" &&
          String(data.credit_report_link).trim().length > 0,
        error:
          typeof data.error === "string"
            ? data.error
            : typeof data.message === "string"
              ? data.message
              : undefined,
      });
      if (!res.ok || data.ok !== true) {
        toast.error(
          pickApiError(
            data,
            `Failed to generate report PDF (${res.status}).`
          ),
          { id: toastId }
        );
        return;
      }

      const rawScore = data.score as number | string | null | undefined;
      const parsedScore =
        typeof rawScore === "number" && Number.isFinite(rawScore)
          ? rawScore
          : rawScore != null && String(rawScore).trim() !== ""
            ? Number.parseFloat(String(rawScore).replace(/,/g, ""))
            : NaN;
      setScore(Number.isFinite(parsedScore) ? parsedScore : null);
      setSubmitted(true);

      const pdfLink = data.credit_report_link;
      if (typeof pdfLink === "string" && pdfLink.trim()) {
        openPdfInNewTab(pdfLink.trim());
        setPdfDownloaded(true);
        toast.success("Credit report PDF opened in a new tab.", { id: toastId });
        return;
      }

      toast.error(
        pickApiError(data, "Credit report link not found in provider response."),
        { id: toastId }
      );
    } catch (e: unknown) {
      const msg =
        e instanceof Error && e.message?.trim()
          ? e.message
          : "Failed to generate credit report PDF.";
      toast.error(msg, { id: toastId });
    } finally {
      setPdfLoading(false);
      if (fromAuto) setAutoPdfPreparing(false);
    }
  };


  const scoreLabel =
    score && score >= 750
      ? t("cibil.excellent")
      : score && score >= 700
        ? t("cibil.good")
        : t("cibil.needsImprovement");

  const scoreStrokeColor =
    score == null
      ? "hsl(214 20% 88%)"
      : score >= 750
        ? "hsl(158 64% 40%)"
        : score >= 700
          ? "hsl(210 100% 35%)"
          : "hsl(32 95% 44%)";

  const scoreBadgeClass =
    score == null
      ? "bg-muted text-muted-foreground"
      : score >= 750
        ? "bg-success/20 text-success"
        : score >= 700
          ? "bg-leyland/10 text-leyland"
          : "bg-amber-500/15 text-amber-800 dark:text-amber-200";

  const handleCheckCibil = async () => {
    if (!form.name || !form.mobile || !form.pan) {
      toast.warning("Please fill all required fields");
      return;
    }

    const aadhaar12 = form.aadhaar.replace(/\D/g, "").slice(0, 12);
    if (aadhaar12.length !== 12) {
      toast.warning("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    if (!aadhaarFile) {
      toast.warning("Please upload your Aadhaar card (PDF, PNG, or JPG)");
      return;
    }
    setLoading(true);
    try {
      await downloadCibilPdf(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (pdfDownloaded) return;
    void downloadCibilPdf(false);
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

  /** After a successful paid report is opened, clear PII fields for the next application. */
  const clearFormForNextApplication = () => {
    setForm({
      name: "",
      mobile: "",
      pan: "",
      aadhaar: "",
    });
    setAadhaarFile(null);
    setPanFile(null);
    if (aadhaarInputRef.current) aadhaarInputRef.current.value = "";
    if (panInputRef.current) panInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={precheckRunning} onOpenChange={() => {}}>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-md border-jcb/30 bg-card/95 backdrop-blur-sm [&>button]:hidden"
          aria-describedby="cibil-precheck-desc"
        >
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <Loader2
              className="h-12 w-12 shrink-0 animate-spin text-jcb"
              aria-hidden
            />
            <DialogHeader className="space-y-2 text-center sm:text-center">
              <DialogTitle className="text-lg font-semibold text-foreground">
                {t("cibil.precheckTitle")}
              </DialogTitle>
              <DialogDescription
                id="cibil-precheck-desc"
                className="text-sm text-muted-foreground"
              >
                {t("cibil.precheckDescription")}
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={autoPdfPreparing}
        onOpenChange={() => {
          /* Dismissal is blocked via Content handlers; `open` is only cleared after PDF finishes. */
        }}
      >
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-md border-jcb/30 bg-card/95 backdrop-blur-sm [&>button]:hidden"
          aria-describedby="cibil-pdf-prepare-desc"
        >
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <Loader2 className="h-12 w-12 shrink-0 animate-spin text-jcb" aria-hidden />
            <DialogHeader className="space-y-2 text-center sm:text-center">
              <DialogTitle className="text-lg font-semibold text-foreground">
                {t("cibil.preparingPdfTitle")}
              </DialogTitle>
              <DialogDescription id="cibil-pdf-prepare-desc" className="text-sm text-muted-foreground">
                {t("cibil.preparingPdfDescription")}
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>

      <Navbar />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary via-secondary to-primary py-14 sm:py-20 md:py-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-jcb/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-full bg-leyland/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-jcb/10 blur-2xl" aria-hidden />

          <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-lg backdrop-blur-sm sm:mb-6 sm:px-5 sm:py-2">
                <Sparkles className="h-4 w-4 shrink-0 text-jcb" />
                <Shield className="h-4 w-4 shrink-0" />
                <span>{t("cibil.badge")}</span>
              </div>

              <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                {t("cibil.title")}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/85 sm:mt-5 sm:text-lg md:text-xl">
                {t("cibil.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FORM + RESULT */}
        <section className="bg-gradient-to-b from-muted/30 to-background py-10 sm:py-14 md:py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-border/50 sm:rounded-3xl sm:p-6 md:p-8 dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-jcb via-leyland to-jcb" aria-hidden />
                  <div className="mb-6 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2 text-jcb">
                        <FileCheck2 className="h-5 w-5 shrink-0" aria-hidden />
                        <span className="text-xs font-semibold uppercase tracking-widest">
                          {t("cibil.badge")}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {t("cibil.formTitle")}
                      </h2>
                    </div>
                  </div>

                  <p className="mb-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:mb-5 sm:text-base">
                    Experian credit report (PDF) is currently active.
                  </p>

                  <div className="mb-4 grid grid-cols-1 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => {}}
                      className={cn(
                        "group flex min-h-[200px] flex-col rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.99] sm:min-h-[220px] sm:p-5",
                        "border-jcb bg-jcb/5 shadow-md ring-2 ring-jcb/25"
                      )}
                    >
                      <div className="mb-3 flex min-h-[4.25rem] items-center justify-center rounded-xl border border-border/50 bg-white px-3 py-2.5 shadow-sm sm:min-h-[4.5rem]">
                        <img
                          src={experianLogo}
                          alt="Experian"
                          className="max-h-12 w-full max-w-[200px] object-contain object-center sm:max-h-14"
                        />
                      </div>
                      <p className="font-semibold text-foreground">
                        {t("cibil.apiExperianTitle")}
                      </p>
                      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {t("cibil.apiExperianDescription")}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                        <p className="text-sm font-bold text-jcb sm:text-base">
                          {t("cibil.rupee")}
                          {feeExperian}
                        </p>
                        <CheckCircle2
                          className="h-5 w-5 shrink-0 text-jcb"
                          aria-hidden
                        />
                      </div>
                    </button>
                  </div>

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
                    <Input
                      icon={Lock}
                      label={t("cibil.aadhaarLabel")}
                      value={form.aadhaar}
                      onChange={(v) =>
                        setForm({
                          ...form,
                          aadhaar: v.replace(/\D/g, "").slice(0, 12),
                        })
                      }
                    />

                    {/* Aadhaar Upload */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {t("cibil.aadhaarUploadLabel")}
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
                          className="flex w-full min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/20 px-4 py-3.5 transition-all hover:border-jcb/50 hover:bg-muted/40"
                        >
                          <Upload className="h-5 w-5 shrink-0 text-jcb/80" />
                          <span className="text-left text-sm text-muted-foreground">
                            {t("cibil.uploadHint")}
                          </span>
                        </label>
                      ) : (
                        <div className="flex w-full min-h-[52px] items-center justify-between gap-2 rounded-2xl border border-success/35 bg-success/5 px-4 py-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                            <span className="truncate text-sm text-foreground">
                              {aadhaarFile.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile("aadhaar")}
                            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                            aria-label="Remove Aadhaar file"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* PAN Upload */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {t("cibil.panUploadLabel")}{" "}
                        <span className="font-normal text-muted-foreground">
                          ({t("common.optional")})
                        </span>
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
                          className="flex w-full min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/20 px-4 py-3.5 transition-all hover:border-jcb/50 hover:bg-muted/40"
                        >
                          <Upload className="h-5 w-5 shrink-0 text-jcb/80" />
                          <span className="text-left text-sm text-muted-foreground">
                            {t("cibil.uploadHint")}
                          </span>
                        </label>
                      ) : (
                        <div className="flex w-full min-h-[52px] items-center justify-between gap-2 rounded-2xl border border-success/35 bg-success/5 px-4 py-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                            <span className="truncate text-sm text-foreground">
                              {panFile.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile("pan")}
                            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                            aria-label="Remove PAN file"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <Button
                      size="lg"
                      className="mt-2 h-12 w-full font-semibold shadow-md shadow-jcb/10 transition-transform hover:bg-jcb-hover active:scale-[0.99] sm:h-12 bg-jcb text-jcb-foreground"
                      onClick={handleCheckCibil}
                      disabled={loading || precheckRunning}
                    >
                      {loading || precheckRunning ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {precheckRunning
                            ? t("cibil.verifyingDetails")
                            : "Processing…"}
                        </span>
                      ) : (
                        t("cibil.payCta").replace(
                          "{amount}",
                          String(feeExperian)
                        )
                      )}
                    </Button>

                    <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-sm mt-3">
                      {t("cibil.consent")}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex min-w-0 flex-col gap-6 lg:col-span-5 lg:gap-7">
                {/* RESULT */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-card to-muted/20 p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-border/40 sm:rounded-3xl sm:p-8 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                  >
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-jcb/10 blur-2xl"
                      aria-hidden
                    />
                    <div className="relative">
                      <div className="mb-1 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                        <Gauge className="h-4 w-4 text-jcb" />
                        {t("cibil.resultTitle")}
                      </div>

                      <CibilScoreRing score={score} strokeColor={scoreStrokeColor} />

                      <span
                        className={cn(
                          "mb-5 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold",
                          scoreBadgeClass
                        )}
                      >
                        {scoreLabel}
                      </span>

                      <p className="mb-6 text-pretty text-sm text-muted-foreground sm:text-base">
                        {t("cibil.eligibleMessage")}
                      </p>
                      <div className="flex flex-col gap-3 sm:gap-4">
                        <Button
                          size="lg"
                          className="h-12 w-full gap-2 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                          onClick={handleDownloadPdf}
                          disabled={pdfLoading || pdfDownloaded}
                        >
                          {pdfLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Generating PDF…
                            </span>
                          ) : pdfDownloaded ? (
                            <>
                              <CheckCircle className="h-5 w-5" />
                              Report downloaded
                            </>
                          ) : (
                            <>
                              <FileDown className="h-5 w-5" />
                              Download CIBIL Report (PDF)
                            </>
                          )}
                        </Button>

                        <Button
                          size="lg"
                          variant="outline"
                          className="h-12 w-full border-border/80 bg-background/50"
                          onClick={startFreshCibilPage}
                        >
                          {t("cibil.checkAnother")}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TRUST PANEL */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/40 p-5 sm:rounded-3xl sm:p-6 md:p-7"
                >
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight sm:mb-5 sm:text-xl">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-jcb/15 text-jcb">
                      <Shield className="h-5 w-5" aria-hidden />
                    </span>
                    {t("cibil.whyTitle")}
                  </h3>

                  <ul className="space-y-3.5 text-sm text-muted-foreground sm:text-base">
                    {[
                      t("cibil.reason1"),
                      t("cibil.reason2"),
                      t("cibil.reason3"),
                      t("cibil.reason4"),
                      t("cibil.reason5"),
                    ].map((reason, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-left leading-snug"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-jcb"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
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
  icon: LucideIcon;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-foreground">
      {label}
    </label>
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/90"
        aria-hidden
      />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="min-h-12 w-full rounded-2xl border border-border/80 bg-background pl-11 pr-4 text-[16px] transition-shadow placeholder:text-muted-foreground/70 focus:border-jcb/50 focus:outline-none focus:ring-2 focus:ring-jcb/25 sm:text-sm"
        placeholder={label}
        autoComplete="off"
      />
    </div>
  </div>
);


export default CheckCibilScore;
