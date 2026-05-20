import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { JCB_SERVICE_KITS, formatInr, type ServiceKit } from "@/data/jcbServiceKits";
import { submitServiceKitEnquiry } from "@/services/serviceKit.service";
import { biharDistricts } from "@/data/dealers";
import { cn } from "@/lib/utils";

function KitTable({ kit, expanded }: { kit: ServiceKit; expanded: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-[hsl(210,100%,35%)] text-white">
                  <th className="px-3 py-2.5 text-left font-semibold">SR NO.</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Item No.</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Item Description</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Qty</th>
                  <th className="px-3 py-2.5 text-right font-semibold">MRP</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {kit.items.map((item, idx) => (
                  <tr
                    key={item.srNo}
                    className={cn(
                      "border-t border-border",
                      idx % 2 === 0 ? "bg-card" : "bg-muted/40"
                    )}
                  >
                    <td className="px-3 py-2">{item.srNo}</td>
                    <td className="px-3 py-2 font-mono text-xs">{item.itemNo}</td>
                    <td className="px-3 py-2">{item.description}</td>
                    <td className="px-3 py-2 text-center">{item.quantity}</td>
                    <td className="px-3 py-2 text-right">{formatInr(item.mrp)}</td>
                    <td className="px-3 py-2 text-right font-medium">{formatInr(item.value)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[hsl(210,100%,35%)] bg-[hsl(210,100%,35%)]/10 font-bold">
                  <td colSpan={4} className="px-3 py-2.5 text-right uppercase tracking-wide">
                    Total
                  </td>
                  <td className="px-3 py-2.5 text-right">{formatInr(kit.totalMrp)}</td>
                  <td className="px-3 py-2.5 text-right text-jcb">{formatInr(kit.totalValue)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ServiceKitsSection() {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(JCB_SERVICE_KITS[0]?.id ?? null);
  const [enquiryKit, setEnquiryKit] = useState<ServiceKit | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    district: "",
    machineModel: "",
    message: "",
  });

  const openEnquiry = (kit: ServiceKit) => {
    setEnquiryKit(kit);
    setSubmitted(false);
    setReferenceId("");
    setForm({ name: "", mobile: "", email: "", district: "", machineModel: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryKit) return;

    if (!form.name.trim() || !form.mobile.trim() || !form.district) {
      toast({
        title: "Missing details",
        description: "Please fill name, mobile and district",
        variant: "destructive",
      });
      return;
    }

    if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) {
      toast({
        title: "Invalid mobile",
        description: "Enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const data = await submitServiceKitEnquiry({
        kit_id: enquiryKit.id,
        customer_name: form.name.trim(),
        customer_mobile: form.mobile.replace(/\D/g, ""),
        customer_email: form.email.trim() || undefined,
        customer_district: form.district,
        machine_model: form.machineModel.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      setReferenceId(data.enquiry_number);
      setSubmitted(true);
      toast({
        title: "Enquiry submitted",
        description: "Our parts team will contact you shortly.",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Please try again";
      toast({ title: "Submission failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-muted/30" id="service-kits">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-4">
            <Wrench className="h-4 w-4" />
            Genuine JCB Parts
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            JCB Machinery Service Schedules &amp; Parts Kits
          </h2>
          <p className="text-muted-foreground">
            Official service kit breakdowns by machine hours. Select a kit, review parts &amp; pricing,
            then enquire — our team will assist with ordering.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {JCB_SERVICE_KITS.map((kit) => {
            const isExpanded = expandedId === kit.id;
            return (
              <motion.article
                key={kit.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
              >
                <div className="bg-[hsl(210,100%,35%)] px-4 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {kit.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <IndianRupee className="h-4 w-4" />
                    <span>
                      Kit value: <strong className="text-jcb">{formatInr(kit.totalValue)}</strong>
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => setExpandedId(isExpanded ? null : kit.id)}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" /> Hide parts list
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" /> View parts list ({kit.items.length} items)
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb-hover ml-auto"
                      onClick={() => openEnquiry(kit)}
                    >
                      <Send className="h-4 w-4" />
                      Enquire for this kit
                    </Button>
                  </div>

                  <KitTable kit={kit} expanded={isExpanded} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <Dialog open={!!enquiryKit} onOpenChange={(open) => !open && setEnquiryKit(null)}>
        <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {enquiryKit && (
            <>
              <DialogHeader>
                <DialogTitle>Enquire — {enquiryKit.intervalHours} HRS Service Kit</DialogTitle>
                <DialogDescription>
                  Kit value {formatInr(enquiryKit.totalValue)} · {enquiryKit.items.length} parts included
                </DialogDescription>
              </DialogHeader>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle className="h-14 w-14 text-success mx-auto" />
                  <p className="text-lg font-semibold">Thank you!</p>
                  <p className="text-muted-foreground text-sm">
                    Reference: <span className="font-mono font-medium text-foreground">{referenceId}</span>
                  </p>
                  <Button onClick={() => setEnquiryKit(null)} className="mt-2">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sk-name">Full name *</Label>
                    <Input
                      id="sk-name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sk-mobile">Mobile *</Label>
                    <Input
                      id="sk-mobile"
                      type="tel"
                      maxLength={10}
                      value={form.mobile}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, "") }))
                      }
                      placeholder="10-digit mobile"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sk-email">Email (optional)</Label>
                    <Input
                      id="sk-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>District *</Label>
                    <Select
                      value={form.district}
                      onValueChange={(v) => setForm((f) => ({ ...f, district: v }))}
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
                  <div className="space-y-2">
                    <Label htmlFor="sk-model">Machine model (optional)</Label>
                    <Input
                      id="sk-model"
                      value={form.machineModel}
                      onChange={(e) => setForm((f) => ({ ...f, machineModel: e.target.value }))}
                      placeholder="e.g. 3DX Super"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sk-msg">Message (optional)</Label>
                    <Textarea
                      id="sk-msg"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Any specific requirements..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gap-2 bg-jcb text-jcb-foreground hover:bg-jcb-hover"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Submit enquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
