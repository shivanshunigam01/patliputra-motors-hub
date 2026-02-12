import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface LeadSelectionBarProps {
  selectedCount: number;
  onSelectClick: () => void;
  onClearClick: () => void;
}

export function LeadSelectionBar({
  selectedCount,
  onSelectClick,
  onClearClick,
}: LeadSelectionBarProps) {
  const { language } = useLanguage();

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 lg:left-6 lg:right-6 z-40 bg-primary text-primary-foreground rounded-xl shadow-2xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ShoppingCart className="h-5 w-5" />
        <span className="font-semibold">
          {selectedCount} product(s) selected
        </span>
      </div>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearClick}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button
          size="sm"
          onClick={onSelectClick}
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          View TCO
        </Button>
      </div>
    </div>
  );
}
