import { Link } from 'wouter';
import { ArrowLeft, Factory, Package, Thermometer, MapPin, Phone, TrendingUp, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Logo } from '@/components/landing/Logo';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { ColdStorage, Inventory } from '@shared/schema';

export default function FactoryDashboard() {
  const { lang } = useLanguage();

  const { data: storages, isLoading: storagesLoading } = useQuery<ColdStorage[]>({
    queryKey: ['/api/cold-storages']
  });

  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory[]>({
    queryKey: ['/api/inventory']
  });

  const isLoading = storagesLoading || inventoryLoading;

  const totalStock = storages?.reduce((acc, s) => acc + s.currentStock, 0) || 0;
  const totalCapacity = storages?.reduce((acc, s) => acc + s.capacity, 0) || 0;
  const availableStock = inventory?.filter(i => i.status === 'stored').reduce((acc, i) => acc + i.quantity, 0) || 0;

  const gradeColors: Record<string, string> = {
    'A': 'bg-green-500/20 text-green-400 border-green-500/30',
    'B': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'C': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  };

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
            <Link href="/admin">
              <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground" data-testid="link-admin">
                {lang === 'en' ? 'Admin' : 'એડમિન'}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 container mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back">
          <ArrowLeft className="w-4 h-4" />
          {lang === 'en' ? 'Back to Home' : 'હોમ પર પાછા જાઓ'}
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="inline-block px-3 py-1 mb-2 border border-green-500/30 rounded bg-green-900/10">
              <span className="text-xs font-mono text-green-400 uppercase">
                {lang === 'en' ? 'FACTORY DASHBOARD' : 'ફેક્ટરી ડેશબોર્ડ'}
              </span>
            </div>
            <h1 className="text-3xl font-bold" data-testid="text-page-title">
              {lang === 'en' ? 'Available Potato Inventory' : 'ઉપલબ્ધ બટાકાનો સ્ટોક'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-green-400">
              {lang === 'en' ? 'LIVE DATA' : 'લાઇવ ડેટા'}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {lang === 'en' ? 'TOTAL STOCK' : 'કુલ સ્ટોક'}
                  </span>
                  <Package className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold font-mono text-foreground" data-testid="stat-total-stock">
                  {totalStock.toLocaleString()} <span className="text-sm text-muted-foreground">tons</span>
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {lang === 'en' ? 'AVAILABLE' : 'ઉપલબ્ધ'}
                  </span>
                  <TrendingUp className="w-5 h-5 text-lime-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-foreground" data-testid="stat-available">
                  {availableStock.toLocaleString()} <span className="text-sm text-muted-foreground">tons</span>
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {lang === 'en' ? 'STORAGE UNITS' : 'સ્ટોરેજ યુનિટ'}
                  </span>
                  <Factory className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-foreground" data-testid="stat-units">
                  {storages?.length || 0}
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {lang === 'en' ? 'CAPACITY USED' : 'ક્ષમતા વપરાશ'}
                  </span>
                  <Thermometer className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-foreground" data-testid="stat-capacity">
                  {totalCapacity > 0 ? Math.round((totalStock / totalCapacity) * 100) : 0}%
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Factory className="w-5 h-5 text-green-500" />
                  {lang === 'en' ? 'Cold Storage Locations' : 'કોલ્ડ સ્ટોરેજ સ્થાનો'}
                </h2>
                <div className="space-y-4">
                  {storages?.map((storage) => (
                    <Card key={storage.id} className="bg-card border-border p-6" data-testid={`storage-card-${storage.id}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-foreground">{storage.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {storage.location}
                          </div>
                        </div>
                        <Badge variant={storage.status === 'online' ? 'default' : 'secondary'} className={storage.status === 'online' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                          {storage.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-mono text-foreground">{storage.currentStock}</div>
                          <div className="text-xs text-muted-foreground">{lang === 'en' ? 'Current' : 'હાલ'}</div>
                        </div>
                        <div>
                          <div className="text-lg font-mono text-foreground">{storage.capacity}</div>
                          <div className="text-xs text-muted-foreground">{lang === 'en' ? 'Capacity' : 'ક્ષમતા'}</div>
                        </div>
                        <div>
                          <div className="text-lg font-mono text-green-400">{storage.temperature}°C</div>
                          <div className="text-xs text-muted-foreground">{lang === 'en' ? 'Temp' : 'તાપમાન'}</div>
                        </div>
                      </div>

                      <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-lime-400 to-green-600 transition-all"
                          style={{ width: `${(storage.currentStock / storage.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </Card>
                  ))}

                  {(!storages || storages.length === 0) && (
                    <Card className="bg-card border-border p-8 text-center">
                      <Factory className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {lang === 'en' ? 'No storage locations available' : 'કોઈ સ્ટોરેજ સ્થાન ઉપલબ્ધ નથી'}
                      </p>
                    </Card>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-500" />
                  {lang === 'en' ? 'Available Inventory' : 'ઉપલબ્ધ ઇન્વેન્ટરી'}
                </h2>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">
                            {lang === 'en' ? 'Variety' : 'જાત'}
                          </th>
                          <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">
                            {lang === 'en' ? 'Grade' : 'ગ્રેડ'}
                          </th>
                          <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">
                            {lang === 'en' ? 'Quantity' : 'જથ્થો'}
                          </th>
                          <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">
                            {lang === 'en' ? 'Entry Date' : 'તારીખ'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory?.filter(i => i.status === 'stored').map((item, index) => (
                          <tr key={item.id} className="border-b border-border hover:bg-accent/50" data-testid={`inventory-row-${index}`}>
                            <td className="p-4 font-medium text-foreground">{item.variety}</td>
                            <td className="p-4">
                              <Badge className={`${gradeColors[item.grade] || 'bg-neutral-500/20 text-neutral-400'}`}>
                                {item.grade}
                              </Badge>
                            </td>
                            <td className="p-4 font-mono text-foreground">{item.quantity} tons</td>
                            <td className="p-4 text-muted-foreground text-sm">{item.entryDate}</td>
                          </tr>
                        ))}
                        {(!inventory || inventory.filter(i => i.status === 'stored').length === 0) && (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-muted-foreground">
                              {lang === 'en' ? 'No inventory available' : 'કોઈ ઇન્વેન્ટરી ઉપલબ્ધ નથી'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Card className="mt-6 bg-green-500/10 border-green-500/20 p-6">
                  <h3 className="font-bold text-green-400 mb-2">
                    {lang === 'en' ? 'Interested in Buying?' : 'ખરીદવામાં રસ છે?'}
                  </h3>
                  <p className="text-sm text-foreground mb-4">
                    {lang === 'en'
                      ? 'Contact us to place an order or get more information about our potato supply.'
                      : 'ઓર્ડર આપવા અથવા અમારા બટાકા સપ્લાય વિશે વધુ માહિતી મેળવવા અમારો સંપર્ક કરો.'}
                  </p>
                  <div className="flex items-center gap-2 text-green-400">
                    <Phone className="w-4 h-4" />
                    <span className="font-mono">+91 98765 43210</span>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
