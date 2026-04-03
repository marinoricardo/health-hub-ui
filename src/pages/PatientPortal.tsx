import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Calendar, FileText, Pill, Clock, User, Phone, Mail, MapPin, ChevronRight, Download, Star, MessageSquare, Bell, LogOut, Settings, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const upcomingAppointments = [
  { id: "1", doctor: "Dr. João Silva", specialty: "Clínica Geral", date: "05/04/2026", time: "09:00", status: "confirmed", clinic: "Clínica Central Maputo" },
  { id: "2", doctor: "Dra. Ana Mondlane", specialty: "Cardiologia", date: "12/04/2026", time: "14:30", status: "scheduled", clinic: "Centro Médico Polana" },
];

const pastAppointments = [
  { id: "3", doctor: "Dr. João Silva", specialty: "Clínica Geral", date: "20/03/2026", time: "10:00", status: "completed", clinic: "Clínica Central Maputo", notes: "Consulta de rotina. Resultados normais." },
  { id: "4", doctor: "Dra. Ana Mondlane", specialty: "Cardiologia", date: "15/02/2026", time: "11:00", status: "completed", clinic: "Centro Médico Polana", notes: "ECG realizado. Sem alterações." },
];

const prescriptions = [
  { id: "1", medication: "Amoxicilina 500mg", dosage: "8/8h por 7 dias", doctor: "Dr. João Silva", date: "20/03/2026", status: "active" },
  { id: "2", medication: "Paracetamol 500mg", dosage: "SOS (máx 4x/dia)", doctor: "Dr. João Silva", date: "20/03/2026", status: "active" },
  { id: "3", medication: "Losartan 50mg", dosage: "1x/dia", doctor: "Dra. Ana Mondlane", date: "15/02/2026", status: "completed" },
];

const labResults = [
  { id: "1", name: "Hemograma Completo", date: "18/03/2026", status: "ready", doctor: "Dr. João Silva" },
  { id: "2", name: "Glicemia em Jejum", date: "18/03/2026", status: "ready", doctor: "Dr. João Silva" },
  { id: "3", name: "Perfil Lipídico", date: "10/02/2026", status: "ready", doctor: "Dra. Ana Mondlane" },
];

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleBookAppointment = () => {
    toast.success("Consulta marcada com sucesso! Receberá uma SMS de confirmação.");
    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Portal Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">HealthSync</span>
              <span className="text-xs text-muted-foreground ml-2">Portal do Paciente</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm"><Bell className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon-sm"><Settings className="w-5 h-5" /></Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-sm font-medium text-white">MN</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Banner */}
        <div className="health-card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Olá, Maria Nguema 👋</h1>
              <p className="text-muted-foreground">Bem-vinda ao seu portal de saúde</p>
            </div>
            <Button onClick={() => setShowBookingModal(true)}>
              <Calendar className="w-4 h-4 mr-2" />
              Marcar Consulta
            </Button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Próxima Consulta", value: "05 Abr", sub: "09:00 - Dr. Silva", icon: Calendar, color: "primary" },
            { label: "Receitas Activas", value: "2", sub: "medicamentos", icon: Pill, color: "warning" },
            { label: "Resultados", value: "3", sub: "disponíveis", icon: ClipboardList, color: "success" },
            { label: "Mensagens", value: "1", sub: "nova", icon: MessageSquare, color: "info" },
          ].map((card, i) => (
            <div key={i} className="health-card">
              <div className={`w-10 h-10 rounded-xl bg-${card.color}/10 flex items-center justify-center mb-3`}>
                <card.icon className={`w-5 h-5 text-${card.color}`} />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto md:inline-grid">
            <TabsTrigger value="overview">Resumo</TabsTrigger>
            <TabsTrigger value="appointments">Consultas</TabsTrigger>
            <TabsTrigger value="prescriptions">Receitas</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Upcoming */}
            <div className="health-card">
              <h3 className="font-semibold mb-4">Próximas Consultas</h3>
              <div className="space-y-3">
                {upcomingAppointments.map(apt => (
                  <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{apt.doctor}</p>
                        <p className="text-sm text-muted-foreground">{apt.specialty} — {apt.clinic}</p>
                        <p className="text-xs text-muted-foreground">{apt.date} às {apt.time}</p>
                      </div>
                    </div>
                    <span className={`status-pill status-${apt.status}`}>
                      {apt.status === "confirmed" ? "Confirmada" : "Agendada"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Prescriptions */}
            <div className="health-card">
              <h3 className="font-semibold mb-4">Medicação Actual</h3>
              <div className="space-y-3">
                {prescriptions.filter(p => p.status === "active").map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Pill className="w-5 h-5 text-warning" />
                      <div>
                        <p className="font-medium text-sm">{p.medication}</p>
                        <p className="text-xs text-muted-foreground">{p.dosage}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.doctor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Results */}
            <div className="health-card">
              <h3 className="font-semibold mb-4">Resultados Recentes</h3>
              <div className="space-y-3">
                {labResults.slice(0, 2).map(r => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <ClipboardList className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium text-sm">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.date} — {r.doctor}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toast.success("A descarregar resultado...")}><Download className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6 mt-6">
            <div className="health-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Próximas Consultas</h3>
                <Button size="sm" onClick={() => setShowBookingModal(true)}><Plus className="w-4 h-4 mr-1" />Marcar Nova</Button>
              </div>
              <div className="space-y-3">
                {upcomingAppointments.map(apt => (
                  <div key={apt.id} className="p-4 rounded-xl bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{apt.doctor} — {apt.specialty}</p>
                      <span className={`status-pill status-${apt.status}`}>{apt.status === "confirmed" ? "Confirmada" : "Agendada"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{apt.clinic}</p>
                    <p className="text-sm text-muted-foreground">{apt.date} às {apt.time}</p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => toast.success("Consulta reagendada!")}>Reagendar</Button>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => toast.success("Consulta cancelada")}>Cancelar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="health-card">
              <h3 className="font-semibold mb-4">Histórico de Consultas</h3>
              <div className="space-y-3">
                {pastAppointments.map(apt => (
                  <div key={apt.id} className="p-4 rounded-xl bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{apt.doctor} — {apt.specialty}</p>
                      <span className="status-pill status-completed">Concluída</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{apt.date} às {apt.time}</p>
                    {apt.notes && <p className="text-sm bg-muted/50 p-2 rounded-lg">{apt.notes}</p>}
                    <Button size="sm" variant="ghost" onClick={() => setShowFeedbackModal(true)}>
                      <Star className="w-4 h-4 mr-1" />Avaliar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="mt-6">
            <div className="health-card">
              <h3 className="font-semibold mb-4">Todas as Receitas</h3>
              <div className="space-y-3">
                {prescriptions.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Pill className={`w-5 h-5 ${p.status === "active" ? "text-warning" : "text-muted-foreground"}`} />
                      <div>
                        <p className="font-medium">{p.medication}</p>
                        <p className="text-sm text-muted-foreground">{p.dosage}</p>
                        <p className="text-xs text-muted-foreground">{p.doctor} — {p.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`status-pill ${p.status === "active" ? "status-confirmed" : "status-completed"}`}>
                        {p.status === "active" ? "Activa" : "Concluída"}
                      </span>
                      <Button variant="ghost" size="icon-sm" onClick={() => toast.success("Receita descarregada!")}><Download className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <div className="health-card">
              <h3 className="font-semibold mb-4">Resultados de Exames</h3>
              <div className="space-y-3">
                {labResults.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-3">
                      <ClipboardList className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium">{r.name}</p>
                        <p className="text-sm text-muted-foreground">{r.date} — {r.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="status-pill status-confirmed">Disponível</span>
                      <Button variant="ghost" size="icon-sm" onClick={() => toast.success("Resultado descarregado!")}><Download className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Marcar Consulta</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Especialidade</Label>
              <Select><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Clínica Geral</SelectItem>
                  <SelectItem value="cardio">Cardiologia</SelectItem>
                  <SelectItem value="ortop">Ortopedia</SelectItem>
                  <SelectItem value="derm">Dermatologia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Médico</Label>
              <Select><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="joao">Dr. João Silva</SelectItem>
                  <SelectItem value="ana">Dra. Ana Mondlane</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Data Preferida</Label><Input type="date" /></div>
            <div><Label>Horário Preferido</Label>
              <Select><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="manha">Manhã (08:00 - 12:00)</SelectItem>
                  <SelectItem value="tarde">Tarde (14:00 - 17:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Motivo da Consulta</Label><Textarea placeholder="Descreva brevemente..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingModal(false)}>Cancelar</Button>
            <Button onClick={handleBookAppointment}>Confirmar Marcação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Avaliar Consulta</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setRating(s)} className="p-1">
                  <Star className={cn("w-8 h-8 transition-colors", s <= rating ? "text-warning fill-warning" : "text-muted-foreground")} />
                </button>
              ))}
            </div>
            <div><Label>Comentário (opcional)</Label><Textarea placeholder="Como foi a sua experiência?" /></div>
          </div>
          <DialogFooter>
            <Button onClick={() => { toast.success("Obrigado pela sua avaliação!"); setShowFeedbackModal(false); setRating(0); }}>Enviar Avaliação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Fix: Plus icon not imported at top
const Plus = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

export default PatientPortal;
