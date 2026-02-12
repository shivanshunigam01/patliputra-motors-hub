import { Phone, MessageCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from '@/i18n/LanguageContext';
import { useAdminSettings } from "@/context/AdminSettingsContext";

export function FloatingCTA() {
  const { t } = useLanguage();
 const { settings } = useAdminSettings();
  return (
    <>
      {/* Desktop FAB Stack */}
      {/* <div className="hidden lg:flex fixed right-6 bottom-6 z-50 flex-col gap-3">
        <motion.a
          href={`tel:+91${settings?.primary_phone}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 px-5 py-3 bg-jcb text-jcb-foreground rounded-full shadow-lg hover:shadow-glow-jcb transition-all duration-300 hover:scale-105 font-semibold"
        >
          <Phone className="h-5 w-5" />
          <span>{t('common.callNow')}</span>
        </motion.a>

        <motion.a
          href={`https://wa.me/91${settings?.whatsapp_number}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 px-5 py-3 bg-success text-success-foreground rounded-full shadow-lg hover:shadow-glow-ev transition-all duration-300 hover:scale-105 font-semibold"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{t('common.whatsapp')}</span>
        </motion.a>

        <motion.a
          href="/finance"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 px-5 py-3 bg-card text-foreground border border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
        >
          <FileText className="h-5 w-5" />
          <span>{t('common.enquiry')}</span>
        </motion.a>
      </div> */}

      {/* Mobile Sticky CTA Bar */}
      {/* <div className="lg:hidden sticky-cta">
        <div className="flex gap-3">
          <a
            href={`tel:+91${settings?.primary_phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-jcb text-jcb-foreground rounded-xl font-semibold text-sm"
          >
            <Phone className="h-4 w-4" />
            {t('common.call')}
          </a>
          <a
            href={`https://wa.me/91${settings?.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-success text-success-foreground rounded-xl font-semibold text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            {t('common.whatsapp')}
          </a>
          <a
            href="/finance"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold text-sm"
          >
            <FileText className="h-4 w-4" />
            {t('common.enquiry')}
          </a>
        </div>
      </div> */}
    </>
  );
}
