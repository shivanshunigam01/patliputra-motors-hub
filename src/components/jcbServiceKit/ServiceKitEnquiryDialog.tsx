import { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
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
import { formatInr, type ServiceKit } from "@/data/jcbServiceKits";
import { submitServiceKitEnquiry } from "@/services/serviceKit.service";
import { biharDistricts } from "@/data/dealers";

interface ServiceKitEnquiryDialogProps {
  kit: ServiceKit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceKitEnquiryDialog({
  kit,
  open,
  onOpenChange,
}: Readonly<ServiceKitEnquiryDialogProps>) {
  const { toast } = useToast();
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

  useEffect(() => {
    if (open && kit) {
      setSubmitted(false);
      setReferenceId("");
      setForm({ name: "", mobile: "", email: "", district: "", machineModel: "", message: "" });
    }
  }, [open, kit?.id]);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kit) return;

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
        kit_id: kit.id,
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {kit && (
          <>
            <DialogHeader>
              <DialogTitle>Enquire — {kit.intervalHours} HRS Service Kit</DialogTitle>
              <DialogDescription>
                Kit value {formatInr(kit.totalValue)} · {kit.items.length} parts included
              </DialogDescription>
            </DialogHeader>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle className="h-14 w-14 text-success mx-auto" />
                <p className="text-lg font-semibold">Thank you!</p>
                <p className="text-muted-foreground text-sm">
                  Reference:{" "}
                  <span className="font-mono font-medium text-foreground">{referenceId}</span>
                </p>
                <Button onClick={() => onOpenChange(false)} className="mt-2">
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
  );
}
