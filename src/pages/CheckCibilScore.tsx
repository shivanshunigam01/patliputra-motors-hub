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
import cibilBureauLogo from "@/assets/cibil-bureau-logo.png";

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

const CheckCibilScore = () => {
  type RazorpayCtor = new (
    options: Record<string, unknown>
  ) => { open: () => void };
  const browserWindow = window as Window & { Razorpay?: RazorpayCtor };

  const { t } = useLanguage();

  type ReportKind = "experian" | "cibil_credit_report";
  const [reportKind, setReportKind] = useState<ReportKind>("experian");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [feeExperian, setFeeExperian] = useState(1);
  const [feeCibil, setFeeCibil] = useState(1);
  const [checkoutInr, setCheckoutInr] = useState<number | null>(null);

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
  /** Surepass CIBIL + PDF pre-check (no charge) before Razorpay. */
  const [precheckRunning, setPrecheckRunning] = useState(false);

  const PAYMENTS_BASE = "https://api.patliputragroup.com/payments";

  /** Wipe CIBIL-related session keys, full reload the route — clean form, modals, uploads, and React state. */
  function startFreshCibilPage() {
    try {
      sessionStorage.removeItem("cibil_precheck_id");
    } catch {
      /* ignore */
    }
    try {
      toast.dismiss();
    } catch {
      /* ignore */
    }
    window.location.reload();
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${PAYMENTS_BASE}/cibil-pricing`);
        const j = (await r.json()) as {
          ok?: boolean;
          experian_in_inr?: number;
          cibil_credit_report_in_inr?: number;
        };
        if (cancelled || !j?.ok) return;
        if (typeof j.experian_in_inr === "number")
          setFeeExperian(j.experian_in_inr);
        if (typeof j.cibil_credit_report_in_inr === "number")
          setFeeCibil(j.cibil_credit_report_in_inr);
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayFeeInr =
    reportKind === "cibil_credit_report" ? feeCibil : feeExperian;

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  /** CIBIL precheck: transient 502/503/504 and browser network flakiness. */
  async function postCibilPrecheck(
    body: Record<string, string>
  ): Promise<
    { ok: true; data: { ok: true; precheck_id: string;[k: string]: unknown } } | { ok: false; data: { error?: string }; status: number }
  > {
    const max = 3;
    const baseDelay = 800;
    let lastStatus = 0;
    for (let attempt = 0; attempt < max; attempt += 1) {
      try {
        const preRes = await fetch(`${PAYMENTS_BASE}/cibil-precheck`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const preData = (await preRes.json().catch(() => ({}))) as {
          ok?: boolean;
          precheck_id?: string;
          error?: string;
        };
        lastStatus = preRes.status;
        if (preRes.ok && preData?.ok && preData?.precheck_id) {
          return { ok: true, data: preData as { ok: true; precheck_id: string } };
        }
        const retriable =
          [502, 503, 504].includes(preRes.status) ||
          (preData as { retry_suggested?: boolean })?.retry_suggested;
        if (retriable && attempt < max - 1) {
          if (attempt === 0) {
            toast.info("Connection hiccup — retrying…", { id: "cibil-retry" });
          }
          await sleep(baseDelay * (attempt + 1));
          continue;
        }
        return { ok: false, data: preData, status: preRes.status };
      } catch (e) {
        const err = e as { message?: string; name?: string };
        if (attempt < max - 1) {
          if (attempt === 0) {
            toast.info("Connection interrupted — retrying…", { id: "cibil-retry" });
          }
          await sleep(baseDelay * (attempt + 1));
          continue;
        }
        const raw = err?.message || "Network error";
        const human =
          /ECONNRESET|Failed to fetch|Load failed|network/i.test(raw) ||
          err?.name === "TypeError"
            ? "Connection was interrupted. Check your network and try again."
            : raw;
        return {
          ok: false,
          data: { error: human },
          status: lastStatus || 0,
        };
      }
    }
    return {
      ok: false,
      data: { error: "Request failed after several tries. Please try again." },
      status: lastStatus,
    };
  }

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
    if (pdfDownloaded) return;

    setPdfLoading(true);
    const toastId = fromAuto ? "cibil-pdf-auto" : "cibil-pdf";
    if (!fromAuto) {
      toast.loading("Generating CIBIL PDF…", { id: toastId });
    }

    try {
      const isCibilCredit = reportKind === "cibil_credit_report";
      const url = isCibilCredit
        ? `${PAYMENTS_BASE}/cibil-credit-pdf`
        : `${PAYMENTS_BASE}/experian-pdf`;
      const payload = isCibilCredit
        ? {
            name: form.name,
            mobile: form.mobile,
            pan: form.pan,
            gender,
            consent: "Y",
          }
        : {
            name: form.name,
            mobile: form.mobile,
            pan: form.pan,
            consent: "Y",
          };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: { ok?: boolean; credit_report_link?: string; error?: string };
      try {
        data = await res.json();
      } catch {
        toast.error(
          fromAuto
            ? "Automatic PDF download failed. Use the button below to try again."
            : "Invalid response from server",
          { id: toastId }
        );
        return;
      }

      if (!res.ok || !data.ok || !data.credit_report_link) {
        const errMsg = fromAuto
          ? "Automatic PDF download failed. Use the button below to try again."
          : data?.error || `Failed to generate CIBIL PDF (${res.status})`;
        toast.error(errMsg, { id: toastId });
        return;
      }

      toast.success("CIBIL PDF ready", { id: toastId });

      openPdfInNewTab(data.credit_report_link);
      setPdfDownloaded(true);
    } catch {
      toast.error(
        fromAuto ? "Automatic PDF download failed. Use the button below to try again." : "PDF download failed",
        { id: toastId }
      );
    } finally {
      setPdfLoading(false);
      if (fromAuto) {
        setAutoPdfPreparing(false);
      }
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

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (browserWindow.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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
    if (reportKind === "cibil_credit_report" && !gender) {
      toast.warning(t("cibil.genderLabel"));
      return;
    }

    setLoading(true);
    setPrecheckRunning(true);

    let precheckId: string;

    try {
      const precheckBody: Record<string, string> = {
        name: form.name,
        mobile: form.mobile,
        pan: form.pan,
        aadhaar: aadhaar12,
        consent: "Y",
        report_kind: reportKind,
      };
      if (reportKind === "cibil_credit_report") {
        precheckBody.gender = gender;
      }

      const pre = await postCibilPrecheck(precheckBody);
      if (!pre.ok) {
        const preError =
          typeof pre.data?.error === "string" ? pre.data.error : undefined;
        toast.error(
          preError ||
            "We could not verify your details. Check your name, mobile, and PAN. No payment was made."
        );
        return;
      }

      const preData = pre.data;
      if (!preData.precheck_id) {
        toast.error("Verification incomplete. Please try again.");
        return;
      }

      precheckId = preData.precheck_id;
      const amt = (preData as { amount_in_inr?: number }).amount_in_inr;
      if (typeof amt === "number") setCheckoutInr(amt);
      else
        setCheckoutInr(
          reportKind === "cibil_credit_report" ? feeCibil : feeExperian
        );
      toast.dismiss("cibil-retry");
      try {
        sessionStorage.setItem("cibil_precheck_id", precheckId);
      } catch {
        /* ignore */
      }

      setPrecheckRunning(false);

      const sdkOk = await loadRazorpay();
      if (!sdkOk) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const nameSnap = form.name;
      const mobileSnap = form.mobile;
      const panSnap = form.pan;
      const aadhaarSnap = aadhaar12;
      const aadhaarFileSnap = aadhaarFile;
      const reportKindSnap = reportKind;

      const orderRes = await fetch(`${PAYMENTS_BASE}/razorpay/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ precheck_id: precheckId }),
      });

      const order = await orderRes.json();
      if (!orderRes.ok || !order.id) {
        toast.error(
          (order as { error?: string })?.error ||
            "Could not start payment. Try again."
        );
        return;
      }

      const Razorpay = browserWindow.Razorpay;
      if (!Razorpay) {
        toast.error("Razorpay SDK failed to initialize");
        return;
      }

      const rzp = new Razorpay({
        key: order.key_id,
        order_id: order.id,
        amount: order.amount,
        currency: "INR",
        name: "Patliputra Group",
        description:
          reportKindSnap === "cibil_credit_report"
            ? "CIBIL Credit Report PDF"
            : "Experian CIBIL Check",
        prefill: {
          name: form.name,
          contact: form.mobile,
        },
        theme: {
          color: "#facc15",
        },
        handler: function (resp: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          setAutoPdfPreparing(true);

          if (!aadhaarFileSnap) {
            toast.error("Aadhaar document is required. Please start again and upload your Aadhaar file.");
            setAutoPdfPreparing(false);
            return;
          }

          const fd = new FormData();
          fd.append("razorpay_order_id", resp.razorpay_order_id);
          fd.append("razorpay_payment_id", resp.razorpay_payment_id);
          fd.append("razorpay_signature", resp.razorpay_signature);
          fd.append("precheck_id", precheckId);
          fd.append("name", nameSnap);
          fd.append("mobile", mobileSnap);
          fd.append("pan", panSnap);
          fd.append("aadhaar", aadhaarSnap);
          fd.append("aadhaar_document", aadhaarFileSnap);
          fd.append("report_kind", reportKindSnap);

          fetch(`${PAYMENTS_BASE}/razorpay/verify-cibil`, {
            method: "POST",
            body: fd,
          })
            .then((r) => r.json())
            .then(
              (data: {
                ok?: boolean;
                error?: string;
                score?: number;
                credit_report_link?: string;
              }) => {
                if (!data?.ok) {
                  toast.error(
                    data?.error || "Could not complete your CIBIL report. Contact support with your payment id."
                  );
                  setAutoPdfPreparing(false);
                  return;
                }

                const rawScore = (data as { score?: number | string | null }).score;
                const parsedScore =
                  typeof rawScore === "number" && Number.isFinite(rawScore)
                    ? rawScore
                    : rawScore != null && String(rawScore).trim() !== ""
                      ? Number.parseFloat(String(rawScore).replace(/,/g, ""))
                      : NaN;
                setScore(Number.isFinite(parsedScore) ? parsedScore : null);
                setSubmitted(true);

                try {
                  sessionStorage.removeItem("cibil_precheck_id");
                } catch {
                  /* ignore */
                }

                if (data.credit_report_link) {
                  openPdfInNewTab(data.credit_report_link);
                  setPdfDownloaded(true);
                  toast.success("Credit report PDF opened in a new tab.");
                } else {
                  void downloadCibilPdf(true);
                }
                setAutoPdfPreparing(false);
              }
            )
            .catch((err) => {
              console.error(err);
              toast.error(
                "Payment may have succeeded but we could not finish the report. Please contact support."
              );
              setAutoPdfPreparing(false);
            });
        },
      });

      rzp.open();
    } catch {
      toast.error("CIBIL check failed");
    } finally {
      setLoading(false);
      setPrecheckRunning(false);
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
                    {t("cibil.apiChoiceIntro")}
                  </p>

                  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setReportKind("experian");
                        setCheckoutInr(null);
                      }}
                      className={cn(
                        "group flex min-h-[200px] flex-col rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.99] sm:min-h-[220px] sm:p-5",
                        reportKind === "experian"
                          ? "border-jcb bg-jcb/5 shadow-md ring-2 ring-jcb/25"
                          : "border-border/80 bg-background/50 hover:border-jcb/50 hover:shadow-sm"
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
                        {reportKind === "experian" && (
                          <CheckCircle2
                            className="h-5 w-5 shrink-0 text-jcb"
                            aria-hidden
                          />
                        )}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReportKind("cibil_credit_report");
                        setCheckoutInr(null);
                      }}
                      className={cn(
                        "group flex min-h-[200px] flex-col rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.99] sm:min-h-[220px] sm:p-5",
                        reportKind === "cibil_credit_report"
                          ? "border-jcb bg-jcb/5 shadow-md ring-2 ring-jcb/25"
                          : "border-border/80 bg-background/50 hover:border-jcb/50 hover:shadow-sm"
                      )}
                    >
                      <div className="mb-3 flex min-h-[5rem] items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 px-2 py-2.5 shadow-inner sm:min-h-[5.5rem]">
                        <img
                          src={cibilBureauLogo}
                          alt="CIBIL"
                          className="max-h-[4.5rem] w-full object-contain object-center sm:max-h-[5rem]"
                        />
                      </div>
                      <p className="font-semibold text-foreground">
                        {t("cibil.apiCibilTitle")}
                      </p>
                      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {t("cibil.apiCibilDescription")}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                        <p className="text-sm font-bold text-jcb sm:text-base">
                          {t("cibil.rupee")}
                          {feeCibil}
                        </p>
                        {reportKind === "cibil_credit_report" && (
                          <CheckCircle2
                            className="h-5 w-5 shrink-0 text-jcb"
                            aria-hidden
                          />
                        )}
                      </div>
                    </button>
                  </div>

                  {reportKind === "cibil_credit_report" && (
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {t("cibil.genderLabel")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            ["male", t("cibil.genderMale")],
                            ["female", t("cibil.genderFemale")],
                            ["other", t("cibil.genderOther")],
                          ] as const
                        ).map(([v, label]) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setGender(v)}
                            className={cn(
                              "min-h-10 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.98]",
                              gender === v
                                ? "border-jcb bg-jcb text-jcb-foreground shadow-sm"
                                : "border-border/80 bg-background text-muted-foreground hover:border-jcb/40 hover:bg-muted/60"
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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
                          String(checkoutInr ?? displayFeeInr)
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