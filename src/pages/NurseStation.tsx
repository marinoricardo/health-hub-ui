import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Activity,
  Heart,
  Thermometer,
  Scale,
  Ruler,
  Droplets,
  Wind,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MoreHorizontal,
  FileText,
  Syringe,
  Pill,
  Stethoscope,
  ClipboardList,
  ArrowRight,
  Users,
  Calendar,
  Timer,
  Plus,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock patients waiting for triage
const triageQueue = [
  {
    id: "1",
    name: "Maria Silva",
    age: 45,
    gender: "F",
    arrivalTime: "08:30",
    waitTime: "25 min",
    priority: "pending",
    complaint: "Dor no peito",
    doctor: "Dr. João Santos",
  },
  {
    id: "2",
    name: "António Costa",
    age: 62,
    gender: "M",
    arrivalTime: "08:45",
    waitTime: "10 min",
    priority: "urgent",
    complaint: "Falta de ar",
    doctor: "Dra. Ana Oliveira",
  },
  {
    id: "3",
    name: "Rosa Fernandes",
    age: 28,
    gender: "F",
    arrivalTime: "09:00",
    waitTime: "5 min",
    priority: "normal",
    complaint: "Consulta de rotina",
    doctor: "Dr. Pedro Lima",
  },
];

// Mock patients in care
const patientsInCare = [
  {
    id: "4",
    name: "Carlos Mendes",
    age: 55,
    room: "Consultório 1",
    doctor: "Dr. João Santos",
    status: "in-consultation",
    startTime: "08:45",
    vitals: {
      bp: "140/90",
      hr: 78,
      temp: 36.8,
      spo2: 98,
    },
    notes: "Hipertensão controlada",
  },
  {
    id: "5",
    name: "Ana Beatriz",
    age: 32,
    room: "Consultório 2",
    doctor: "Dra. Ana Oliveira",
    status: "waiting-results",
    startTime: "09:00",
    vitals: {
      bp: "120/80",
      hr: 72,
      temp: 37.2,
      spo2: 99,
    },
    notes: "Aguarda resultado de exames",
  },
  {
    id: "6",
    name: "José Manuel",
    age: 48,
    room: "Sala de Procedimentos",
    doctor: "Dr. Pedro Lima",
    status: "procedure",
    startTime: "09:15",
    vitals: {
      bp: "130/85",
      hr: 82,
      temp: 36.5,
      spo2: 97,
    },
    notes: "Curativos",
  },
];

// Mock pending tasks
const pendingTasks = [
  {
    id: "1",
    patient: "Carlos Mendes",
    task: "Administrar medicação",
    medication: "Losartana 50mg",
    time: "09:30",
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    patient: "Ana Beatriz",
    task: "Coleta de sangue",
    time: "09:45",
    status: "pending",
    priority: "normal",
  },
  {
    id: "3",
    patient: "José Manuel",
    task: "Troca de curativo",
    time: "10:00",
    status: "pending",
    priority: "normal",
  },
  {
    id: "4",
    patient: "Maria Silva",
    task: "Verificar sinais vitais",
    time: "10:15",
    status: "pending",
    priority: "normal",
  },
];

const NurseStation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("triage");

  const [vitals, setVitals] = useState({
    systolic: "",
    diastolic: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",
    spo2: "",
    respiratoryRate: "",
    glucose: "",
  });

  const stats = [
    {
      label: "Triagem Pendente",
      value: "3",
      icon: ClipboardList,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Em Atendimento",
      value: "3",
      icon: Stethoscope,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Tarefas Pendentes",
      value: "4",
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Alertas",
      value: "1",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  const handleStartTriage = (patient: any) => {
    setSelectedPatient(patient);
    setShowTriageModal(true);
  };

  const handleRecordVitals = (patient: any) => {
    setSelectedPatient(patient);
    setShowVitalsModal(true);
  };

  const handleSaveTriage = () => {
    toast({
      title: "Triagem concluída",
      description: `Triagem de ${selectedPatient?.name} registada com sucesso.`,
    });
    setShowTriageModal(false);
    setSelectedPatient(null);
    setVitals({
      systolic: "",
      diastolic: "",
      heartRate: "",
      temperature: "",
      weight: "",
      height: "",
      spo2: "",
      respiratoryRate: "",
      glucose: "",
    });
  };

  const handleSaveVitals = () => {
    toast({
      title: "Sinais vitais registados",
      description: `Sinais vitais de ${selectedPatient?.name} actualizados.`,
    });
    setShowVitalsModal(false);
    setSelectedPatient(null);
  };

  const handleCompleteTask = (task: any) => {
    toast({
      title: "Tarefa concluída",
      description: `${task.task} para ${task.patient} foi concluída.`,
    });
  };

  const priorityColors: Record<string, string> = {
    pending: "bg-slate-500/10 text-slate-500",
    normal: "bg-green-500/10 text-green-500",
    urgent: "bg-red-500/10 text-red-500",
    high: "bg-amber-500/10 text-amber-500",
  };

  const priorityLabels: Record<string, string> = {
    pending: "Aguarda Triagem",
    normal: "Normal",
    urgent: "Urgente",
    high: "Alta",
  };

  const statusColors: Record<string, string> = {
    "in-consultation": "bg-blue-500/10 text-blue-500",
    "waiting-results": "bg-amber-500/10 text-amber-500",
    procedure: "bg-purple-500/10 text-purple-500",
  };

  const statusLabels: Record<string, string> = {
    "in-consultation": "Em Consulta",
    "waiting-results": "Aguarda Resultados",
    procedure: "Procedimento",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Posto de Enfermagem
            </h1>
            <p className="text-muted-foreground">
              Triagem, sinais vitais e cuidados aos pacientes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/reception">
                <Users className="w-4 h-4 mr-2" />
                Ver Recepção
              </Link>
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
                placeholder="Pesquisar paciente..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="triage" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Triagem
            </TabsTrigger>
            <TabsTrigger value="care" className="gap-2">
              <Stethoscope className="w-4 h-4" />
              Em Atendimento
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2">
              <Clock className="w-4 h-4" />
              Tarefas
            </TabsTrigger>
          </TabsList>

          {/* Triage Tab */}
          <TabsContent value="triage" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Fila de Triagem
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Chegada</TableHead>
                      <TableHead>Espera</TableHead>
                      <TableHead>Queixa</TableHead>
                      <TableHead>Médico</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {triageQueue.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{patient.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {patient.age} anos • {patient.gender}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {patient.arrivalTime}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            <Timer className="w-3 h-3" />
                            {patient.waitTime}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm max-w-[150px] truncate">
                          {patient.complaint}
                        </TableCell>
                        <TableCell className="text-sm">{patient.doctor}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={priorityColors[patient.priority]}
                          >
                            {priorityLabels[patient.priority]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => handleStartTriage(patient)}
                          >
                            <Activity className="w-4 h-4 mr-1" />
                            Iniciar Triagem
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* In Care Tab */}
          <TabsContent value="care" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {patientsInCare.map((patient) => (
                <Card key={patient.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{patient.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {patient.age} anos • {patient.room}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleRecordVitals(patient)}
                          >
                            <Activity className="w-4 h-4 mr-2" />
                            Registar Sinais Vitais
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pill className="w-4 h-4 mr-2" />
                            Administrar Medicação
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Ver Ficha
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-muted-foreground">
                        {patient.doctor}
                      </p>
                      <Badge
                        variant="outline"
                        className={statusColors[patient.status]}
                      >
                        {statusLabels[patient.status]}
                      </Badge>
                    </div>
                    
                    {/* Vitals Grid */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-lg mb-3">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">PA</p>
                          <p className="text-sm font-medium">{patient.vitals.bp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">FC</p>
                          <p className="text-sm font-medium">{patient.vitals.hr} bpm</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-amber-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Temp</p>
                          <p className="text-sm font-medium">{patient.vitals.temp}°C</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-cyan-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">SpO2</p>
                          <p className="text-sm font-medium">{patient.vitals.spo2}%</p>
                        </div>
                      </div>
                    </div>

                    {patient.notes && (
                      <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                        {patient.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Tarefas Pendentes
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Nova Tarefa
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Tarefa</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">
                          {task.patient}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{task.task}</p>
                            {task.medication && (
                              <p className="text-xs text-muted-foreground">
                                {task.medication}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            <Clock className="w-3 h-3" />
                            {task.time}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={priorityColors[task.priority]}
                          >
                            {priorityLabels[task.priority]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCompleteTask(task)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Concluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Triage Modal */}
      <Dialog open={showTriageModal} onOpenChange={setShowTriageModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Triagem - {selectedPatient?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Patient Info */}
            <Card className="bg-muted/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedPatient?.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedPatient?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPatient?.age} anos • {selectedPatient?.gender} •{" "}
                        {selectedPatient?.doctor}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Queixa:</p>
                    <p className="text-sm font-medium">
                      {selectedPatient?.complaint}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vitals Form */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Pressão Arterial (mmHg)
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Sistólica"
                    value={vitals.systolic}
                    onChange={(e) =>
                      setVitals({ ...vitals, systolic: e.target.value })
                    }
                  />
                  <span className="flex items-center">/</span>
                  <Input
                    placeholder="Diastólica"
                    value={vitals.diastolic}
                    onChange={(e) =>
                      setVitals({ ...vitals, diastolic: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Frequência Cardíaca (bpm)
                </Label>
                <Input
                  placeholder="Ex: 72"
                  value={vitals.heartRate}
                  onChange={(e) =>
                    setVitals({ ...vitals, heartRate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-500" />
                  Temperatura (°C)
                </Label>
                <Input
                  placeholder="Ex: 36.5"
                  value={vitals.temperature}
                  onChange={(e) =>
                    setVitals({ ...vitals, temperature: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-green-500" />
                  Peso (kg)
                </Label>
                <Input
                  placeholder="Ex: 70"
                  value={vitals.weight}
                  onChange={(e) =>
                    setVitals({ ...vitals, weight: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-purple-500" />
                  Altura (cm)
                </Label>
                <Input
                  placeholder="Ex: 170"
                  value={vitals.height}
                  onChange={(e) =>
                    setVitals({ ...vitals, height: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-500" />
                  SpO2 (%)
                </Label>
                <Input
                  placeholder="Ex: 98"
                  value={vitals.spo2}
                  onChange={(e) =>
                    setVitals({ ...vitals, spo2: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-teal-500" />
                  Freq. Respiratória (rpm)
                </Label>
                <Input
                  placeholder="Ex: 16"
                  value={vitals.respiratoryRate}
                  onChange={(e) =>
                    setVitals({ ...vitals, respiratoryRate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-rose-500" />
                  Glicemia (mg/dL)
                </Label>
                <Input
                  placeholder="Ex: 95"
                  value={vitals.glucose}
                  onChange={(e) =>
                    setVitals({ ...vitals, glucose: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Normal
                      </span>
                    </SelectItem>
                    <SelectItem value="priority">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Prioritário
                      </span>
                    </SelectItem>
                    <SelectItem value="urgent">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Urgente
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações da Triagem</Label>
              <Textarea
                placeholder="Observações adicionais, sintomas, histórico relevante..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTriageModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTriage}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Concluir Triagem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Record Vitals Modal */}
      <Dialog open={showVitalsModal} onOpenChange={setShowVitalsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Registar Sinais Vitais - {selectedPatient?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Pressão Arterial (mmHg)
                </Label>
                <div className="flex gap-2">
                  <Input placeholder="Sistólica" />
                  <span className="flex items-center">/</span>
                  <Input placeholder="Diastólica" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Frequência Cardíaca (bpm)
                </Label>
                <Input placeholder="Ex: 72" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-500" />
                  Temperatura (°C)
                </Label>
                <Input placeholder="Ex: 36.5" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-500" />
                  SpO2 (%)
                </Label>
                <Input placeholder="Ex: 98" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea placeholder="Observações adicionais..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVitalsModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveVitals}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default NurseStation;
