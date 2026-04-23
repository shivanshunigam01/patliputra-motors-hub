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
  Gauge,
  FileDown,
  Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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


const CheckCibilScore = () => {
  type RazorpayCtor = new (
    options: Record<string, unknown>
  ) => { open: () => void };
  const browserWindow = window as Window & { Razorpay?: RazorpayCtor };

  const { t } = useLanguage();
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

    setLoading(true);
    setPrecheckRunning(true);

    let precheckId: string;

    try {
      const pre = await postCibilPrecheck({
        name: form.name,
        mobile: form.mobile,
        pan: form.pan,
        aadhaar: aadhaar12,
        consent: "Y",
      });
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
        description: "CIBIL Check",
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

                setScore(
                  typeof data.score === "number" ? data.score : null
                );
                setSubmitted(true);

                if (data.credit_report_link) {
                  openPdfInNewTab(data.credit_report_link);
                  setPdfDownloaded(true);
                  toast.success("CIBIL report opened in a new tab.");
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
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">
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
                        "Pay & Download CIBIL Report"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {t("cibil.consent")}
                    </p>
                  </div>
                </motion.div>

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
                    {score ?? "—"}
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
                    className="w-full"
                    onClick={() => {
                      setSubmitted(false);
                      setPdfDownloaded(false);
                      setAutoPdfPreparing(false);
                      try {
                        sessionStorage.removeItem("cibil_precheck_id");
                      } catch {
                        /* ignore */
                      }
                    }}
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