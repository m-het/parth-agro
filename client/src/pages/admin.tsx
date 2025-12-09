import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  ArrowLeft, Users, Factory, Server, MessageSquare,
  Plus, Trash2, Loader2, RefreshCw, Thermometer,
  MapPin, Phone, Package, Settings, LogOut
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/landing/Logo';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Farmer, Factory as FactoryType, ColdStorage, ContactInquiry } from '@shared/schema';

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('farmers');
  const [showAddStorage, setShowAddStorage] = useState(false);
  const [newStorage, setNewStorage] = useState({ name: '', location: '', capacity: '', temperature: '3.2', humidity: '88' });

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  const { data: farmers, isLoading: farmersLoading, refetch: refetchFarmers } = useQuery<Farmer[]>({
    queryKey: ['/api/farmers']
  });

  const { data: factories, isLoading: factoriesLoading, refetch: refetchFactories } = useQuery<FactoryType[]>({
    queryKey: ['/api/factories']
  });

  const { data: storages, isLoading: storagesLoading, refetch: refetchStorages } = useQuery<ColdStorage[]>({
    queryKey: ['/api/cold-storages']
  });

  const { data: inquiries, isLoading: inquiriesLoading, refetch: refetchInquiries } = useQuery<ContactInquiry[]>({
    queryKey: ['/api/contact']
  });

  const updateFarmerStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest('PATCH', `/api/farmers/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/farmers'] });
      toast({ title: lang === 'en' ? 'Status Updated' : 'સ્ટેટસ અપડેટ થયું' });
    }
  });

  const deleteFarmer = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/farmers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/farmers'] });
      toast({ title: lang === 'en' ? 'Farmer Deleted' : 'ખેડૂત કાઢી નાખ્યો' });
    }
  });

  const addStorage = useMutation({
    mutationFn: async (data: typeof newStorage) => {
      return apiRequest('POST', '/api/cold-storages', {
        ...data,
        capacity: parseInt(data.capacity) || 0
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cold-storages'] });
      setShowAddStorage(false);
      setNewStorage({ name: '', location: '', capacity: '', temperature: '3.2', humidity: '88' });
      toast({ title: lang === 'en' ? 'Storage Added' : 'સ્ટોરેજ ઉમેર્યું' });
    }
  });

  const updateInquiryStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest('PATCH', `/api/contact/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({ title: lang === 'en' ? 'Status Updated' : 'સ્ટેટસ અપડેટ થયું' });
    }
  });

  const statusColors: Record<string, string> = {
    'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'approved': 'bg-green-500/20 text-green-400 border-green-500/30',
    'active': 'bg-green-500/20 text-green-400 border-green-500/30',
    'rejected': 'bg-red-500/20 text-red-400 border-red-500/30',
    'new': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'contacted': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'closed': 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
    'online': 'bg-green-500/20 text-green-400 border-green-500/30',
    'offline': 'bg-red-500/20 text-red-400 border-red-500/30'
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
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Settings className="w-3 h-3 mr-1" />
              {user?.username || 'ADMIN'}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground hover:bg-red-500/10"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {lang === 'en' ? 'Logout' : 'લૉગઆઉટ'}
            </Button>
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
                {lang === 'en' ? 'ADMIN PANEL' : 'એડમિન પેનલ'}
              </span>
            </div>
            <h1 className="text-3xl font-bold" data-testid="text-page-title">
              {lang === 'en' ? 'System Management' : 'સિસ્ટમ મેનેજમેન્ટ'}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono" data-testid="stat-farmers">{farmers?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{lang === 'en' ? 'Farmers' : 'ખેડૂતો'}</div>
              </div>
            </div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Factory className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono" data-testid="stat-factories">{factories?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{lang === 'en' ? 'Factories' : 'ફેક્ટરીઓ'}</div>
              </div>
            </div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Server className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono" data-testid="stat-storages">{storages?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{lang === 'en' ? 'Storages' : 'સ્ટોરેજ'}</div>
              </div>
            </div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono" data-testid="stat-inquiries">{inquiries?.filter(i => i.status === 'new').length || 0}</div>
                <div className="text-xs text-muted-foreground">{lang === 'en' ? 'New Inquiries' : 'નવી પૂછપરછ'}</div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary border border-border p-1">
            <TabsTrigger value="farmers" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400" data-testid="tab-farmers">
              <Users className="w-4 h-4 mr-2" />
              {lang === 'en' ? 'Farmers' : 'ખેડૂતો'}
            </TabsTrigger>
            <TabsTrigger value="storages" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400" data-testid="tab-storages">
              <Server className="w-4 h-4 mr-2" />
              {lang === 'en' ? 'Storages' : 'સ્ટોરેજ'}
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400" data-testid="tab-inquiries">
              <MessageSquare className="w-4 h-4 mr-2" />
              {lang === 'en' ? 'Inquiries' : 'પૂછપરછ'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farmers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{lang === 'en' ? 'Registered Farmers' : 'નોંધાયેલા ખેડૂતો'}</h2>
              <Button variant="outline" size="sm" onClick={() => refetchFarmers()} className="border-border" data-testid="button-refresh-farmers">
                <RefreshCw className="w-4 h-4 mr-2" />
                {lang === 'en' ? 'Refresh' : 'રિફ્રેશ'}
              </Button>
            </div>

            {farmersLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">{lang === 'en' ? 'Name' : 'નામ'}</th>
                        <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">{lang === 'en' ? 'Phone' : 'ફોન'}</th>
                        <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">{lang === 'en' ? 'Location' : 'સ્થળ'}</th>
                        <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">{lang === 'en' ? 'Farm' : 'ખેતર'}</th>
                        <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">{lang === 'en' ? 'Status' : 'સ્ટેટસ'}</th>
                        <th className="text-left text-xs font-mono text-muted-foreground uppercase p-4">{lang === 'en' ? 'Actions' : 'ક્રિયાઓ'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmers?.map((farmer) => (
                        <tr key={farmer.id} className="border-b border-border hover:bg-accent/50" data-testid={`farmer-row-${farmer.id}`}>
                          <td className="p-4 font-medium text-foreground">{farmer.name}</td>
                          <td className="p-4 text-muted-foreground font-mono text-sm">{farmer.phone}</td>
                          <td className="p-4 text-muted-foreground text-sm">{farmer.village}, {farmer.district}</td>
                          <td className="p-4 text-muted-foreground text-sm">{farmer.farmSize} acres - {farmer.potatoVariety}</td>
                          <td className="p-4">
                            <Badge className={statusColors[farmer.status] || 'bg-neutral-500/20'}>
                              {farmer.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Select
                                value={farmer.status}
                                onValueChange={(value) => updateFarmerStatus.mutate({ id: farmer.id, status: value })}
                              >
                                <SelectTrigger className="w-32 h-8 bg-secondary border-border text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border-popover-border">
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteFarmer.mutate(farmer.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                data-testid={`button-delete-farmer-${farmer.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {(!farmers || farmers.length === 0) && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-muted-foreground">
                            {lang === 'en' ? 'No farmers registered yet' : 'હજી સુધી કોઈ ખેડૂત નોંધાયેલ નથી'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="storages" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{lang === 'en' ? 'Cold Storage Units' : 'કોલ્ડ સ્ટોરેજ યુનિટ'}</h2>
              <Dialog open={showAddStorage} onOpenChange={setShowAddStorage}>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 text-black hover:bg-green-400" data-testid="button-add-storage">
                    <Plus className="w-4 h-4 mr-2" />
                    {lang === 'en' ? 'Add Storage' : 'સ્ટોરેજ ઉમેરો'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border text-foreground">
                  <DialogHeader>
                    <DialogTitle>{lang === 'en' ? 'Add New Storage' : 'નવું સ્ટોરેજ ઉમેરો'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">Name</label>
                      <Input
                        value={newStorage.name}
                        onChange={(e) => setNewStorage({ ...newStorage, name: e.target.value })}
                        className="bg-secondary border-border"
                        placeholder="Cold Storage Name"
                        data-testid="input-storage-name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">Location</label>
                      <Input
                        value={newStorage.location}
                        onChange={(e) => setNewStorage({ ...newStorage, location: e.target.value })}
                        className="bg-secondary border-border"
                        placeholder="City/Town"
                        data-testid="input-storage-location"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">Capacity (tons)</label>
                        <Input
                          type="number"
                          value={newStorage.capacity}
                          onChange={(e) => setNewStorage({ ...newStorage, capacity: e.target.value })}
                          className="bg-secondary border-border"
                          placeholder="5000"
                          data-testid="input-storage-capacity"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">Temp (°C)</label>
                        <Input
                          value={newStorage.temperature}
                          onChange={(e) => setNewStorage({ ...newStorage, temperature: e.target.value })}
                          className="bg-secondary border-border"
                          placeholder="3.2"
                          data-testid="input-storage-temp"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">Humidity (%)</label>
                        <Input
                          value={newStorage.humidity}
                          onChange={(e) => setNewStorage({ ...newStorage, humidity: e.target.value })}
                          className="bg-secondary border-border"
                          placeholder="88"
                          data-testid="input-storage-humidity"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => addStorage.mutate(newStorage)}
                      disabled={addStorage.isPending}
                      className="w-full bg-green-500 text-black hover:bg-green-400"
                      data-testid="button-submit-storage"
                    >
                      {addStorage.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : lang === 'en' ? 'Add Storage' : 'સ્ટોરેજ ઉમેરો'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {storagesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storages?.map((storage) => (
                  <Card key={storage.id} className="bg-card border-border p-6" data-testid={`storage-admin-${storage.id}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-foreground">{storage.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {storage.location}
                        </div>
                      </div>
                      <Badge className={statusColors[storage.status]}>
                        {storage.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-1"><Package className="w-3 h-3" /> Current</span>
                        <span className="font-mono text-foreground">{storage.currentStock} tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-mono text-foreground">{storage.capacity} tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-1"><Thermometer className="w-3 h-3" /> Temperature</span>
                        <span className="font-mono text-green-400">{storage.temperature}°C</span>
                      </div>
                    </div>

                    <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-lime-400 to-green-600"
                        style={{ width: `${(storage.currentStock / storage.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </Card>
                ))}
                {(!storages || storages.length === 0) && (
                  <Card className="col-span-full bg-card border-border p-12 text-center">
                    <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{lang === 'en' ? 'No storage units added yet' : 'હજી કોઈ સ્ટોરેજ યુનિટ ઉમેર્યું નથી'}</p>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{lang === 'en' ? 'Contact Inquiries' : 'સંપર્ક પૂછપરછ'}</h2>
              <Button variant="outline" size="sm" onClick={() => refetchInquiries()} className="border-border" data-testid="button-refresh-inquiries">
                <RefreshCw className="w-4 h-4 mr-2" />
                {lang === 'en' ? 'Refresh' : 'રિફ્રેશ'}
              </Button>
            </div>

            {inquiriesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries?.map((inquiry) => (
                  <Card key={inquiry.id} className="bg-card border-border p-6" data-testid={`inquiry-${inquiry.id}`}>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-foreground">{inquiry.name}</h3>
                          <Badge className={statusColors[inquiry.status]}>
                            {inquiry.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-muted-foreground border-border">
                            {inquiry.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {inquiry.phone}</span>
                          {inquiry.email && <span>{inquiry.email}</span>}
                        </div>
                        <p className="text-foreground text-sm bg-secondary/50 p-3 rounded">{inquiry.message}</p>
                      </div>
                      <div className="flex md:flex-col gap-2">
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) => updateInquiryStatus.mutate({ id: inquiry.id, status: value })}
                        >
                          <SelectTrigger className="w-32 bg-secondary border-border text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-popover-border">
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}
                {(!inquiries || inquiries.length === 0) && (
                  <Card className="bg-card border-border p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{lang === 'en' ? 'No inquiries yet' : 'હજી કોઈ પૂછપરછ નથી'}</p>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
