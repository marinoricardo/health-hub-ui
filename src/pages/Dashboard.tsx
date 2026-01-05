import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  ChevronRight,
  Activity,
  Stethoscope,
  FileText,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  { 
    label: "Consultas Hoje", 
    value: "24", 
    change: "+3 vs ontem",
    trend: "up",
    icon: Calendar,
    color: "primary"
  },
  { 
    label: "Pacientes Ativos", 
    value: "1.847", 
    change: "+12% este mês",
    trend: "up",
    icon: Users,
    color: "secondary"
  },
  { 
    label: "Alertas Clínicos", 
    value: "5", 
    change: "Requer atenção",
    trend: "alert",
    icon: AlertTriangle,
    color: "warning"
  },
  { 
    label: "Taxa de Ocupação", 
    value: "87%", 
    change: "+5% vs semana passada",
    trend: "up",
    icon: TrendingUp,
    color: "success"
  },
];

const upcomingAppointments = [
  { 
    id: 1, 
    patient: "Maria Silva Santos", 
    time: "09:00", 
    type: "Consulta de Rotina", 
    status: "confirmed",
    avatar: "MS"
  },
  { 
    id: 2, 
    patient: "João Carlos Oliveira", 
    time: "09:30", 
    type: "Retorno Cardiológico", 
    status: "in-progress",
    avatar: "JO"
  },
  { 
    id: 3, 
    patient: "Ana Paula Costa", 
    time: "10:00", 
    type: "Exame de Rotina", 
    status: "scheduled",
    avatar: "AC"
  },
  { 
    id: 4, 
    patient: "Pedro Henrique Lima", 
    time: "10:30", 
    type: "Primeira Consulta", 
    status: "scheduled",
    avatar: "PL"
  },
  { 
    id: 5, 
    patient: "Fernanda Rocha", 
    time: "11:00", 
    type: "Acompanhamento", 
    status: "scheduled",
    avatar: "FR"
  },
];

const recentPatients = [
  { name: "Carlos Eduardo", lastVisit: "Hoje, 08:30", condition: "Hipertensão", alert: true },
  { name: "Mariana Souza", lastVisit: "Ontem, 16:00", condition: "Diabetes Tipo 2", alert: false },
  { name: "Roberto Alves", lastVisit: "22/01/2025", condition: "Colesterol Alto", alert: false },
  { name: "Juliana Mendes", lastVisit: "20/01/2025", condition: "Asma", alert: true },
];

const Dashboard = () => {
  const statusLabels: Record<string, string> = {
    confirmed: "Confirmado",
    "in-progress": "Em Atendimento",
    scheduled: "Agendado",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Bom dia, Dr. João</h1>
            <p className="text-muted-foreground">
              Terça-feira, 28 de Janeiro de 2025
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Relatório
            </Button>
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="health-card group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <button className="p-1 rounded-lg hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-xs mt-2 ${
                stat.trend === "up" ? "text-success" : 
                stat.trend === "alert" ? "text-warning" : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div className="lg:col-span-2 health-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Próximas Consultas</h2>
                <p className="text-sm text-muted-foreground">Hoje, 28 de Janeiro</p>
              </div>
              <Button variant="ghost" size="sm">
                Ver Agenda
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div 
                  key={apt.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  {/* Time */}
                  <div className="text-center min-w-[60px]">
                    <p className="text-lg font-semibold">{apt.time}</p>
                  </div>

                  {/* Divider */}
                  <div className={`w-1 h-12 rounded-full ${
                    apt.status === "in-progress" ? "bg-status-in-progress" :
                    apt.status === "confirmed" ? "bg-status-confirmed" : "bg-status-scheduled"
                  }`} />

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-white">{apt.avatar}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{apt.patient}</p>
                        <p className="text-sm text-muted-foreground truncate">{apt.type}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3">
                    <span className={`status-pill status-${apt.status}`}>
                      {statusLabels[apt.status]}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon-sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Plan Usage */}
            <div className="health-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Uso do Plano</h3>
                <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
                  Professional
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Pacientes</span>
                    <span className="font-medium">1.847 / 3.000</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Profissionais</span>
                    <span className="font-medium">7 / 10</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Armazenamento</span>
                    <span className="font-medium">12.4 GB / 50 GB</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-4">
                Fazer Upgrade
              </Button>
            </div>

            {/* Recent Patients */}
            <div className="health-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Pacientes Recentes</h3>
                <Button variant="ghost" size="sm">
                  Ver Todos
                </Button>
              </div>

              <div className="space-y-3">
                {recentPatients.map((patient, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{patient.name}</p>
                        {patient.alert && (
                          <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {patient.condition} • {patient.lastVisit}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="health-card bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="font-semibold mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="clinic" size="sm" className="h-auto py-3 flex-col gap-2">
                  <Stethoscope className="w-5 h-5" />
                  <span className="text-xs">Nova Consulta</span>
                </Button>
                <Button variant="clinic" size="sm" className="h-auto py-3 flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Novo Paciente</span>
                </Button>
                <Button variant="clinic" size="sm" className="h-auto py-3 flex-col gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs">Prescrição</span>
                </Button>
                <Button variant="clinic" size="sm" className="h-auto py-3 flex-col gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-xs">Agendar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
