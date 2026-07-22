import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/seo/schema";
import type { FaqItem } from "@/seo/faqs";

type FAQAccordionProps = {
  faqs: FaqItem[];
  title?: string;
  className?: string;
};

export function FAQAccordion({
  faqs,
  title = "Aksar Puche Jane Wale Sawal (FAQ)",
  className = "",
}: FAQAccordionProps) {
  if (!faqs.length) return null;

  return (
    <section className={className}>
      <JsonLd data={faqSchema(faqs)} />
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">{title}</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-border rounded-xl px-4 bg-card"
          >
            <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
