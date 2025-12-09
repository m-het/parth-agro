import { Link } from 'wouter';
import { ArrowLeft, Users, Heart, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Logo } from '@/components/landing/Logo';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Card } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

const investors = [
    {
        id: 'investor1',
        name: 'Rajesh Patel',
        role: {
            en: 'Founding Investor',
            gu: 'સ્થાપક રોકાણકાર'
        },
        contribution: {
            en: 'Believed in our vision from day one and helped establish the foundation of PARTH AGROTECH.',
            gu: 'પ્રથમ દિવસથી અમારી દ્રષ્ટિમાં વિશ્વાસ કર્યો અને પાર્થ એગ્રોટેકની સ્થાપના કરવામાં મદદ કરી.'
        },
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        stats: { invested: '2019', amount: '₹50L' }
    },
    {
        id: 'investor2',
        name: 'Amit Shah',
        role: {
            en: 'Strategic Investor',
            gu: 'વ્યૂહાત્મક રોકાણકાર'
        },
        contribution: {
            en: 'Provided key strategic guidance and financial backing for our expansion into new markets.',
            gu: 'નવા બજારોમાં અમારા વિસ્તરણ માટે મુખ્ય વ્યૂહાત્મક માર્ગદર્શન અને નાણાકીય સમર્થન પૂરું પાડ્યું.'
        },
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        stats: { invested: '2020', amount: '₹75L' }
    },
    {
        id: 'investor3',
        name: 'Vikram Mehta',
        role: {
            en: 'Angel Investor',
            gu: 'એન્જલ રોકાણકાર'
        },
        contribution: {
            en: 'Early supporter who saw potential in revolutionizing the agricultural supply chain.',
            gu: 'પ્રારંભિક સમર્થક જેણે કૃષિ સપ્લાય ચેઇનમાં ક્રાંતિ લાવવાની સંભાવના જોઈ.'
        },
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
        stats: { invested: '2019', amount: '₹25L' }
    },
    {
        id: 'investor4',
        name: 'Suresh Agarwal',
        role: {
            en: 'Growth Investor',
            gu: 'વૃદ્ધિ રોકાણકાર'
        },
        contribution: {
            en: 'Instrumental in scaling our operations and building strong factory partnerships.',
            gu: 'અમારી કામગીરીને સ્કેલિંગ કરવામાં અને મજબૂત ફેક્ટરી ભાગીદારી બનાવવામાં મહત્વપૂર્ણ.'
        },
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
        stats: { invested: '2021', amount: '₹1Cr' }
    },
    {
        id: 'investor5',
        name: 'Kiran Desai',
        role: {
            en: 'Technology Investor',
            gu: 'ટેકનોલોજી રોકાણકાર'
        },
        contribution: {
            en: 'Championed our digital transformation and modern farming technology initiatives.',
            gu: 'અમારા ડિજિટલ પરિવર્તન અને આધુનિક ખેતી ટેકનોલોજી પહેલનું સમર્થન કર્યું.'
        },
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
        stats: { invested: '2022', amount: '₹60L' }
    },
    {
        id: 'investor6',
        name: 'Deepak Sharma',
        role: {
            en: 'Community Investor',
            gu: 'સમુદાય રોકાણકાર'
        },
        contribution: {
            en: 'Focused on empowering local farmers and creating sustainable agricultural practices.',
            gu: 'સ્થાનિક ખેડૂતોને સશક્ત બનાવવા અને ટકાઉ કૃષિ પદ્ધતિઓ બનાવવા પર ધ્યાન કેન્દ્રિત કર્યું.'
        },
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
        stats: { invested: '2023', amount: '₹40L' }
    }
];

// Scroll-based parallax hook
function useParallax() {
    const [scrollY, setScrollY] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleResize = () => setWindowHeight(window.innerHeight);

        handleScroll();
        handleResize();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { scrollY, windowHeight };
}

// Intersection observer hook for scroll animations
function useScrollAnimation() {
    const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleElements((prev) => new Set([...prev, entry.target.id]));
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        return () => observerRef.current?.disconnect();
    }, []);

    const observe = (element: HTMLElement | null) => {
        if (element && observerRef.current) {
            observerRef.current.observe(element);
        }
    };

    return { visibleElements, observe };
}

export default function Backbone() {
    const { lang } = useLanguage();
    const { theme } = useTheme();
    const { scrollY, windowHeight } = useParallax();
    const { visibleElements, observe } = useScrollAnimation();
    const [showMarquee, setShowMarquee] = useState(false);
    const [activeInvestor, setActiveInvestor] = useState<typeof investors[0] | null>(null);

    // Show marquee after scrolling past hero
    useEffect(() => {
        setShowMarquee(scrollY > 300);
    }, [scrollY]);

    const content = {
        en: {
            tag: 'OUR BACKBONE',
            title: 'The Visionaries',
            subtitle: 'Meet the men who believed in our mission and invested in transforming agricultural commerce. Their support makes everything possible.',
            backToHome: 'Back to Home',
            investedIn: 'Invested in PARTH AGROTECH',
            scrollPrompt: 'Scroll to explore our investors',
            totalInvestment: 'Total Investment',
            yearFounded: 'Year Founded',
            farmersHelped: 'Farmers Helped',
            growthRate: 'Growth Rate'
        },
        gu: {
            tag: 'અમારી કરોડરજ્જુ',
            title: 'દ્રષ્ટાઓ',
            subtitle: 'એવા માણસોને મળો જેમણે અમારા મિશનમાં વિશ્વાસ કર્યો અને કૃષિ વાણિજ્યને પરિવર્તિત કરવામાં રોકાણ કર્યું. તેમનું સમર્થન બધું શક્ય બનાવે છે.',
            backToHome: 'હોમ પર પાછા જાઓ',
            investedIn: 'પાર્થ એગ્રોટેકમાં રોકાણ કર્યું',
            scrollPrompt: 'અમારા રોકાણકારોને શોધવા સ્ક્રોલ કરો',
            totalInvestment: 'કુલ રોકાણ',
            yearFounded: 'સ્થાપના વર્ષ',
            farmersHelped: 'ખેડૂતોને મદદ',
            growthRate: 'વૃદ્ધિ દર'
        }
    };

    const text = content[lang];

    // Marquee metadata text
    const marqueeText = activeInvestor
        ? `${activeInvestor.name} • ${activeInvestor.role[lang]} • INVESTED: ${activeInvestor.stats.invested} • AMOUNT: ${activeInvestor.stats.amount} • ${activeInvestor.contribution[lang].slice(0, 50)}...`
        : `PARTH AGROTECH • BACKBONE INVESTORS • SINCE 2019 • 6 VISIONARIES • ₹3.5 Cr TOTAL INVESTMENT • 500+ FARMERS SUPPORTED • GUJARAT INDIA`;

    return (
        <div className={`min-h-screen bg-background text-foreground ${lang === 'gu' ? 'font-gujarati' : ''}`}>
            {/* Floating Marquee - appears on scroll */}
            <div
                className={`fixed top-16 left-0 right-0 z-40 bg-green-500/10 backdrop-blur-md border-b border-green-500/30 overflow-hidden transition-all duration-500 ${showMarquee ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                    }`}
            >
                <div className="animate-marquee whitespace-nowrap py-2 flex items-center gap-8">
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className="flex items-center gap-8 text-sm font-mono text-green-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                {marqueeText}
                            </span>
                            <span className="text-green-600">•••</span>
                        </span>
                    ))}
                </div>
            </div>

            <nav className="fixed w-full z-50 bg-background/90 backdrop-blur-md py-4 border-b border-border">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </div>
            </nav>

            {/* Hero Section with Parallax */}
            <header
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
                style={{ perspective: '1000px' }}
            >
                {/* Parallax Background Layer 1 - Slow */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        transform: `translateY(${scrollY * 0.3}px)`,
                        opacity: Math.max(0, 1 - scrollY / windowHeight)
                    }}
                >
                    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[radial-gradient(ellipse_at_center,_#0a2a0a_0%,transparent_70%)]' : 'bg-[radial-gradient(ellipse_at_center,_#dcfce7_0%,transparent_70%)]'}`}></div>
                </div>

                {/* Parallax Background Layer 2 - Medium */}
                <div
                    className="absolute inset-0 z-0 opacity-30"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(34,197,94,0.3) 0%, transparent 30%), 
                                         radial-gradient(circle at 80% 70%, rgba(132,204,22,0.2) 0%, transparent 25%)`
                    }}
                ></div>

                {/* Parallax Grid Pattern */}
                <div
                    className="absolute inset-0 z-0 opacity-10"
                    style={{
                        transform: `translateY(${scrollY * 0.2}px)`,
                        backgroundImage: 'linear-gradient(to right, #22c55e 1px, transparent 1px), linear-gradient(to bottom, #22c55e 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                ></div>

                {/* Floating Circles - Parallax */}
                <div
                    className="absolute w-96 h-96 rounded-full border border-green-500/20 top-1/4 -left-48"
                    style={{ transform: `translateY(${scrollY * 0.4}px) rotate(${scrollY * 0.02}deg)` }}
                ></div>
                <div
                    className="absolute w-64 h-64 rounded-full border border-lime-400/20 bottom-1/4 -right-32"
                    style={{ transform: `translateY(${scrollY * 0.6}px) rotate(${-scrollY * 0.03}deg)` }}
                ></div>

                {/* Hero Content */}
                <div
                    className="container mx-auto px-6 relative z-10 text-center"
                    style={{
                        transform: `translateY(${scrollY * -0.2}px)`,
                        opacity: Math.max(0, 1 - scrollY / (windowHeight * 0.6))
                    }}
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back">
                        <ArrowLeft className="w-4 h-4" />
                        {text.backToHome}
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-green-500/30 rounded-full bg-green-900/10 backdrop-blur-sm mb-8 animate-pulse">
                            <Users className="w-5 h-5 text-green-400" />
                            <span className="text-sm font-mono text-green-400 uppercase tracking-wider">{text.tag}</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 text-foreground" data-testid="text-backbone-title">
                            {text.title}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 animate-pulse">_</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                            {text.subtitle}
                        </p>

                        {/* Stats Row with Parallax */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            {[
                                { icon: TrendingUp, value: '₹3.5Cr', label: text.totalInvestment },
                                { icon: Award, value: '2019', label: text.yearFounded },
                                { icon: Users, value: '500+', label: text.farmersHelped },
                                { icon: Target, value: '40%', label: text.growthRate }
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="p-4 bg-card/50 backdrop-blur border border-border rounded-lg hover:border-green-500/50 transition-all duration-300 group"
                                    style={{ transform: `translateY(${scrollY * (0.1 + i * 0.02)}px)` }}
                                >
                                    <stat.icon className="w-6 h-6 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-xs text-muted-foreground font-mono">{text.scrollPrompt}</span>
                            <div className="w-6 h-10 rounded-full border-2 border-green-500/50 flex items-start justify-center p-2">
                                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Investors Section with Scroll Animations */}
            <section className="py-24 container mx-auto px-6 relative">
                {/* Section Header */}
                <div
                    id="investors-header"
                    ref={(el) => observe(el)}
                    className={`text-center mb-20 transition-all duration-1000 ${visibleElements.has('investors-header')
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                        }`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {lang === 'en' ? 'Our Investors' : 'અમારા રોકાણકારો'}
                        <span className="text-green-500">_</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        {lang === 'en'
                            ? 'Hover over each card to see their journey with us'
                            : 'તેમની અમારી સાથેની યાત્રા જોવા માટે દરેક કાર્ડ પર હોવર કરો'}
                    </p>
                </div>

                {/* Investors Grid with Staggered Animations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {investors.map((investor, index) => (
                        <div
                            key={investor.id}
                            id={investor.id}
                            ref={(el) => observe(el)}
                            className={`transition-all duration-700 ${visibleElements.has(investor.id)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-20'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setActiveInvestor(investor)}
                            onMouseLeave={() => setActiveInvestor(null)}
                        >
                            <Card
                                className="group bg-card border-border p-6 hover:border-green-500/50 transition-all duration-500 relative overflow-hidden hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
                                data-testid={`investor-card-${investor.id}`}
                            >
                                {/* Animated Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-lime-400/0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>

                                {/* Corner Accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 text-center">
                                    {/* Investor Image with Parallax Effect */}
                                    <div className="relative w-36 h-36 mx-auto mb-6">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-400 to-green-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-green-500/30 group-hover:border-green-500 transition-all duration-500 group-hover:scale-110">
                                            <img
                                                src={investor.image}
                                                alt={investor.name}
                                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                            <div className="hidden w-full h-full flex items-center justify-center bg-green-500/20 text-4xl font-bold text-green-400">
                                                {investor.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Investor Info with Slide-up Animation */}
                                    <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-green-400 transition-colors duration-300">
                                        {investor.name}
                                    </h3>
                                    <p className="text-sm font-mono text-green-500 mb-2 uppercase tracking-wider">
                                        {investor.role[lang]}
                                    </p>

                                    {/* Stats that appear on hover */}
                                    <div className="flex justify-center gap-4 mb-4 h-8 overflow-hidden">
                                        <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-8">
                                            <span className="text-xs text-muted-foreground">Since </span>
                                            <span className="text-sm font-bold text-green-400">{investor.stats.invested}</span>
                                        </div>
                                        <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-8 delay-100">
                                            <span className="text-sm font-bold text-lime-400">{investor.stats.amount}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                                        {investor.contribution[lang]}
                                    </p>

                                    {/* Heart Icon */}
                                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground group-hover:text-red-400 transition-colors">
                                        <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:animate-pulse group-hover:scale-125 transition-transform" />
                                        <span>{text.investedIn}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gratitude Section with Parallax */}
            <section className="py-24 relative overflow-hidden">
                {/* Parallax Background */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        transform: `translateY(${(scrollY - windowHeight * 2) * 0.2}px)`,
                        backgroundImage: 'radial-gradient(circle at center, #22c55e 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                <div
                    id="gratitude-section"
                    ref={(el) => observe(el)}
                    className={`container mx-auto px-6 text-center transition-all duration-1000 ${visibleElements.has('gratitude-section')
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                        }`}
                >
                    <div className="inline-block p-12 bg-gradient-to-br from-green-500/10 to-lime-400/5 border border-green-500/20 rounded-2xl max-w-3xl backdrop-blur-sm relative overflow-hidden group hover:border-green-500/40 transition-all duration-500">
                        {/* Animated Border */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundClip: 'padding-box' }}></div>

                        <h3 className="text-3xl md:text-4xl font-bold text-green-400 mb-6">
                            {lang === 'en' ? '🙏 Forever Grateful' : '🙏 સદા આભારી'}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {lang === 'en'
                                ? 'These visionary men took a chance on us when we were just an idea. Their belief, support, and investment have been the backbone of PARTH AGROTECH. We are committed to honoring their trust by continuing to grow and serve our farming community.'
                                : 'આ દ્રષ્ટાવાન પુરુષોએ અમારા પર વિશ્વાસ મૂક્યો જ્યારે અમે માત્ર એક વિચાર હતા. તેમનો વિશ્વાસ, સમર્થન અને રોકાણ પાર્થ એગ્રોટેકની કરોડરજ્જુ રહ્યાં છે. અમે તેમના વિશ્વાસનું સન્માન કરવા અને અમારા ખેડૂત સમુદાયની સેવા ચાલુ રાખવા માટે પ્રતિબદ્ધ છીએ.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-card py-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-mono">
                        <div className="uppercase">© 2025 PARTH AGROTECH. {lang === 'en' ? 'All rights reserved.' : 'બધા હકો અમારી પાસે રાખેલ છે.'}</div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <span>PRIVACY</span>
                            <span>TERMS</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Custom Styles */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
