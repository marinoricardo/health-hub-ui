import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertTriangle,
  Heart,
  Activity,
  FileText,
  Pill,
  TestTube,
  Paperclip,
  StickyNote,
  Plus,
  Download,
  Edit,
  Printer,
  Share2,
  Clock,
  Stethoscope,
  ChevronRight,
  Upload,
  X,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock patient data
const patientData = {
  id: "1",
  name: "Maria Fernanda Macuácua",
  email: "maria.macuacua@email.co.mz",
  phone: "+258 84 123 4567",
  birthDate: "15/05/1985",
  age: 39,
  gender: "Feminino",
  nuit: "100123456",
  bloodType: "A+",
  address: "Av. Eduardo Mondlane, 123, Flat 4",
  city: "Maputo",
  province: "Maputo Cidade",
  postalCode: "1100",
  emergencyContact: "João Macuácua",
  emergencyPhone: "+258 82 234 5678",
  photo: null,
  allergies: ["Penicilina", "Dipirona"],
  conditions: ["Hipertensão", "Diabetes Tipo 2"],
  medications: [
    { name: "Losartana 50mg", dosage: "1x ao dia", since: "2020" },
    { name: "Metformina 850mg", dosage: "2x ao dia", since: "2019" },
  ],
  vitals: {
    bloodPressure: "130/85 mmHg",
    heartRate: "72 bpm",
    temperature: "36.5°C",
    weight: "68 kg",
    height: "1.65 m",
    bmi: "25.0",
    lastUpdate: "28/01/2025 09:30",
  },
};

const consultations = [
  {
    id: "1",
    date: "28/01/2025",
    time: "09:00",
    doctor: "Dr. António Machava",
    specialty: "Cardiologia",
    type: "Consulta de Rotina",
    status: "completed",
    notes: "Paciente apresenta pressão controlada. Manter medicação actual. Retorno em 3 meses.",
    diagnosis: "Hipertensão controlada",
    prescriptions: ["Losartana 50mg - manter"],
  },
  {
    id: "2",
    date: "15/12/2024",
    time: "14:30",
    doctor: "Dra. Ana Cumbe",
    specialty: "Clínica Geral",
    type: "Retorno",
    status: "completed",
    notes: "Acompanhamento de diabetes. Glicemia em jejum: 110 mg/dL. Ajustar dieta.",
    diagnosis: "Diabetes Tipo 2 - acompanhamento",
    prescriptions: ["Metformina 850mg - manter"],
  },
  {
    id: "3",
    date: "10/10/2024",
    time: "10:00",
    doctor: "Dr. António Machava",
    specialty: "Cardiologia",
    type: "Exame",
    status: "completed",
    notes: "Realizado ECG. Resultado normal.",
    diagnosis: "Avaliação cardíaca preventiva",
    prescriptions: [],
  },
];

const exams = [
  {
    id: "1",
    name: "Hemograma Completo",
    date: "20/01/2025",
    doctor: "Dra. Ana Cumbe",
    status: "completed",
    result: "Normal",
    file: "hemograma_20012025.pdf",
  },
  {
    id: "2",
    name: "Glicemia em Jejum",
    date: "20/01/2025",
    doctor: "Dra. Ana Cumbe",
    status: "completed",
    result: "110 mg/dL",
    file: "glicemia_20012025.pdf",
  },
  {
    id: "3",
    name: "Electrocardiograma",
    date: "10/10/2024",
    doctor: "Dr. António Machava",
    status: "completed",
    result: "Normal",
    file: "ecg_10102024.pdf",
  },
  {
    id: "4",
    name: "Ecocardiograma",
    date: "05/02/2025",
    doctor: "Dr. António Machava",
    status: "scheduled",
    result: null,
    file: null,
  },
];

const prescriptions = [
  {
    id: "1",
    date: "28/01/2025",
    doctor: "Dr. António Machava",
    medications: [
      { name: "Losartana 50mg", dosage: "1 comprimido pela manhã", duration: "Uso contínuo" },
    ],
    valid: true,
  },
  {
    id: "2",
    date: "15/12/2024",
    doctor: "Dra. Ana Cumbe",
    medications: [
      { name: "Metformina 850mg", dosage: "1 comprimido após almoço e jantar", duration: "Uso contínuo" },
    ],
    valid: true,
  },
  {
    id: "3",
    date: "01/11/2024",
    doctor: "Dr. António Machava",
    medications: [
      { name: "Amoxicilina 500mg", dosage: "1 comprimido de 8 em 8 horas", duration: "7 dias" },
    ],
    valid: false,
  },
];

const attachments = [
  { id: "1", name: "Laudo ECG 2024.pdf", type: "pdf", size: "245 KB", date: "10/10/2024" },
  { id: "2", name: "Raio-X Tórax.jpg", type: "image", size: "1.2 MB", date: "05/08/2024" },
  { id: "3", name: "Exames Laboratoriais.pdf", type: "pdf", size: "890 KB", date: "20/01/2025" },
];

const notes = [
  {
    id: "1",
    date: "28/01/2025",
    author: "Dr. António Machava",
    content: "Paciente demonstra boa adesão ao tratamento. Recomendar actividade física moderada.",
    private: false,
  },
  {
    id: "2",
    date: "15/12/2024",
    author: "Dra. Ana Cumbe",
    content: "Orientar sobre alimentação para controlo glicémico. Evitar carboidratos simples.",
    private: false,
  },
  {
    id: "3",
    date: "10/10/2024",
    author: "Dr. António Machava",
    content: "Nota interna: Aguardar resultado de exames complementares.",
    private: true,
  },
];

const MedicalRecord = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("summary");
  const [showNewConsultation, setShowNewConsultation] = useState(false);
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [showNewExam, setShowNewExam] = useState(false);
  const [showNewNote, setShowNewNote] = useState(false);
  const [showUploadAttachment, setShowUploadAttachment] = useState(false);

  const [newConsultation, setNewConsultation] = useState({
    date: "",
    time: "",
    type: "",
    notes: "",
    diagnosis: "",
  });

  const [newPrescription, setNewPrescription] = useState({
    medications: [{ name: "", dosage: "", duration: "" }],
    notes: "",
  });

  const [newNote, setNewNote] = useState({
    content: "",
    private: false,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Link to="/patients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">MS</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{patientData.name}</h1>
                <p className="text-muted-foreground">
                  {patientData.age} anos • {patientData.gender} • {patientData.bloodType}
                </p>
                {patientData.allergies.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <div className="flex gap-1">
                      {patientData.allergies.map((allergy, i) => (
                        <span key={i} className="badge-allergy">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-12 md:ml-0">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>

        {/* Alert Conditions */}
        {patientData.conditions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {patientData.conditions.map((condition, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 text-warning-foreground text-sm font-medium border border-warning/20"
              >
                <Heart className="w-4 h-4" />
                {condition}
              </span>
            ))}
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-xl">
            <TabsTrigger value="summary" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Resumo</span>
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2 data-[state=active]:bg-background">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Dados Pessoais</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Stethoscope className="w-4 h-4" />
              <span className="hidden sm:inline">Consultas</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2 data-[state=active]:bg-background">
              <TestTube className="w-4 h-4" />
              <span className="hidden sm:inline">Exames</span>
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Pill className="w-4 h-4" />
              <span className="hidden sm:inline">Prescrições</span>
            </TabsTrigger>
            <TabsTrigger value="attachments" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Paperclip className="w-4 h-4" />
              <span className="hidden sm:inline">Anexos</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2 data-[state=active]:bg-background">
              <StickyNote className="w-4 h-4" />
              <span className="hidden sm:inline">Notas</span>
            </TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Vitals */}
              <div className="health-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Sinais Vitais</h3>
                  <span className="text-xs text-muted-foreground">
                    Atualizado: {patientData.vitals.lastUpdate}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-destructive" />
                      </div>
                      <span className="text-sm">Pressão Arterial</span>
                    </div>
                    <span className="font-medium">{patientData.vitals.bloodPressure}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">Freq. Cardíaca</span>
                    </div>
                    <span className="font-medium">{patientData.vitals.heartRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-warning" />
                      </div>
                      <span className="text-sm">Temperatura</span>
                    </div>
                    <span className="font-medium">{patientData.vitals.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-sm">IMC</span>
                    </div>
                    <span className="font-medium">{patientData.vitals.bmi}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Edit className="w-4 h-4 mr-2" />
                  Atualizar Vitais
                </Button>
              </div>

              {/* Current Medications */}
              <div className="health-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Medicação Atual</h3>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {patientData.medications.map((med, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">{med.name}</p>
                      <p className="text-xs text-muted-foreground">{med.dosage} • Desde {med.since}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="health-card">
                <h3 className="font-semibold mb-4">Ações Rápidas</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowNewConsultation(true)}>
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Nova Consulta
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowNewPrescription(true)}>
                    <Pill className="w-4 h-4 mr-2" />
                    Nova Prescrição
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowNewExam(true)}>
                    <TestTube className="w-4 h-4 mr-2" />
                    Solicitar Exame
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowUploadAttachment(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Anexar Documento
                  </Button>
                </div>
              </div>

              {/* Recent Consultations */}
              <div className="md:col-span-2 lg:col-span-3 health-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Últimas Consultas</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("consultations")}>
                    Ver Todas
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {consultations.slice(0, 3).map((consultation) => (
                    <div
                      key={consultation.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{consultation.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {consultation.doctor} • {consultation.specialty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{consultation.date}</p>
                        <p className="text-xs text-muted-foreground">{consultation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Personal Data Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="health-card">
                <h3 className="font-semibold mb-4">Informações de Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{patientData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{patientData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="font-medium">{patientData.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {patientData.city}, {patientData.province} - {patientData.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Data */}
              <div className="health-card">
                <h3 className="font-semibold mb-4">Dados Pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">NUIT</p>
                    <p className="font-medium">{patientData.nuit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                    <p className="font-medium">{patientData.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gênero</p>
                    <p className="font-medium">{patientData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo Sanguíneo</p>
                    <p className="font-medium">{patientData.bloodType}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="health-card">
                <h3 className="font-semibold mb-4">Contato de Emergência</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{patientData.emergencyContact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{patientData.emergencyPhone}</p>
                  </div>
                </div>
              </div>

              {/* Physical Data */}
              <div className="health-card">
                <h3 className="font-semibold mb-4">Dados Físicos</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Peso</p>
                    <p className="font-medium">{patientData.vitals.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Altura</p>
                    <p className="font-medium">{patientData.vitals.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">IMC</p>
                    <p className="font-medium">{patientData.vitals.bmi}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="health-card">
              <h3 className="font-semibold mb-4">Linha do Tempo</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6">
                  {[...consultations, ...exams.filter(e => e.status === 'completed')]
                    .sort((a, b) => new Date('date' in b ? b.date.split('/').reverse().join('-') : '').getTime() - new Date('date' in a ? a.date.split('/').reverse().join('-') : '').getTime())
                    .map((item, i) => (
                      <div key={i} className="relative pl-10">
                        <div className="absolute left-2.5 w-3 h-3 rounded-full bg-primary" />
                        <div className="p-4 rounded-xl bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {'type' in item ? item.type : item.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {'date' in item ? item.date : ''}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {'doctor' in item ? item.doctor : ''} 
                            {'specialty' in item ? ` • ${item.specialty}` : ''}
                            {'result' in item && item.result ? ` • Resultado: ${item.result}` : ''}
                          </p>
                          {'notes' in item && item.notes && (
                            <p className="text-sm mt-2">{item.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Histórico de Consultas</h3>
              <Button onClick={() => setShowNewConsultation(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Consulta
              </Button>
            </div>
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <div key={consultation.id} className="health-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{consultation.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {consultation.doctor} • {consultation.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{consultation.date}</p>
                      <p className="text-sm text-muted-foreground">{consultation.time}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Diagnóstico</p>
                      <p className="text-sm">{consultation.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Observações</p>
                      <p className="text-sm">{consultation.notes}</p>
                    </div>
                    {consultation.prescriptions.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Prescrições</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {consultation.prescriptions.map((p, i) => (
                            <span key={i} className="px-2 py-1 bg-muted rounded-md text-xs">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Exames</h3>
              <Button onClick={() => setShowNewExam(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Solicitar Exame
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {exams.map((exam) => (
                <div key={exam.id} className="health-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <TestTube className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">{exam.name}</p>
                        <p className="text-sm text-muted-foreground">{exam.doctor}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "status-pill",
                      exam.status === "completed" ? "status-completed" : "status-scheduled"
                    )}>
                      {exam.status === "completed" ? "Concluído" : "Agendado"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{exam.date}</span>
                    {exam.result && (
                      <span className="text-sm font-medium">{exam.result}</span>
                    )}
                  </div>
                  {exam.file && (
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Resultado
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Prescrições</h3>
              <Button onClick={() => setShowNewPrescription(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Prescrição
              </Button>
            </div>
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className={cn(
                  "health-card",
                  !prescription.valid && "opacity-60"
                )}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Pill className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{prescription.date}</p>
                        <p className="text-sm text-muted-foreground">{prescription.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "status-pill",
                        prescription.valid ? "status-confirmed" : "status-cancelled"
                      )}>
                        {prescription.valid ? "Válida" : "Vencida"}
                      </span>
                      <Button variant="ghost" size="icon-sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {prescription.medications.map((med, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50">
                        <p className="font-medium text-sm">{med.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {med.dosage} • {med.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Anexos</h3>
              <Button onClick={() => setShowUploadAttachment(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Anexar Documento
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {attachments.map((attachment) => (
                <div key={attachment.id} className="health-card">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {attachment.size} • {attachment.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notas Clínicas</h3>
              <Button onClick={() => setShowNewNote(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Nota
              </Button>
            </div>
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className={cn(
                  "health-card",
                  note.private && "border-l-4 border-l-warning"
                )}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{note.author}</p>
                      {note.private && (
                        <span className="badge-warning">Privada</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Consultation Modal */}
      <Dialog open={showNewConsultation} onOpenChange={setShowNewConsultation}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Consulta</DialogTitle>
            <DialogDescription>
              Registrar nova consulta para {patientData.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <Input type="date" value={newConsultation.date} onChange={(e) => setNewConsultation({...newConsultation, date: e.target.value})} />
              </div>
              <div>
                <Label>Hora</Label>
                <Input type="time" value={newConsultation.time} onChange={(e) => setNewConsultation({...newConsultation, time: e.target.value})} />
              </div>
            </div>
            <div>
              <Label>Tipo de Consulta</Label>
              <Select value={newConsultation.type} onValueChange={(value) => setNewConsultation({...newConsultation, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Consulta de Rotina</SelectItem>
                  <SelectItem value="return">Retorno</SelectItem>
                  <SelectItem value="emergency">Urgência</SelectItem>
                  <SelectItem value="exam">Exame</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Diagnóstico</Label>
              <Input value={newConsultation.diagnosis} onChange={(e) => setNewConsultation({...newConsultation, diagnosis: e.target.value})} placeholder="Diagnóstico principal" />
            </div>
            <div>
              <Label>Observações</Label>
              <textarea
                value={newConsultation.notes}
                onChange={(e) => setNewConsultation({...newConsultation, notes: e.target.value})}
                placeholder="Anotações da consulta"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewConsultation(false)}>Cancelar</Button>
            <Button>Salvar Consulta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Prescription Modal */}
      <Dialog open={showNewPrescription} onOpenChange={setShowNewPrescription}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Prescrição</DialogTitle>
            <DialogDescription>
              Criar prescrição para {patientData.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {newPrescription.medications.map((med, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Medicamento {i + 1}</Label>
                  {i > 0 && (
                    <Button variant="ghost" size="icon-sm" onClick={() => {
                      const newMeds = [...newPrescription.medications];
                      newMeds.splice(i, 1);
                      setNewPrescription({...newPrescription, medications: newMeds});
                    }}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Input placeholder="Nome do medicamento" value={med.name} onChange={(e) => {
                    const newMeds = [...newPrescription.medications];
                    newMeds[i].name = e.target.value;
                    setNewPrescription({...newPrescription, medications: newMeds});
                  }} />
                  <Input placeholder="Posologia" value={med.dosage} onChange={(e) => {
                    const newMeds = [...newPrescription.medications];
                    newMeds[i].dosage = e.target.value;
                    setNewPrescription({...newPrescription, medications: newMeds});
                  }} />
                  <Input placeholder="Duração" value={med.duration} onChange={(e) => {
                    const newMeds = [...newPrescription.medications];
                    newMeds[i].duration = e.target.value;
                    setNewPrescription({...newPrescription, medications: newMeds});
                  }} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => {
              setNewPrescription({
                ...newPrescription,
                medications: [...newPrescription.medications, { name: "", dosage: "", duration: "" }]
              });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Medicamento
            </Button>
            <div>
              <Label>Observações</Label>
              <textarea
                value={newPrescription.notes}
                onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
                placeholder="Orientações adicionais"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPrescription(false)}>Cancelar</Button>
            <Button>Emitir Prescrição</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Exam Modal */}
      <Dialog open={showNewExam} onOpenChange={setShowNewExam}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Exame</DialogTitle>
            <DialogDescription>
              Solicitar exame para {patientData.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tipo de Exame</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blood">Hemograma Completo</SelectItem>
                  <SelectItem value="glucose">Glicemia em Jejum</SelectItem>
                  <SelectItem value="ecg">Eletrocardiograma</SelectItem>
                  <SelectItem value="echo">Ecocardiograma</SelectItem>
                  <SelectItem value="xray">Raio-X</SelectItem>
                  <SelectItem value="ultrasound">Ultrassonografia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Urgência</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Rotina</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Observações</Label>
              <textarea
                placeholder="Instruções ou observações"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewExam(false)}>Cancelar</Button>
            <Button>Solicitar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Note Modal */}
      <Dialog open={showNewNote} onOpenChange={setShowNewNote}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Nota</DialogTitle>
            <DialogDescription>
              Adicionar nota ao prontuário de {patientData.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Conteúdo</Label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                placeholder="Digite a nota..."
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="private"
                checked={newNote.private}
                onCheckedChange={(checked) => setNewNote({...newNote, private: !!checked})}
              />
              <Label htmlFor="private" className="text-sm font-normal">
                Nota privada (visível apenas para você)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewNote(false)}>Cancelar</Button>
            <Button>Salvar Nota</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Attachment Modal */}
      <Dialog open={showUploadAttachment} onOpenChange={setShowUploadAttachment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Anexar Documento</DialogTitle>
            <DialogDescription>
              Adicionar documento ao prontuário de {patientData.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium">Arraste arquivos ou clique para selecionar</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG até 10MB</p>
            </div>
            <div>
              <Label>Descrição (opcional)</Label>
              <Input placeholder="Descrição do documento" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadAttachment(false)}>Cancelar</Button>
            <Button>Anexar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MedicalRecord;
