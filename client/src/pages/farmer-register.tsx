import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Sprout, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Logo } from '@/components/landing/Logo';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const potatoVarieties = [
  { value: 'atlantic', label: { en: 'Atlantic', gu: 'એટલાન્ટિક' } },
  { value: 'chipsona', label: { en: 'Chipsona', gu: 'ચિપ્સોના' } },
  { value: 'kufri_jyoti', label: { en: 'Kufri Jyoti', gu: 'કુફરી જ્યોતિ' } },
  { value: 'kufri_pukhraj', label: { en: 'Kufri Pukhraj', gu: 'કુફરી પુખરાજ' } },
  { value: 'fl_1533', label: { en: 'FL-1533', gu: 'FL-1533' } },
  { value: 'other', label: { en: 'Other', gu: 'અન્ય' } }
];

const districts = [
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha',
  'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod',
  'Dang', 'Devbhumi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar',
  'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana',
  'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan',
  'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
  'Tapi', 'Vadodara', 'Valsad'
];

export default function FarmerRegister() {
  const { lang, t } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    district: '',
    farmSize: '',
    potatoVariety: ''
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest('POST', '/api/farmers', {
        ...data,
        farmSize: parseFloat(data.farmSize) || 0
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: lang === 'en' ? 'Registration Successful!' : 'નોંધણી સફળ!',
        description: lang === 'en' ? 'Welcome to PARTH AGROTECH family.' : 'પાર્થ એગ્રોટેક પરિવારમાં સ્વાગત છે.',
      });
    },
    onError: () => {
      toast({
        title: lang === 'en' ? 'Error' : 'ભૂલ',
        description: lang === 'en' ? 'Registration failed. Please try again.' : 'નોંધણી નિષ્ફળ. કૃપા કરી ફરી પ્રયાસ કરો.',
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (submitted) {
    return (
      <div className={`min-h-screen bg-background text-foreground flex items-center justify-center ${lang === 'gu' ? 'font-gujarati' : ''}`}>
        <div className="text-center fade-in-up">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4" data-testid="text-success-title">
            {lang === 'en' ? 'Registration Successful!' : 'નોંધણી સફળ!'}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto" data-testid="text-success-message">
            {lang === 'en'
              ? 'Thank you for joining PARTH AGROTECH. Our team will contact you within 24-48 hours.'
              : 'પાર્થ એગ્રોટેક સાથે જોડાવા બદલ આભાર. અમારી ટીમ 24-48 કલાકમાં તમારો સંપર્ક કરશે.'}
          </p>
          <Link href="/">
            <Button className="bg-green-500 text-black hover:bg-green-400" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {lang === 'en' ? 'Back to Home' : 'હોમ પર પાછા જાઓ'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${lang === 'gu' ? 'font-gujarati' : ''}`}>
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

      <div className="pt-24 pb-12 container mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back">
          <ArrowLeft className="w-4 h-4" />
          {lang === 'en' ? 'Back to Home' : 'હોમ પર પાછા જાઓ'}
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <Sprout className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 mb-2 border border-green-500/30 rounded bg-green-900/10">
                <span className="text-xs font-mono text-green-400 uppercase">
                  {lang === 'en' ? 'FARMER REGISTRATION' : 'ખેડૂત નોંધણી'}
                </span>
              </div>
              <h1 className="text-3xl font-bold" data-testid="text-page-title">
                {lang === 'en' ? 'Join PARTH AGROTECH' : 'પાર્થ એગ્રોટેક સાથે જોડાઓ'}
              </h1>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-muted-foreground mb-8">
              {lang === 'en'
                ? 'Register as a farmer to get access to quality seeds, guaranteed buyback, and cold storage facilities.'
                : 'ગુણવત્તાયુક્ત બિયારણ, ગેરંટીડ બાયબેક અને કોલ્ડ સ્ટોરેજ સુવિધાઓ મેળવવા ખેડૂત તરીકે નોંધણી કરો.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                    {t.forms.name} *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground focus:border-green-500"
                    placeholder={lang === 'en' ? 'Full Name' : 'પૂરું નામ'}
                    data-testid="input-farmer-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                    {t.forms.phone} *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground focus:border-green-500"
                    placeholder="+91 98765 43210"
                    data-testid="input-farmer-phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                    {t.forms.village} *
                  </label>
                  <Input
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground focus:border-green-500"
                    placeholder={lang === 'en' ? 'Village Name' : 'ગામનું નામ'}
                    data-testid="input-farmer-village"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                    {t.forms.district} *
                  </label>
                  <Select value={formData.district} onValueChange={(value) => setFormData({ ...formData, district: value })}>
                    <SelectTrigger className="bg-secondary border-border text-foreground focus:border-green-500" data-testid="select-farmer-district">
                      <SelectValue placeholder={lang === 'en' ? 'Select District' : 'જિલ્લો પસંદ કરો'} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-popover-border max-h-60">
                      {districts.map((district) => (
                        <SelectItem key={district} value={district} className="text-foreground hover:bg-accent">
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                    {t.forms.farmSize} *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground focus:border-green-500"
                    placeholder={lang === 'en' ? 'Farm size in acres' : 'એકરમાં ખેતરનું કદ'}
                    data-testid="input-farmer-farmsize"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                    {t.forms.potatoVariety} *
                  </label>
                  <Select value={formData.potatoVariety} onValueChange={(value) => setFormData({ ...formData, potatoVariety: value })}>
                    <SelectTrigger className="bg-secondary border-border text-foreground focus:border-green-500" data-testid="select-farmer-variety">
                      <SelectValue placeholder={lang === 'en' ? 'Select Variety' : 'જાત પસંદ કરો'} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-popover-border">
                      {potatoVarieties.map((variety) => (
                        <SelectItem key={variety.value} value={variety.value} className="text-foreground hover:bg-accent">
                          {variety.label[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-gradient-to-r from-lime-400 to-green-600 text-black font-bold py-6 text-lg hover:opacity-90"
                  data-testid="button-submit-farmer"
                >
                  {mutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Sprout className="w-5 h-5 mr-2" />
                      {lang === 'en' ? 'Register as Farmer' : 'ખેડૂત તરીકે નોંધણી કરો'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h3 className="font-bold text-green-400 mb-3">
              {lang === 'en' ? 'What You Get:' : 'તમને શું મળશે:'}
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {lang === 'en' ? 'High-quality certified potato seeds' : 'ઉચ્ચ ગુણવત્તાવાળા પ્રમાણિત બટાકાના બિયારણ'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {lang === 'en' ? 'Technical guidance for better yield' : 'વધુ ઉત્પાદન માટે ટેક્નિકલ માર્ગદર્શન'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {lang === 'en' ? 'Guaranteed buyback at fair prices' : 'યોગ્ય ભાવે ગેરંટીડ બાયબેક'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {lang === 'en' ? 'Free cold storage facilities' : 'મફત કોલ્ડ સ્ટોરેજ સુવિધાઓ'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
