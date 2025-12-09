import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface LanguageToggleProps {
  compact?: boolean;
}

export function LanguageToggle({ compact = false }: LanguageToggleProps) {
  const { lang, toggleLang } = useLanguage();

  if (compact) {
    return (
      <button 
        onClick={toggleLang}
        className="px-2 py-1 border border-white/20 rounded text-xs font-mono"
        data-testid="button-language-toggle-compact"
      >
        {lang === 'en' ? 'ગુજ' : 'ENG'}
      </button>
    );
  }

  return (
    <button 
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-1 border border-white/20 rounded hover:border-green-500 transition-colors"
      data-testid="button-language-toggle"
    >
      <Globe className="w-3 h-3 text-green-400" />
      <span className="text-xs font-mono font-bold">{lang === 'en' ? 'ગુજરાતી' : 'ENGLISH'}</span>
    </button>
  );
}
