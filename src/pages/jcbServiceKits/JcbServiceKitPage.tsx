import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wrench, Send, IndianRupee, Package } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { ServiceKitPartsTable } from "@/components/jcbServiceKit/ServiceKitPartsTable";
import { ServiceKitEnquiryDialog } from "@/components/jcbServiceKit/ServiceKitEnquiryDialog";
import {
  getKitById,
  formatInr,
  JCB_SERVICE_KITS,
  type JcbServiceKitRouteId,
} from "@/data/jcbServiceKits";
import NotFound from "@/pages/NotFound";

interface JcbServiceKitPageProps {
  kitId: JcbServiceKitRouteId;
}

export function JcbServiceKitPage({ kitId }: Readonly<JcbServiceKitPageProps>) {
  const kit = getKitById(kitId);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!kit) {
    return <NotFound />;
  }

  const otherKits = JCB_SERVICE_KITS.filter((k) => k.id !== kitId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-14 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-4">
                <Wrench className="h-4 w-4" />
                JCB Machinery Service Schedules &amp; Parts Kits
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-primary-foreground tracking-wide mb-2">
                {kit.title}
              </h1>
              <p className="text-primary-foreground/85 text-lg flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <IndianRupee className="h-5 w-5" />
                  Kit value <strong className="text-jcb">{formatInr(kit.totalValue)}</strong>
                </span>
                <span className="text-primary-foreground/60">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Package className="h-5 w-5" />
                  {kit.items.length} line items
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-muted-foreground text-sm max-w-xl">
                Official parts list for this service interval. Prices are indicative (MRP). Tap the
                button below to request a quote or place an order with Patliputra.
              </p>
              <Button
                type="button"
                size="lg"
                className="gap-2 shrink-0 bg-jcb text-jcb-foreground hover:bg-jcb-hover"
                onClick={() => setEnquiryOpen(true)}
              >
                <Send className="h-5 w-5" />
                Enquire for this kit
              </Button>
            </div>

            <ServiceKitPartsTable kit={kit} />

            <div className="mt-10 rounded-xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Other service kits
              </h2>
              <ul className="flex flex-wrap gap-2">
                {otherKits.map((k) => (
                  <li key={k.id}>
                    <Button variant="outline" size="sm" asChild className="font-medium">
                      <Link to={`/jcb-service-kit/${k.id}`}>
                        {k.intervalHours} HRS kit
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />

      <ServiceKitEnquiryDialog kit={kit} open={enquiryOpen} onOpenChange={setEnquiryOpen} />
    </div>
  );
}
