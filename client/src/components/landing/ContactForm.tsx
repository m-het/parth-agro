import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ContactFormProps {
  onClose: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const { lang, t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'farmer',
    message: ''
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: lang === 'en' ? 'Message Sent!' : 'સંદેશ મોકલ્યો!',
        description: lang === 'en' ? 'We will contact you soon.' : 'અમે તમારો સંપર્ક કરીશું.',
      });
      onClose();
    },
    onError: () => {
      toast({
        title: lang === 'en' ? 'Error' : 'ભૂલ',
        description: lang === 'en' ? 'Failed to send message. Please try again.' : 'સંદેશ મોકલવામાં નિષ્ફળ. કૃપા કરી ફરી પ્રયાસ કરો.',
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const typeOptions = lang === 'en' 
    ? [
        { value: 'farmer', label: 'Farmer' },
        { value: 'factory', label: 'Factory/Industry' },
        { value: 'investor', label: 'Investor' },
        { value: 'other', label: 'Other' }
      ]
    : [
        { value: 'farmer', label: 'ખેડૂત' },
        { value: 'factory', label: 'ફેક્ટરી/ઉદ્યોગ' },
        { value: 'investor', label: 'રોકાણકાર' },
        { value: 'other', label: 'અન્ય' }
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-lg p-8 fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
          data-testid="button-close-contact"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 border border-green-500/30 rounded bg-green-900/10">
            <span className="text-xs font-mono text-green-400 uppercase">
              {lang === 'en' ? 'CONTACT US' : 'અમારો સંપર્ક કરો'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {lang === 'en' ? 'Become a Partner' : 'ભાગીદાર બનો'}
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            {lang === 'en' 
              ? 'Fill out this form and we will contact you within 24 hours.' 
              : 'આ ફોર્મ ભરો અને અમે ૨૪ કલાકમાં તમારો સંપર્ક કરીશું.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
                {t.forms.name} *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-neutral-900 border-neutral-800 text-white focus:border-green-500"
                placeholder={lang === 'en' ? 'Your name' : 'તમારું નામ'}
                data-testid="input-contact-name"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
                {t.forms.phone} *
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-neutral-900 border-neutral-800 text-white focus:border-green-500"
                placeholder="+91 98765 43210"
                data-testid="input-contact-phone"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
                {t.forms.email}
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-neutral-900 border-neutral-800 text-white focus:border-green-500"
                placeholder="email@example.com"
                data-testid="input-contact-email"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
                {lang === 'en' ? 'I am a' : 'હું છું'} *
              </label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white focus:border-green-500" data-testid="select-contact-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-neutral-800">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
              {lang === 'en' ? 'Message' : 'સંદેશ'} *
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="bg-neutral-900 border-neutral-800 text-white focus:border-green-500 resize-none"
              placeholder={lang === 'en' ? 'How can we help you?' : 'અમે તમને કેવી રીતે મદદ કરી શકીએ?'}
              data-testid="textarea-contact-message"
            />
          </div>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              data-testid="button-cancel-contact"
            >
              {t.forms.cancel}
            </Button>
            <Button 
              type="submit" 
              disabled={mutation.isPending}
              className="flex-1 bg-green-500 text-black hover:bg-green-400"
              data-testid="button-submit-contact"
            >
              {mutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t.forms.submit}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
