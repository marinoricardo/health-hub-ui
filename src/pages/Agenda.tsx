import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  List,
  Grid3X3,
  Clock,
  User,
  Phone,
  X,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  patient: string;
  patientPhone: string;
  doctor: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show";
  notes?: string;
}

const mockAppointments: Appointment[] = [
  { id: "1", patient: "Maria Silva Santos", patientPhone: "(11) 98765-4321", doctor: "Dr. João Silva", date: "2025-01-28", time: "09:00", duration: 30, type: "Consulta de Rotina", status: "confirmed" },
  { id: "2", patient: "João Carlos Oliveira", patientPhone: "(11) 91234-5678", doctor: "Dr. João Silva", date: "2025-01-28", time: "09:30", duration: 30, type: "Retorno Cardiológico", status: "in-progress" },
  { id: "3", patient: "Ana Paula Costa", patientPhone: "(11) 99876-5432", doctor: "Dr. João Silva", date: "2025-01-28", time: "10:00", duration: 45, type: "Exame de Rotina", status: "scheduled" },
  { id: "4", patient: "Pedro Henrique Lima", patientPhone: "(11) 94567-8901", doctor: "Dr. João Silva", date: "2025-01-28", time: "10:45", duration: 30, type: "Primeira Consulta", status: "scheduled" },
  { id: "5", patient: "Fernanda Rocha", patientPhone: "(11) 93456-7890", doctor: "Dr. João Silva", date: "2025-01-28", time: "11:30", duration: 30, type: "Acompanhamento", status: "scheduled" },
  { id: "6", patient: "Carlos Eduardo", patientPhone: "(11) 92345-6789", doctor: "Dra. Ana Costa", date: "2025-01-28", time: "14:00", duration: 30, type: "Consulta Geral", status: "confirmed" },
  { id: "7", patient: "Juliana Mendes", patientPhone: "(11) 91122-3344", doctor: "Dra. Ana Costa", date: "2025-01-28", time: "14:30", duration: 45, type: "Avaliação", status: "scheduled" },
  { id: "8", patient: "Roberto Alves", patientPhone: "(11) 95566-7788", doctor: "Dr. João Silva", date: "2025-01-29", time: "09:00", duration: 30, type: "Retorno", status: "scheduled" },
  { id: "9", patient: "Mariana Souza", patientPhone: "(11) 93344-5566", doctor: "Dra. Ana Costa", date: "2025-01-29", time: "10:00", duration: 30, type: "Acompanhamento", status: "confirmed" },
];

const doctors = [
  { id: "1", name: "Dr. João Silva", specialty: "Cardiologia", color: "bg-primary" },
  { id: "2", name: "Dra. Ana Costa", specialty: "Clínica Geral", color: "bg-secondary" },
  { id: "3", name: "Dra. Carla Mendes", specialty: "Pediatria", color: "bg-accent" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

const Agenda = () => {
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 28));
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    patientPhone: "",
    doctor: "",
    date: "",
    time: "",
    duration: "30",
    type: "",
    notes: "",
  });

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const weekDays = getWeekDays(currentDate);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getAppointmentsForSlot = (date: string, time: string) => {
    return mockAppointments.filter(
      (apt) =>
        apt.date === date &&
        apt.time === time &&
        (selectedDoctor === "all" || apt.doctor === doctors.find((d) => d.id === selectedDoctor)?.name)
    );
  };

  const getAppointmentColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-status-confirmed/20 border-l-4 border-l-status-confirmed";
      case "in-progress":
        return "bg-status-in-progress/20 border-l-4 border-l-status-in-progress";
      case "completed":
        return "bg-status-completed/20 border-l-4 border-l-status-completed";
      case "cancelled":
        return "bg-status-cancelled/20 border-l-4 border-l-status-cancelled";
      case "no-show":
        return "bg-muted border-l-4 border-l-muted-foreground";
      default:
        return "bg-status-scheduled/20 border-l-4 border-l-status-scheduled";
    }
  };

  const statusLabels: Record<string, string> = {
    scheduled: "Agendado",
    confirmed: "Confirmado",
    "in-progress": "Em Atendimento",
    completed: "Concluído",
    cancelled: "Cancelado",
    "no-show": "Não Compareceu",
  };

  const handleSlotClick = (date: string, time: string) => {
    const appointments = getAppointmentsForSlot(date, time);
    if (appointments.length === 0) {
      setSelectedSlot({ date, time });
      setNewAppointment({ ...newAppointment, date, time });
      setShowNewAppointment(true);
    }
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  const navigateDate = (direction: number) => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + direction);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Agenda</h1>
            <p className="text-muted-foreground">
              Gerencie consultas e horários
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todos os médicos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os médicos</SelectItem>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setShowNewAppointment(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Consulta
            </Button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="health-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => navigateDate(-1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>
                Hoje
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDate(1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <h2 className="text-lg font-semibold">
                {view === "day" && currentDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                {view === "week" && `${weekDays[0].toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} - ${weekDays[6].toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}`}
                {view === "month" && currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={view === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("day")}
              >
                Dia
              </Button>
              <Button
                variant={view === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("week")}
              >
                Semana
              </Button>
              <Button
                variant={view === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("month")}
              >
                Mês
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="health-card p-0 overflow-hidden">
          {view === "week" && (
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                {/* Header */}
                <div className="grid grid-cols-8 border-b border-border">
                  <div className="p-3 text-center text-sm font-medium text-muted-foreground">
                    Horário
                  </div>
                  {weekDays.map((day, i) => (
                    <div
                      key={i}
                      className={cn(
                        "p-3 text-center border-l border-border",
                        isToday(day) && "bg-primary/5"
                      )}
                    >
                      <p className="text-xs text-muted-foreground uppercase">
                        {day.toLocaleDateString("pt-BR", { weekday: "short" })}
                      </p>
                      <p className={cn(
                        "text-lg font-semibold mt-1",
                        isToday(day) && "text-primary"
                      )}>
                        {day.getDate()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="divide-y divide-border">
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 min-h-[60px]">
                      <div className="p-2 text-sm text-muted-foreground text-center border-r border-border flex items-start justify-center pt-3">
                        {time}
                      </div>
                      {weekDays.map((day, i) => {
                        const dateStr = formatDate(day);
                        const appointments = getAppointmentsForSlot(dateStr, time);
                        return (
                          <div
                            key={i}
                            className={cn(
                              "p-1 border-l border-border hover:bg-muted/30 cursor-pointer transition-colors relative",
                              isToday(day) && "bg-primary/5"
                            )}
                            onClick={() => handleSlotClick(dateStr, time)}
                          >
                            {appointments.map((apt) => (
                              <div
                                key={apt.id}
                                className={cn(
                                  "p-2 rounded-lg text-xs mb-1 cursor-pointer hover:opacity-80 transition-opacity",
                                  getAppointmentColor(apt.status)
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAppointmentClick(apt);
                                }}
                              >
                                <p className="font-medium truncate">{apt.patient}</p>
                                <p className="text-muted-foreground truncate">{apt.type}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "day" && (
            <div>
              {/* Day Header */}
              <div className="p-4 border-b border-border bg-muted/30">
                <h3 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                </h3>
              </div>

              {/* Time Slots */}
              <div className="divide-y divide-border">
                {timeSlots.map((time) => {
                  const dateStr = formatDate(currentDate);
                  const appointments = getAppointmentsForSlot(dateStr, time);
                  return (
                    <div
                      key={time}
                      className="flex min-h-[80px] hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => handleSlotClick(dateStr, time)}
                    >
                      <div className="w-20 p-3 text-sm text-muted-foreground border-r border-border flex-shrink-0">
                        {time}
                      </div>
                      <div className="flex-1 p-2">
                        {appointments.map((apt) => (
                          <div
                            key={apt.id}
                            className={cn(
                              "p-3 rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity",
                              getAppointmentColor(apt.status)
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(apt);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{apt.patient}</p>
                                <p className="text-sm text-muted-foreground">
                                  {apt.type} • {apt.duration} min
                                </p>
                              </div>
                              <span className={cn("status-pill", `status-${apt.status}`)}>
                                {statusLabels[apt.status]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "month" && (
            <div className="p-4">
              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {(() => {
                  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                  const startPadding = firstDay.getDay();
                  const days = [];

                  for (let i = 0; i < startPadding; i++) {
                    days.push(<div key={`pad-${i}`} className="p-2" />);
                  }

                  for (let i = 1; i <= lastDay.getDate(); i++) {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                    const dateStr = formatDate(date);
                    const dayAppointments = mockAppointments.filter((apt) => apt.date === dateStr);
                    const isTodayDate = isToday(date);

                    days.push(
                      <div
                        key={i}
                        className={cn(
                          "p-2 min-h-[100px] border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors",
                          isTodayDate && "ring-2 ring-primary"
                        )}
                        onClick={() => {
                          setCurrentDate(date);
                          setView("day");
                        }}
                      >
                        <p className={cn(
                          "text-sm font-medium mb-1",
                          isTodayDate && "text-primary"
                        )}>
                          {i}
                        </p>
                        {dayAppointments.slice(0, 3).map((apt) => (
                          <div
                            key={apt.id}
                            className="text-xs p-1 rounded bg-primary/10 text-primary mb-1 truncate"
                          >
                            {apt.time} {apt.patient.split(" ")[0]}
                          </div>
                        ))}
                        {dayAppointments.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{dayAppointments.length - 3} mais
                          </p>
                        )}
                      </div>
                    );
                  }

                  return days;
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-scheduled" />
            <span className="text-sm">Agendado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-confirmed" />
            <span className="text-sm">Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-in-progress" />
            <span className="text-sm">Em Atendimento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-completed" />
            <span className="text-sm">Concluído</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-cancelled" />
            <span className="text-sm">Cancelado</span>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Consulta</DialogTitle>
            <DialogDescription>
              Agendar nova consulta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Paciente</Label>
              <Select value={newAppointment.patient} onValueChange={(value) => setNewAppointment({ ...newAppointment, patient: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maria Silva Santos">Maria Silva Santos</SelectItem>
                  <SelectItem value="João Carlos Oliveira">João Carlos Oliveira</SelectItem>
                  <SelectItem value="Ana Paula Costa">Ana Paula Costa</SelectItem>
                  <SelectItem value="Pedro Henrique Lima">Pedro Henrique Lima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Médico</Label>
              <Select value={newAppointment.doctor} onValueChange={(value) => setNewAppointment({ ...newAppointment, doctor: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o médico" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Horário</Label>
                <Select value={newAppointment.time} onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duração</Label>
                <Select value={newAppointment.duration} onValueChange={(value) => setNewAppointment({ ...newAppointment, duration: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="90">1h 30min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo</Label>
                <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Consulta de Rotina</SelectItem>
                    <SelectItem value="return">Retorno</SelectItem>
                    <SelectItem value="first">Primeira Consulta</SelectItem>
                    <SelectItem value="exam">Exame</SelectItem>
                    <SelectItem value="emergency">Urgência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Observações</Label>
              <textarea
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                placeholder="Observações sobre a consulta"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewAppointment(false)}>
              Cancelar
            </Button>
            <Button>Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointment Details Modal */}
      <Dialog open={showAppointmentDetails} onOpenChange={setShowAppointmentDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Consulta</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">
                    {selectedAppointment.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-lg">{selectedAppointment.patient}</p>
                  <p className="text-muted-foreground">{selectedAppointment.patientPhone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{new Date(selectedAppointment.date).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horário</p>
                  <p className="font-medium">{selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Médico</p>
                  <p className="font-medium">{selectedAppointment.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">{selectedAppointment.type}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <span className={cn("status-pill", `status-${selectedAppointment.status}`)}>
                  {statusLabels[selectedAppointment.status]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Iniciar Atendimento
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAppointmentDetails(false)}>
              Fechar
            </Button>
            <Button>Ver Prontuário</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Agenda;
