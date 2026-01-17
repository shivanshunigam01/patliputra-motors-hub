import { useLanguage } from '@/i18n/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageToggleProps {
  variant?: 'desktop' | 'mobile';
  isScrolled?: boolean;
}

export function LanguageToggle({ variant = 'desktop', isScrolled = false }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className="flex gap-2 p-2 bg-primary-foreground/10 rounded-xl">
        <button
          onClick={() => setLanguage('hi')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            language === 'hi'
              ? 'bg-jcb text-jcb-foreground'
              : 'text-primary-foreground/80 hover:bg-primary-foreground/10'
          }`}
        >
          हिंदी
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            language === 'en'
              ? 'bg-jcb text-jcb-foreground'
              : 'text-primary-foreground/80 hover:bg-primary-foreground/10'
          }`}
        >
          English
        </button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1.5 ${
            isScrolled ? 'text-foreground' : 'text-primary-foreground'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium">
            {language === 'hi' ? 'हि' : 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => setLanguage('hi')}
          className={language === 'hi' ? 'bg-muted' : ''}
        >
          🇮🇳 हिंदी
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-muted' : ''}
        >
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
