import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Eye,
  Edit,
  Trash2,
  X,
  FileText,
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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  age: number;
  gender: string;
  nuit: string;
  lastVisit: string;
  doctor: string;
  status: "active" | "inactive" | "pending";
  alerts: string[];
  conditions: string[];
  province: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Maria Fernanda Macuácua",
    email: "maria.macuacua@email.co.mz",
    phone: "+258 84 123 4567",
    birthDate: "1985-05-15",
    age: 39,
    gender: "Feminino",
    nuit: "100123456",
    lastVisit: "28/01/2025",
    doctor: "Dr. António Machava",
    status: "active",
    alerts: ["Alergia a Penicilina"],
    conditions: ["Hipertensão", "Diabetes Tipo 2"],
    province: "Maputo",
  },
  {
    id: "2",
    name: "João Carlos Mondlane",
    email: "joao.mondlane@email.co.mz",
    phone: "+258 82 234 5678",
    birthDate: "1978-03-22",
    age: 46,
    gender: "Masculino",
    nuit: "100234567",
    lastVisit: "25/01/2025",
    doctor: "Dra. Ana Cumbe",
    status: "active",
    alerts: [],
    conditions: ["Colesterol Alto"],
    province: "Maputo",
  },
  {
    id: "3",
    name: "Amélia Cossa Nhantumbo",
    email: "amelia.cossa@email.co.mz",
    phone: "+258 86 345 6789",
    birthDate: "1990-11-08",
    age: 34,
    gender: "Feminino",
    nuit: "100345678",
    lastVisit: "20/01/2025",
    doctor: "Dr. António Machava",
    status: "active",
    alerts: ["Alergia a Ibuprofeno"],
    conditions: ["Asma"],
    province: "Gaza",
  },
  {
    id: "4",
    name: "Pedro Armando Sitoe",
    email: "pedro.sitoe@email.co.mz",
    phone: "+258 84 456 7890",
    birthDate: "1965-07-30",
    age: 59,
    gender: "Masculino",
    nuit: "100456789",
    lastVisit: "15/01/2025",
    doctor: "Dra. Carla Tembe",
    status: "inactive",
    alerts: ["Condição Cardíaca Crítica"],
    conditions: ["Insuficiência Cardíaca", "Hipertensão"],
    province: "Inhambane",
  },
  {
    id: "5",
    name: "Fátima Rosário Langa",
    email: "fatima.langa@email.co.mz",
    phone: "+258 87 567 8901",
    birthDate: "1995-01-12",
    age: 30,
    gender: "Feminino",
    nuit: "100567890",
    lastVisit: "10/01/2025",
    doctor: "Dr. António Machava",
    status: "pending",
    alerts: [],
    conditions: [],
    province: "Sofala",
  },
  {
    id: "6",
    name: "Carlos Eduardo Magaia",
    email: "carlos.magaia@email.co.mz",
    phone: "+258 82 678 9012",
    birthDate: "1982-09-05",
    age: 42,
    gender: "Masculino",
    nuit: "100678901",
    lastVisit: "05/01/2025",
    doctor: "Dra. Ana Cumbe",
    status: "active",
    alerts: [],
    conditions: ["Gastrite"],
    province: "Maputo",
  },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    nuit: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    bloodType: "",
    allergies: "",
    conditions: "",
    notes: "",
  });

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nuit.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || patient.doctor === doctorFilter;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedPatients.length === paginatedPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(paginatedPatients.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleDelete = (patient: Patient) => {
    setPatientToDelete(patient);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Handle delete logic
    setShowDeleteConfirm(false);
    setPatientToDelete(null);
  };

  const handleNewPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowNewPatientModal(false);
    setNewPatient({
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: "",
      nuit: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      emergencyContact: "",
      emergencyPhone: "",
      bloodType: "",
      allergies: "",
      conditions: "",
      notes: "",
    });
  };

  const statusLabels: Record<string, string> = {
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Pacientes</h1>
            <p className="text-muted-foreground">
              Gerencie todos os pacientes da clínica
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={() => setShowNewPatientModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPatients.length}</p>
                <p className="text-sm text-muted-foreground">Total de Pacientes</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPatients.filter((p) => p.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Pacientes Ativos</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Consultas Hoje</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPatients.filter((p) => p.alerts.length > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Com Alertas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="health-card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
                {(statusFilter !== "all" || doctorFilter !== "all") && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {[statusFilter !== "all", doctorFilter !== "all"].filter(Boolean).length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Médico</Label>
                <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Dr. João Silva">Dr. João Silva</SelectItem>
                    <SelectItem value="Dra. Ana Costa">Dra. Ana Costa</SelectItem>
                    <SelectItem value="Dra. Carla Mendes">Dra. Carla Mendes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 flex items-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStatusFilter("all");
                    setDoctorFilter("all");
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Patients Table */}
        <div className="health-card p-0 overflow-hidden">
          {/* Table Actions */}
          {selectedPatients.length > 0 && (
            <div className="p-4 bg-primary/5 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedPatients.length} paciente(s) selecionado(s)
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <Checkbox
                      checked={selectedPatients.length === paginatedPatients.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Paciente
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Contato
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Última Consulta
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Médico
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="w-20 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="table-row-interactive"
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedPatients.includes(patient.id)}
                        onCheckedChange={() => toggleSelect(patient.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary-foreground">
                            {patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{patient.name}</p>
                            {patient.alerts.length > 0 && (
                              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} anos • {patient.gender}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[200px]">{patient.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm">{patient.lastVisit}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm">{patient.doctor}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "status-pill",
                          patient.status === "active" && "status-confirmed",
                          patient.status === "inactive" && "status-cancelled",
                          patient.status === "pending" && "status-in-progress"
                        )}
                      >
                        {statusLabels[patient.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/medical-record/${patient.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Prontuário
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Agendar Consulta
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Histórico
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(patient)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
              {Math.min(currentPage * itemsPerPage, filteredPatients.length)} de{" "}
              {filteredPatients.length} pacientes
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-9"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* New Patient Modal */}
      <Dialog open={showNewPatientModal} onOpenChange={setShowNewPatientModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Paciente</DialogTitle>
            <DialogDescription>
              Preencha os dados do paciente para cadastrá-lo no sistema
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNewPatientSubmit}>
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-medium mb-4">Dados Pessoais</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      placeholder="Nome do paciente"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Data de Nascimento *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={newPatient.birthDate}
                      onChange={(e) => setNewPatient({ ...newPatient, birthDate: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gênero</Label>
                    <Select
                      value={newPatient.gender}
                      onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nuit">NUIT *</Label>
                    <Input
                      id="nuit"
                      value={newPatient.nuit}
                      onChange={(e) => setNewPatient({ ...newPatient, nuit: e.target.value })}
                      placeholder="000000000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                    <Select
                      value={newPatient.bloodType}
                      onValueChange={(value) => setNewPatient({ ...newPatient, bloodType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="font-medium mb-4">Endereço</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                      placeholder="Rua, número, complemento"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={newPatient.city}
                      onChange={(e) => setNewPatient({ ...newPatient, city: e.target.value })}
                      placeholder="Cidade"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="province">Província</Label>
                      <Select
                        value={newPatient.province}
                        onValueChange={(value) => setNewPatient({ ...newPatient, province: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maputo Cidade">Maputo Cidade</SelectItem>
                          <SelectItem value="Maputo">Maputo</SelectItem>
                          <SelectItem value="Gaza">Gaza</SelectItem>
                          <SelectItem value="Inhambane">Inhambane</SelectItem>
                          <SelectItem value="Sofala">Sofala</SelectItem>
                          <SelectItem value="Manica">Manica</SelectItem>
                          <SelectItem value="Tete">Tete</SelectItem>
                          <SelectItem value="Zambézia">Zambézia</SelectItem>
                          <SelectItem value="Nampula">Nampula</SelectItem>
                          <SelectItem value="Cabo Delgado">Cabo Delgado</SelectItem>
                          <SelectItem value="Niassa">Niassa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        value={newPatient.postalCode}
                        onChange={(e) => setNewPatient({ ...newPatient, postalCode: e.target.value })}
                        placeholder="0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="font-medium mb-4">Contato de Emergência</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact">Nome</Label>
                    <Input
                      id="emergencyContact"
                      value={newPatient.emergencyContact}
                      onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                      placeholder="Nome do contato"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Telefone</Label>
                    <Input
                      id="emergencyPhone"
                      value={newPatient.emergencyPhone}
                      onChange={(e) => setNewPatient({ ...newPatient, emergencyPhone: e.target.value })}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div>
                <h3 className="font-medium mb-4">Informações Médicas</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="allergies">Alergias</Label>
                    <Input
                      id="allergies"
                      value={newPatient.allergies}
                      onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                      placeholder="Liste as alergias conhecidas"
                    />
                  </div>
                  <div>
                    <Label htmlFor="conditions">Condições Pré-existentes</Label>
                    <Input
                      id="conditions"
                      value={newPatient.conditions}
                      onChange={(e) => setNewPatient({ ...newPatient, conditions: e.target.value })}
                      placeholder="Liste as condições de saúde"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Observações</Label>
                    <textarea
                      id="notes"
                      value={newPatient.notes}
                      onChange={(e) => setNewPatient({ ...newPatient, notes: e.target.value })}
                      placeholder="Observações adicionais"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowNewPatientModal(false)}>
                Cancelar
              </Button>
              <Button type="submit">Cadastrar Paciente</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o paciente{" "}
              <strong>{patientToDelete?.name}</strong>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Patients;
