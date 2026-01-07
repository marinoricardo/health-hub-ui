import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  FileText,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Phone,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Eye,
  Printer,
  Clock,
  User,
  Activity,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface MedicalRecordItem {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  lastConsultation: string;
  doctor: string;
  specialty: string;
  conditions: string[];
  alerts: string[];
  totalConsultations: number;
  lastUpdate: string;
}

const mockRecords: MedicalRecordItem[] = [
  {
    id: "1",
    patientName: "Maria Fernanda Macuácua",
    patientId: "P001",
    age: 39,
    gender: "Feminino",
    lastConsultation: "28/01/2025",
    doctor: "Dr. António Machava",
    specialty: "Cardiologia",
    conditions: ["Hipertensão", "Diabetes Tipo 2"],
    alerts: ["Alergia a Penicilina"],
    totalConsultations: 15,
    lastUpdate: "28/01/2025 09:30",
  },
  {
    id: "2",
    patientName: "João Carlos Mondlane",
    patientId: "P002",
    age: 46,
    gender: "Masculino",
    lastConsultation: "25/01/2025",
    doctor: "Dra. Ana Cumbe",
    specialty: "Clínica Geral",
    conditions: ["Colesterol Alto"],
    alerts: [],
    totalConsultations: 8,
    lastUpdate: "25/01/2025 14:00",
  },
  {
    id: "3",
    patientName: "Amélia Cossa Nhantumbo",
    patientId: "P003",
    age: 34,
    gender: "Feminino",
    lastConsultation: "20/01/2025",
    doctor: "Dr. António Machava",
    specialty: "Pneumologia",
    conditions: ["Asma"],
    alerts: ["Alergia a Ibuprofeno"],
    totalConsultations: 12,
    lastUpdate: "20/01/2025 10:15",
  },
  {
    id: "4",
    patientName: "Pedro Armando Sitoe",
    patientId: "P004",
    age: 59,
    gender: "Masculino",
    lastConsultation: "15/01/2025",
    doctor: "Dra. Carla Tembe",
    specialty: "Cardiologia",
    conditions: ["Insuficiência Cardíaca", "Hipertensão"],
    alerts: ["Condição Cardíaca Crítica"],
    totalConsultations: 25,
    lastUpdate: "15/01/2025 16:45",
  },
  {
    id: "5",
    patientName: "Fátima Rosário Langa",
    patientId: "P005",
    age: 30,
    gender: "Feminino",
    lastConsultation: "10/01/2025",
    doctor: "Dr. António Machava",
    specialty: "Clínica Geral",
    conditions: [],
    alerts: [],
    totalConsultations: 3,
    lastUpdate: "10/01/2025 08:00",
  },
  {
    id: "6",
    patientName: "Carlos Eduardo Magaia",
    patientId: "P006",
    age: 42,
    gender: "Masculino",
    lastConsultation: "05/01/2025",
    doctor: "Dra. Ana Cumbe",
    specialty: "Gastroenterologia",
    conditions: ["Gastrite"],
    alerts: [],
    totalConsultations: 6,
    lastUpdate: "05/01/2025 11:30",
  },
];

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRecords = mockRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || record.specialty === specialtyFilter;
    const matchesDoctor = doctorFilter === "all" || record.doctor === doctorFilter;
    return matchesSearch && matchesSpecialty && matchesDoctor;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedRecords.length === paginatedRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(paginatedRecords.map((r) => r.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Prontuários</h1>
            <p className="text-muted-foreground">
              Aceda ao histórico clínico completo dos pacientes
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockRecords.length}</p>
                <p className="text-sm text-muted-foreground">Total de Prontuários</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockRecords.reduce((sum, r) => sum + r.totalConsultations, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total de Consultas</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockRecords.filter((r) => r.conditions.length > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Com Condições</p>
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
                  {mockRecords.filter((r) => r.alerts.length > 0).length}
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
                placeholder="Pesquisar por nome ou código do paciente..."
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
                {(specialtyFilter !== "all" || doctorFilter !== "all") && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {[specialtyFilter !== "all", doctorFilter !== "all"].filter(Boolean).length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Especialidade</Label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                    <SelectItem value="Clínica Geral">Clínica Geral</SelectItem>
                    <SelectItem value="Pneumologia">Pneumologia</SelectItem>
                    <SelectItem value="Gastroenterologia">Gastroenterologia</SelectItem>
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
                    <SelectItem value="Dr. António Machava">Dr. António Machava</SelectItem>
                    <SelectItem value="Dra. Ana Cumbe">Dra. Ana Cumbe</SelectItem>
                    <SelectItem value="Dra. Carla Tembe">Dra. Carla Tembe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 flex items-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSpecialtyFilter("all");
                    setDoctorFilter("all");
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Records Table */}
        <div className="health-card p-0 overflow-hidden">
          {/* Table Actions */}
          {selectedRecords.length > 0 && (
            <div className="p-4 bg-primary/5 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedRecords.length} prontuário(s) seleccionado(s)
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
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
                      checked={selectedRecords.length === paginatedRecords.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Paciente
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Última Consulta
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Médico / Especialidade
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden xl:table-cell">
                    Condições
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Consultas
                  </th>
                  <th className="w-20 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="table-row-interactive"
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedRecords.includes(record.id)}
                        onCheckedChange={() => toggleSelect(record.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary-foreground">
                            {record.patientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{record.patientName}</p>
                            {record.alerts.length > 0 && (
                              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {record.age} anos • {record.gender} • {record.patientId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{record.lastConsultation}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div>
                        <p className="text-sm font-medium">{record.doctor}</p>
                        <p className="text-xs text-muted-foreground">{record.specialty}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {record.conditions.length > 0 ? (
                          record.conditions.slice(0, 2).map((condition, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-warning/10 text-warning-foreground text-xs"
                            >
                              {condition}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                        {record.conditions.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{record.conditions.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium">{record.totalConsultations}</span>
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
                            <Link to={`/medical-record/${record.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Prontuário
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="w-4 h-4 mr-2" />
                            Imprimir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Exportar PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Agendar Consulta
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
              A mostrar {(currentPage - 1) * itemsPerPage + 1} a{" "}
              {Math.min(currentPage * itemsPerPage, filteredRecords.length)} de{" "}
              {filteredRecords.length} prontuários
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
    </DashboardLayout>
  );
};

export default MedicalRecords;
