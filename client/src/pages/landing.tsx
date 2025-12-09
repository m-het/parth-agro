import { useState, useEffect } from 'react';
import {
  Terminal,
  Server,
  Activity,
  ArrowRight,
  Database,
  Sprout,
  Factory,
  Menu,
  X,
  ScanLine
} from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Logo } from '@/components/landing/Logo';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ContactForm } from '@/components/landing/ContactForm';

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const { lang, t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Icons: Record<string, typeof Sprout> = {
    farmers: Sprout,
    industry: Factory,
    storage: Server,
    logistics: Activity
  };

  const timelineIcons = [Sprout, Database, Server, ArrowRight];

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans selection:bg-green-500 selection:text-black ${lang === 'gu' ? 'font-gujarati' : ''}`}>
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-border ${scrolled ? 'bg-background/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#farmers" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase" data-testid="link-farmers">{t.nav.farmers}</a>
            <a href="#industry" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase" data-testid="link-industry">{t.nav.industry}</a>
            <a href="#infra" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase" data-testid="link-storage">{t.nav.infra}</a>
            <Link href="/backbone" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase" data-testid="link-backbone">{lang === 'en' ? 'Backbone' : 'કરોડરજ્જુ'}</Link>

            <ThemeToggle />
            <LanguageToggle />

            <button
              onClick={() => setShowContactForm(true)}
              className="px-5 py-2 border border-green-500/50 text-green-400 font-mono text-sm hover:bg-green-500 hover:text-black transition-all duration-300 uppercase tracking-wide"
              data-testid="button-partner"
            >
              {t.nav.partner}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <LanguageToggle compact />
            <button className="text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-8 text-2xl font-bold">
            <a href="#farmers" onClick={() => setMobileMenuOpen(false)} data-testid="link-farmers-mobile">{t.nav.farmers}</a>
            <a href="#industry" onClick={() => setMobileMenuOpen(false)} data-testid="link-industry-mobile">{t.nav.industry}</a>
            <a href="#infra" onClick={() => setMobileMenuOpen(false)} data-testid="link-storage-mobile">{t.nav.infra}</a>
            <Link href="/backbone" onClick={() => setMobileMenuOpen(false)} data-testid="link-backbone-mobile">{lang === 'en' ? 'Backbone' : 'કરોડરજ્જુ'}</Link>
            <button onClick={() => { setMobileMenuOpen(false); setShowContactForm(true); }} className="text-left text-green-500" data-testid="button-partner-mobile">{t.nav.partner}</button>
          </div>
        </div>
      )}

      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#ddd_1px,transparent_1px),linear-gradient(to_bottom,#ddd_1px,transparent_1px)]'} bg-[size:4rem_4rem]`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-green-500/30 rounded-full bg-green-900/10 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono text-green-400" data-testid="text-version">{t.hero.version}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.9] mb-8 text-foreground" data-testid="text-hero-title">
              {t.hero.title_start} <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600">{t.hero.title_highlight}</span> {t.hero.title_end}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 font-light" data-testid="text-hero-subtitle">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/factory">
                <button className="group relative px-8 py-4 bg-foreground text-background font-bold text-lg hover:opacity-90 transition-all overflow-hidden" data-testid="button-start-trading">
                  <span className="relative z-10 flex items-center gap-2">
                    {t.hero.cta_primary} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
              </Link>

              <Link href="/farmer-register">
                <button className="px-8 py-4 border border-border text-foreground font-mono hover:border-green-500 hover:text-green-400 transition-colors flex items-center justify-center gap-2" data-testid="button-farmer-joining">
                  <Terminal className="w-4 h-4" />
                  {t.hero.cta_secondary}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full border-b border-border bg-card overflow-hidden py-4">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-16 text-muted-foreground font-mono text-sm uppercase tracking-widest">
            <span>Backbone:</span>
            <span className="text-foreground">McCain</span>
            <span className="text-foreground">PepsiCo (Lay's)</span>
            <span className="text-foreground">Balaji Wafers</span>
            <span className="text-foreground">Haldiram's</span>
            <span className="text-foreground">Iscon Balaji</span>
            <span className="text-foreground">500+ Farmers</span>
            <span className="text-green-500"> // {t.nav.status}</span>
            <span>Backbone:</span>
            <span className="text-foreground">McCain</span>
            <span className="text-foreground">PepsiCo (Lay's)</span>
            <span className="text-foreground">Balaji Wafers</span>
            <span className="text-foreground">Haldiram's</span>
            <span className="text-foreground">Iscon Balaji</span>
            <span className="text-foreground">500+ Farmers</span>
          </div>
        </div>
      </div>

      <section className="border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 md:p-24 bg-card border-r border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-red-900/50 uppercase">{t.pain.old_tag}</div>
            <h3 className="text-2xl font-bold text-muted-foreground mb-6" data-testid="text-old-title">{t.pain.old_title}</h3>
            <ul className="space-y-4 text-muted-foreground font-mono text-sm">
              {t.pain.old_list.map((item, i) => (
                <li key={i} className="flex items-center gap-3"><X className="w-4 h-4" /> {item}</li>
              ))}
            </ul>
          </div>

          <div className="p-12 md:p-24 bg-background relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-green-500/50 uppercase">{t.pain.new_tag}</div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-lime-400 to-green-600"></div>

            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3" data-testid="text-new-title">
              {t.pain.new_title} <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-mono">{t.pain.new_status}</span>
            </h3>
            <ul className="space-y-4 text-foreground font-mono text-sm">
              {t.pain.new_list.map((item, i) => (
                <li key={i} className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-modules-title">{t.modules.title}</h2>
            <p className="text-muted-foreground max-w-lg">
              {t.modules.subtitle}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="font-mono text-xs text-green-500 border border-green-500/30 px-3 py-1 rounded bg-green-900/10 uppercase">
              STATUS: {t.modules.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.modules.cards.map((card) => {
            const Icon = Icons[card.id];

            return (
              <div key={card.id} id={card.id} className="group relative p-8 bg-card border border-border hover:border-t-green-500 transition-all duration-300" data-testid={`card-module-${card.id}`}>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-12">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-green-400 transition-colors uppercase">{card.tag}</span>
                  <Icon className="text-foreground group-hover:text-green-400 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  {card.desc}
                </p>
                <div className="font-mono text-xs text-green-500 border-t border-border pt-4">
                  {card.meta}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="infra" className="py-24 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 mb-6 border border-green-500 text-green-500 font-mono text-xs uppercase tracking-widest">
              {t.infra.tag}
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight" data-testid="text-infra-title">
              {t.infra.title_start} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600">{t.infra.title_end}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              {t.infra.desc}
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-border pt-8">
              {t.infra.stats.map((stat, i) => (
                <div key={i} data-testid={`stat-${i}`}>
                  <div className="text-3xl font-mono text-foreground mb-1">{stat.val}</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="relative w-full aspect-square md:aspect-video bg-background border border-green-500/20 rounded-lg p-6 font-mono text-xs text-green-500/80 shadow-[0_0_50px_-10px_rgba(34,197,94,0.1)]">
              <div className="absolute top-0 left-0 w-full h-8 border-b border-green-500/20 bg-green-500/5 flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                <span className="ml-4 opacity-50">{t.infra.schematic.header}</span>
              </div>

              <div className="mt-8 relative h-full w-full border border-dashed border-green-500/30 p-8 flex items-center justify-center">
                <div className="absolute top-4 left-4">{t.infra.schematic.temp}: 3.4°C</div>
                <div className="absolute top-4 right-4">{t.infra.schematic.hum}: 88%</div>

                <div className="w-3/4 h-3/4 border-2 border-green-500 relative flex items-center justify-center bg-green-500/5">
                  <ScanLine className="w-12 h-12 animate-pulse text-green-400 absolute" />

                  <div className="absolute inset-0 terminal-grid"></div>

                  <div className="absolute -left-12 top-1/2 w-12 h-[1px] bg-green-500"></div>
                  <div className="absolute -left-32 top-1/2 text-right">
                    <div className="font-bold uppercase">{t.infra.schematic.in}</div>
                    <div className="opacity-50">{t.infra.schematic.in_desc}</div>
                  </div>

                  <div className="absolute -right-12 top-1/2 w-12 h-[1px] bg-green-500"></div>
                  <div className="absolute -right-32 top-1/2 text-left">
                    <div className="font-bold uppercase">{t.infra.schematic.out}</div>
                    <div className="opacity-50">{t.infra.schematic.out_desc}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center" data-testid="text-timeline-title">{t.timeline.title} <span className="text-green-500">_</span></h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {t.timeline.steps.map((item, index) => {
            const Icon = timelineIcons[index];
            return (
              <div key={index} className="flex gap-6 group" data-testid={`timeline-step-${index}`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-muted-foreground group-hover:border-green-500 group-hover:text-green-400 bg-card transition-all z-10 relative">
                    <Icon size={20} />
                  </div>
                  {index !== 3 && <div className="h-full w-[1px] bg-border my-2 group-hover:bg-green-500/50 transition-colors"></div>}
                </div>
                <div className="pb-12 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-green-500 text-sm">&gt; {item.step}</span>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-border bg-card pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-gradient-to-br from-lime-400 to-green-600 rounded-sm flex items-center justify-center">
                  <span className="font-mono font-bold text-black text-xs">P</span>
                </div>
                <span className="font-bold uppercase text-foreground">
                  {lang === 'en' ? 'PARTH AGROTECH' : 'પાર્થ એગ્રોટેક'}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {t.footer.desc}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs text-foreground uppercase mb-6 tracking-widest">{t.footer.cols[0]}</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#farmers" className="hover:text-green-400 transition-colors" data-testid="link-footer-farming">{t.modules.cards[0].title}</a></li>
                <li><a href="#storage" className="hover:text-green-400 transition-colors" data-testid="link-footer-storage">{t.modules.cards[2].title}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-foreground uppercase mb-6 tracking-widest">{t.footer.cols[1]}</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/admin" className="hover:text-green-400 transition-colors" data-testid="link-footer-admin">Admin</Link></li>
                <li><button onClick={() => setShowContactForm(true)} className="hover:text-green-400 transition-colors" data-testid="link-footer-contact">Contact</button></li>
              </ul>
            </div>

            <div>
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full py-3 bg-foreground text-background font-bold text-sm hover:bg-green-400 transition-colors mb-4 uppercase"
                data-testid="button-footer-cta"
              >
                {t.footer.cta}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Gujarat, India <br />
                System ID: PA-2025
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-xs text-muted-foreground font-mono">
            <div className="uppercase" data-testid="text-copyright">© 2025 PARTH AGROTECH. {t.footer.rights}</div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span>PRIVACY</span>
              <span>TERMS</span>
            </div>
          </div>
        </div>
      </footer>

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
}
