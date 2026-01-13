import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  UserPlus,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  ArrowRight,
  ClipboardList,
  Stethoscope,
  Timer,
  UserCheck,
  Bell,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock waiting room data
const waitingPatients = [
  {
    id: "1",
    name: "Maria Silva",
    avatar: "",
    arrivalTime: "08:30",
    appointmentTime: "09:00",
    doctor: "Dr. João Santos",
    specialty: "Clínica Geral",
    status: "waiting",
    waitTime: "25 min",
    priority: "normal",
  },
  {
    id: "2",
    name: "António Costa",
    avatar: "",
    arrivalTime: "08:45",
    appointmentTime: "09:15",
    doctor: "Dra. Ana Oliveira",
    specialty: "Cardiologia",
    status: "called",
    waitTime: "10 min",
    priority: "urgent",
  },
  {
    id: "3",
    name: "Rosa Fernandes",
    avatar: "",
    arrivalTime: "09:00",
    appointmentTime: "09:30",
    doctor: "Dr. Pedro Lima",
    specialty: "Pediatria",
    status: "waiting",
    waitTime: "5 min",
    priority: "normal",
  },
  {
    id: "4",
    name: "Carlos Mendes",
    avatar: "",
    arrivalTime: "09:10",
    appointmentTime: "09:45",
    doctor: "Dr. João Santos",
    specialty: "Clínica Geral",
    status: "waiting",
    waitTime: "2 min",
    priority: "follow-up",
  },
];

// Mock today's appointments
const todayAppointments = [
  {
    id: "1",
    time: "09:00",
    patient: "Maria Silva",
    doctor: "Dr. João Santos",
    type: "Consulta",
    status: "confirmed",
    phone: "+258 84 123 4567",
  },
  {
    id: "2",
    time: "09:15",
    patient: "António Costa",
    doctor: "Dra. Ana Oliveira",
    type: "Retorno",
    status: "confirmed",
    phone: "+258 84 234 5678",
  },
  {
    id: "3",
    time: "09:30",
    patient: "Rosa Fernandes",
    doctor: "Dr. Pedro Lima",
    type: "Consulta",
    status: "pending",
    phone: "+258 84 345 6789",
  },
  {
    id: "4",
    time: "09:45",
    patient: "Carlos Mendes",
    doctor: "Dr. João Santos",
    type: "Exame",
    status: "confirmed",
    phone: "+258 84 456 7890",
  },
  {
    id: "5",
    time: "10:00",
    patient: "Ana Beatriz",
    doctor: "Dra. Ana Oliveira",
    type: "Consulta",
    status: "cancelled",
    phone: "+258 84 567 8901",
  },
  {
    id: "6",
    time: "10:15",
    patient: "José Manuel",
    doctor: "Dr. João Santos",
    type: "Urgência",
    status: "pending",
    phone: "+258 84 678 9012",
  },
  {
    id: "7",
    time: "10:30",
    patient: "Luísa Pereira",
    doctor: "Dr. Pedro Lima",
    type: "Consulta",
    status: "confirmed",
    phone: "+258 84 789 0123",
  },
  {
    id: "8",
    time: "10:45",
    patient: "Miguel Santos",
    doctor: "Dra. Ana Oliveira",
    type: "Retorno",
    status: "confirmed",
    phone: "+258 84 890 1234",
  },
];

// Mock search results
const searchResults = [
  {
    id: "1",
    name: "Maria Silva",
    nuit: "123456789",
    phone: "+258 84 123 4567",
    email: "maria.silva@email.com",
    birthDate: "15/03/1985",
    lastVisit: "10/01/2026",
  },
  {
    id: "2",
    name: "Maria Santos",
    nuit: "987654321",
    phone: "+258 84 987 6543",
    email: "maria.santos@email.com",
    birthDate: "22/07/1990",
    lastVisit: "05/01/2026",
  },
  {
    id: "3",
    name: "Mariana Costa",
    nuit: "456789123",
    phone: "+258 84 456 7891",
    email: "mariana.costa@email.com",
    birthDate: "08/11/1978",
    lastVisit: "12/01/2026",
  },
];

const Reception = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("waiting");

  const stats = [
    {
      label: "Na Sala de Espera",
      value: "4",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Consultas Hoje",
      value: "24",
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Confirmadas",
      value: "18",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Pendentes",
      value: "6",
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length >= 2) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setShowSearch(false);
    setShowSchedule(true);
  };

  const handleCheckIn = (patient: any) => {
    setSelectedPatient(patient);
    setShowCheckIn(true);
  };

  const handleConfirmCheckIn = () => {
    toast({
      title: "Check-in realizado",
      description: `${selectedPatient?.patient || selectedPatient?.name} foi adicionado à sala de espera.`,
    });
    setShowCheckIn(false);
    setSelectedPatient(null);
  };

  const handleCallPatient = (patient: any) => {
    toast({
      title: "Paciente chamado",
      description: `${patient.name} foi chamado para o consultório.`,
    });
  };

  const handleCancelAppointment = (appointment: any) => {
    toast({
      title: "Consulta cancelada",
      description: `A consulta de ${appointment.patient} foi cancelada.`,
    });
  };

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    waiting: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    called: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  const statusLabels: Record<string, string> = {
    confirmed: "Confirmada",
    pending: "Pendente",
    cancelled: "Cancelada",
    waiting: "Aguardando",
    called: "Chamado",
  };

  const priorityColors: Record<string, string> = {
    normal: "bg-slate-500/10 text-slate-500",
    urgent: "bg-red-500/10 text-red-500",
    "follow-up": "bg-blue-500/10 text-blue-500",
  };

  const priorityLabels: Record<string, string> = {
    normal: "Normal",
    urgent: "Urgente",
    "follow-up": "Retorno",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Recepção</h1>
            <p className="text-muted-foreground">
              Gestão de consultas, check-in e sala de espera
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNewPatient(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
            <Button onClick={() => setShowSchedule(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar paciente por nome, NUIT ou telefone..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              
              {/* Search Results Dropdown */}
              {showSearch && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
                  <CardContent className="p-2">
                    <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
                      {searchResults.length} resultados encontrados
                    </div>
                    {searchResults.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer"
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>
                              {patient.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">
                              NUIT: {patient.nuit} • {patient.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPatient(patient);
                            }}
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            Agendar
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatient(patient);
                              setShowCheckIn(true);
                              setShowSearch(false);
                            }}
                          >
                            <UserCheck className="w-3 h-3 mr-1" />
                            Check-in
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t mt-2 pt-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-primary"
                        onClick={() => {
                          setShowSearch(false);
                          setShowNewPatient(true);
                        }}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Criar novo paciente "{searchTerm}"
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Waiting Room */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Sala de Espera
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 p-4 pt-0">
                  {waitingPatients.map((patient) => (
                    <Card
                      key={patient.id}
                      className={`${
                        patient.status === "called"
                          ? "border-purple-500/50 bg-purple-500/5"
                          : ""
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {patient.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{patient.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {patient.doctor}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={priorityColors[patient.priority]}
                          >
                            {priorityLabels[patient.priority]}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Chegou: {patient.arrivalTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            Espera: {patient.waitTime}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {patient.status === "waiting" ? (
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => handleCallPatient(patient)}
                            >
                              <Bell className="w-3 h-3 mr-1" />
                              Chamar
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full border-purple-500 text-purple-500"
                            >
                              <Stethoscope className="w-3 h-3 mr-1" />
                              Em Atendimento
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Consultas de Hoje
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/agenda">
                      Ver Agenda Completa
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Hora</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Médico</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {appointment.time}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs">
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {appointment.patient}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {appointment.phone}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {appointment.doctor}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusColors[appointment.status]}
                          >
                            {statusLabels[appointment.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {appointment.status !== "cancelled" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => handleCheckIn(appointment)}
                                  >
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Check-in
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Ligar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Enviar SMS
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Reagendar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={() =>
                                      handleCancelAppointment(appointment)
                                    }
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancelar
                                  </DropdownMenuItem>
                                </>
                              )}
                              {appointment.status === "cancelled" && (
                                <DropdownMenuItem>
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Reativar
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => setShowNewPatient(true)}
              >
                <UserPlus className="w-5 h-5" />
                <span>Novo Paciente</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => setShowSchedule(true)}
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar Consulta</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/patients">
                  <ClipboardList className="w-5 h-5" />
                  <span>Lista de Pacientes</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/agenda">
                  <Clock className="w-5 h-5" />
                  <span>Ver Agenda</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Patient Modal */}
      <Dialog open={showNewPatient} onOpenChange={setShowNewPatient}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Paciente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input id="name" placeholder="Nome do paciente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nuit">NUIT</Label>
                <Input id="nuit" placeholder="Número de identificação" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input id="phone" placeholder="+258 84 000 0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <Input id="birthDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Feminino</SelectItem>
                    <SelectItem value="O">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="province">Província</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maputo-cidade">Maputo Cidade</SelectItem>
                    <SelectItem value="maputo">Maputo Província</SelectItem>
                    <SelectItem value="gaza">Gaza</SelectItem>
                    <SelectItem value="inhambane">Inhambane</SelectItem>
                    <SelectItem value="sofala">Sofala</SelectItem>
                    <SelectItem value="manica">Manica</SelectItem>
                    <SelectItem value="tete">Tete</SelectItem>
                    <SelectItem value="zambezia">Zambézia</SelectItem>
                    <SelectItem value="nampula">Nampula</SelectItem>
                    <SelectItem value="cabo-delgado">Cabo Delgado</SelectItem>
                    <SelectItem value="niassa">Niassa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Morada completa" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Alergias, condições especiais, etc."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPatient(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Paciente criado",
                  description: "O paciente foi registado com sucesso.",
                });
                setShowNewPatient(false);
              }}
            >
              Criar Paciente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Modal */}
      <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Agendar Consulta</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedPatient ? (
              <Card className="bg-muted/50">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {selectedPatient.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedPatient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedPatient.phone}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPatient(null)}
                    >
                      Alterar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                <Label>Paciente *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar paciente..."
                    className="pl-10"
                  />
                </div>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="doctor">Médico *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar médico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">Dr. João Santos</SelectItem>
                    <SelectItem value="ana">Dra. Ana Oliveira</SelectItem>
                    <SelectItem value="pedro">Dr. Pedro Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Clínica Geral</SelectItem>
                    <SelectItem value="cardio">Cardiologia</SelectItem>
                    <SelectItem value="pediatria">Pediatria</SelectItem>
                    <SelectItem value="ortopedia">Ortopedia</SelectItem>
                    <SelectItem value="dermatologia">Dermatologia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Data *</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="09:30">09:30</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="10:30">10:30</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="11:30">11:30</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="14:30">14:30</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="15:30">15:30</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="16:30">16:30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Consulta</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="exame">Exame</SelectItem>
                    <SelectItem value="urgencia">Urgência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duração</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da Consulta</Label>
              <Textarea
                id="reason"
                placeholder="Descreva o motivo da consulta"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSchedule(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Consulta agendada",
                  description: "A consulta foi agendada com sucesso.",
                });
                setShowSchedule(false);
                setSelectedPatient(null);
              }}
            >
              Agendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check-in Modal */}
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check-in do Paciente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedPatient && (
              <Card className="bg-muted/50 mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {(selectedPatient.patient || selectedPatient.name)
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {selectedPatient.patient || selectedPatient.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPatient.doctor || "Médico não atribuído"}
                      </p>
                      {selectedPatient.time && (
                        <p className="text-sm text-muted-foreground">
                          Consulta às {selectedPatient.time}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                    <SelectItem value="follow-up">Retorno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea
                  placeholder="Observações do check-in..."
                  rows={2}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCheckIn(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmCheckIn}>
              <UserCheck className="w-4 h-4 mr-2" />
              Confirmar Check-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Reception;
