import { useState } from "react";
import { Activity, Building2, Users, TrendingUp, CreditCard, Settings, BarChart3, Shield, Plus, Search, Eye, MoreVertical, CheckCircle2, XCircle, Clock, ArrowUpRight, Globe, Zap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const platformStats = {
  totalClinics: 48, activeClinics: 42, totalUsers: 312, totalPatients: 28450,
  mrr: 856000, growth: 14.2, churnRate: 2.1, avgRevenue: 17833,
};

const clinicsList = [
  { id: "1", name: "Clínica Central Maputo", plan: "Professional", users: 12, patients: 1847, status: "active", city: "Maputo", since: "Jan 2025", revenue: 25000 },
  { id: "2", name: "Centro Médico Polana", plan: "Professional", users: 8, patients: 1200, status: "active", city: "Maputo", since: "Mar 2025", revenue: 25000 },
  { id: "3", name: "Hospital Privado Beira", plan: "Enterprise", users: 25, patients: 4500, status: "active", city: "Beira", since: "Jun 2024", revenue: 50000 },
  { id: "4", name: "Clínica Saúde Nampula", plan: "Starter", users: 3, patients: 320, status: "active", city: "Nampula", since: "Fev 2026", revenue: 10000 },
  { id: "5", name: "Consultório Vida", plan: "Starter", users: 2, patients: 150, status: "trial", city: "Maputo", since: "Mar 2026", revenue: 0 },
  { id: "6", name: "Clínica Esperança", plan: "Professional", users: 6, patients: 890, status: "suspended", city: "Quelimane", since: "Set 2025", revenue: 0 },
];

const recentActivity = [
  { action: "Nova clínica registada", detail: "Consultório Vida — Maputo", time: "há 2 horas", type: "new" },
  { action: "Upgrade de plano", detail: "Centro Médico Polana: Starter → Professional", time: "há 5 horas", type: "upgrade" },
  { action: "Pagamento recebido", detail: "Hospital Privado Beira — 50.000 MT", time: "há 8 horas", type: "payment" },
  { action: "Clínica suspensa", detail: "Clínica Esperança — pagamento em atraso", time: "há 1 dia", type: "alert" },
  { action: "Novo utilizador", detail: "Dr. Manuel Tembe — Clínica Central", time: "há 1 dia", type: "new" },
];

const AdminBackoffice = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [showClinicModal, setShowClinicModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<any>(null);

  const filteredClinics = clinicsList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusPill = (status: string) => {
    const map: Record<string, { class: string; label: string }> = {
      active: { class: "status-confirmed", label: "Activa" },
      trial: { class: "status-scheduled", label: "Trial" },
      suspended: { class: "status-cancelled", label: "Suspensa" },
    };
    const s = map[status] || { class: "", label: status };
    return <span className={`status-pill ${s.class}`}>{s.label}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-sidebar border-b border-sidebar-border sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-secondary flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-sidebar-foreground">HealthSync</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-sidebar-primary/20 text-sidebar-primary text-xs font-medium">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" className="text-sidebar-foreground/70"><Settings className="w-5 h-5" /></Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary to-secondary flex items-center justify-center">
              <span className="text-sm font-medium text-white">SA</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gestão da plataforma SaaS HealthSync</p>
        </div>

        {/* Platform KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Clínicas Activas", value: `${platformStats.activeClinics}/${platformStats.totalClinics}`, icon: Building2, color: "primary", sub: `+3 este mês` },
            { label: "Utilizadores Totais", value: platformStats.totalUsers.toLocaleString(), icon: Users, color: "secondary", sub: "+18 este mês" },
            { label: "MRR", value: `${(platformStats.mrr / 1000).toFixed(0)}k MT`, icon: TrendingUp, color: "success", sub: `+${platformStats.growth}%` },
            { label: "Churn Rate", value: `${platformStats.churnRate}%`, icon: ArrowUpRight, color: "warning", sub: "últimos 30 dias" },
          ].map((stat, i) => (
            <div key={i} className="health-card">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-success mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="clinics">Clínicas</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscrições</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-4">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="health-card">
                <h3 className="font-semibold mb-4">Actividade Recente</h3>
                <div className="space-y-3">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mt-0.5",
                        a.type === "new" ? "bg-success/10" : a.type === "upgrade" ? "bg-primary/10" : a.type === "payment" ? "bg-info/10" : "bg-destructive/10"
                      )}>
                        {a.type === "new" ? <Plus className="w-4 h-4 text-success" /> :
                         a.type === "upgrade" ? <ArrowUpRight className="w-4 h-4 text-primary" /> :
                         a.type === "payment" ? <CreditCard className="w-4 h-4 text-info" /> :
                         <XCircle className="w-4 h-4 text-destructive" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{a.action}</p>
                        <p className="text-xs text-muted-foreground">{a.detail}</p>
                        <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue by Plan */}
              <div className="health-card">
                <h3 className="font-semibold mb-4">Distribuição por Plano</h3>
                <div className="space-y-4">
                  {[
                    { plan: "Starter", clinics: 15, revenue: 150000, color: "primary" },
                    { plan: "Professional", clinics: 22, revenue: 550000, color: "secondary" },
                    { plan: "Enterprise", clinics: 5, revenue: 250000, color: "success" },
                  ].map((p, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{p.plan}</span>
                        <span className="text-muted-foreground">{p.clinics} clínicas · {(p.revenue / 1000).toFixed(0)}k MT/mês</span>
                      </div>
                      <Progress value={(p.clinics / platformStats.totalClinics) * 100} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Distribuição Geográfica</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { city: "Maputo", count: 28 },
                      { city: "Beira", count: 8 },
                      { city: "Nampula", count: 6 },
                      { city: "Quelimane", count: 4 },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <span className="text-sm flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-muted-foreground" />{c.city}</span>
                        <span className="text-sm font-medium">{c.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clinics" className="space-y-4 mt-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Pesquisar clínicas..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Button onClick={() => toast.success("Formulário de onboarding enviado!")}><Plus className="w-4 h-4 mr-2" />Adicionar Clínica</Button>
            </div>
            <div className="space-y-3">
              {filteredClinics.map(c => (
                <div key={c.id} className="health-card hover:border-primary/20 transition-all cursor-pointer" onClick={() => { setSelectedClinic(c); setShowClinicModal(true); }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{c.name}</h3>
                          {getStatusPill(c.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{c.city} · Plano {c.plan} · Desde {c.since}</p>
                        <p className="text-xs text-muted-foreground">{c.users} utilizadores · {c.patients.toLocaleString()} pacientes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{c.revenue > 0 ? `${c.revenue.toLocaleString()} MT` : "—"}</p>
                      <p className="text-xs text-muted-foreground">/mês</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { plan: "Starter", price: "10.000 MT", features: ["500 pacientes", "3 utilizadores", "10 GB", "Suporte email"], clinics: 15 },
                { plan: "Professional", price: "25.000 MT", features: ["3.000 pacientes", "10 utilizadores", "50 GB", "Suporte prioritário", "Multi-clínica"], clinics: 22, popular: true },
                { plan: "Enterprise", price: "Personalizado", features: ["Ilimitado", "Ilimitado", "500 GB", "Suporte dedicado", "API acesso", "SLA 99.9%"], clinics: 5 },
              ].map((p, i) => (
                <div key={i} className={cn("health-card relative", p.popular && "border-primary")}>
                  {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Popular</span>}
                  <h3 className="font-bold text-lg">{p.plan}</h3>
                  <p className="text-2xl font-bold mt-2">{p.price}<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
                  <p className="text-sm text-muted-foreground mt-1">{p.clinics} clínicas activas</p>
                  <ul className="mt-4 space-y-2">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" />{f}</li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4" onClick={() => toast.success(`A editar plano ${p.plan}`)}>Editar Plano</Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Clinic Detail Modal */}
      <Dialog open={showClinicModal} onOpenChange={setShowClinicModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Detalhes da Clínica</DialogTitle></DialogHeader>
          {selectedClinic && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedClinic.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClinic.city} · {getStatusPill(selectedClinic.status)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/30"><p className="text-xs text-muted-foreground">Plano</p><p className="font-medium">{selectedClinic.plan}</p></div>
                <div className="p-3 rounded-lg bg-muted/30"><p className="text-xs text-muted-foreground">Desde</p><p className="font-medium">{selectedClinic.since}</p></div>
                <div className="p-3 rounded-lg bg-muted/30"><p className="text-xs text-muted-foreground">Utilizadores</p><p className="font-medium">{selectedClinic.users}</p></div>
                <div className="p-3 rounded-lg bg-muted/30"><p className="text-xs text-muted-foreground">Pacientes</p><p className="font-medium">{selectedClinic.patients.toLocaleString()}</p></div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => { toast.success("Acesso à clínica concedido"); setShowClinicModal(false); }}>
                  <Eye className="w-4 h-4 mr-2" />Aceder à Clínica
                </Button>
                {selectedClinic.status === "suspended" ? (
                  <Button variant="outline" className="flex-1" onClick={() => { toast.success("Clínica reactivada!"); setShowClinicModal(false); }}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />Reactivar
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 text-destructive" onClick={() => { toast.success("Clínica suspensa"); setShowClinicModal(false); }}>
                    <XCircle className="w-4 h-4 mr-2" />Suspender
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBackoffice;
