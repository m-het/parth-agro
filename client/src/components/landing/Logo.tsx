import { useLanguage } from '@/lib/language-context';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const { lang, t } = useLanguage();
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-lg',
    lg: 'w-12 h-12 text-2xl'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className="flex items-center gap-2 group cursor-pointer" data-testid="logo">
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-lime-400 to-green-600 rounded-sm flex items-center justify-center`}>
        <span className="font-mono font-bold text-black">P</span>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold tracking-tight ${textSizeClasses[size]} leading-none uppercase`}>
            {lang === 'en' ? 'PARTH AGROTECH' : 'પાર્થ એગ્રોટેક'}
          </span>
          <span className="font-mono text-[10px] text-green-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            {t.nav.status}
          </span>
        </div>
      )}
    </div>
  );
}
