import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  Settings,
  CreditCard,
  Upload,
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

interface Clinic {
  id: string;
  name: string;
  specialty: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website?: string;
  status: "active" | "inactive" | "pending";
  plan: "starter" | "professional" | "enterprise";
  patients: number;
  professionals: number;
  appointments: number;
  createdAt: string;
  logo?: string;
}

const mockClinics: Clinic[] = [
  {
    id: "1",
    name: "Clínica São Paulo",
    specialty: "Cardiologia",
    address: "Av. Paulista, 1000, Sala 501",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 3456-7890",
    email: "contato@clinicasp.com.br",
    website: "www.clinicasp.com.br",
    status: "active",
    plan: "professional",
    patients: 1847,
    professionals: 7,
    appointments: 342,
    createdAt: "15/03/2023",
  },
  {
    id: "2",
    name: "Centro Médico Vida",
    specialty: "Clínica Geral",
    address: "Rua Augusta, 500",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 2345-6789",
    email: "contato@centrovida.com.br",
    status: "active",
    plan: "starter",
    patients: 523,
    professionals: 3,
    appointments: 89,
    createdAt: "10/08/2024",
  },
  {
    id: "3",
    name: "Clínica Bem Estar",
    specialty: "Pediatria",
    address: "Rua Oscar Freire, 200",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 4567-8901",
    email: "contato@bemestar.com.br",
    status: "pending",
    plan: "professional",
    patients: 0,
    professionals: 0,
    appointments: 0,
    createdAt: "25/01/2025",
  },
];

const planLabels: Record<string, { label: string; color: string }> = {
  starter: { label: "Starter", color: "bg-muted text-muted-foreground" },
  professional: { label: "Professional", color: "bg-primary/10 text-primary" },
  enterprise: { label: "Enterprise", color: "bg-secondary/10 text-secondary" },
};

const Clinics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewClinic, setShowNewClinic] = useState(false);
  const [showEditClinic, setShowEditClinic] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const [newClinic, setNewClinic] = useState({
    name: "",
    specialty: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    cnpj: "",
    responsibleName: "",
    responsibleEmail: "",
    responsiblePhone: "",
    plan: "",
  });

  const filteredClinics = mockClinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusLabels: Record<string, { label: string; color: string }> = {
    active: { label: "Ativo", color: "status-confirmed" },
    inactive: { label: "Inativo", color: "status-cancelled" },
    pending: { label: "Pendente", color: "status-in-progress" },
  };

  const handleEdit = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setNewClinic({
      name: clinic.name,
      specialty: clinic.specialty,
      address: clinic.address,
      city: clinic.city,
      state: clinic.state,
      zipCode: "",
      phone: clinic.phone,
      email: clinic.email,
      website: clinic.website || "",
      cnpj: "",
      responsibleName: "",
      responsibleEmail: "",
      responsiblePhone: "",
      plan: clinic.plan,
    });
    setShowEditClinic(true);
  };

  const handleDelete = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setShowDeleteConfirm(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Clínicas</h1>
            <p className="text-muted-foreground">
              Gerencie todas as suas clínicas e unidades
            </p>
          </div>
          <Button onClick={() => setShowNewClinic(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Clínica
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockClinics.length}</p>
                <p className="text-sm text-muted-foreground">Total de Clínicas</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockClinics.filter((c) => c.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Clínicas Ativas</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockClinics.reduce((acc, c) => acc + c.professionals, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Profissionais</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockClinics.reduce((acc, c) => acc + c.appointments, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Consultas/mês</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="health-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar clínicas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <div key={clinic.id} className="health-card group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{clinic.name}</h3>
                    <p className="text-sm text-muted-foreground">{clinic.specialty}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(clinic)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Plano e Faturação
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(clinic)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{clinic.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{clinic.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{clinic.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold">{clinic.patients}</p>
                    <p className="text-xs text-muted-foreground">Pacientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{clinic.professionals}</p>
                    <p className="text-xs text-muted-foreground">Profissionais</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn("status-pill", statusLabels[clinic.status].color)}>
                    {statusLabels[clinic.status].label}
                  </span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", planLabels[clinic.plan].color)}>
                    {planLabels[clinic.plan].label}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <div
            className="health-card border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center min-h-[280px]"
            onClick={() => setShowNewClinic(true)}
          >
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                <Plus className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-medium">Adicionar Clínica</p>
              <p className="text-sm text-muted-foreground">Cadastrar nova unidade</p>
            </div>
          </div>
        </div>
      </div>

      {/* New/Edit Clinic Modal */}
      <Dialog open={showNewClinic || showEditClinic} onOpenChange={(open) => {
        if (!open) {
          setShowNewClinic(false);
          setShowEditClinic(false);
          setSelectedClinic(null);
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {showEditClinic ? "Editar Clínica" : "Nova Clínica"}
            </DialogTitle>
            <DialogDescription>
              {showEditClinic
                ? "Atualize os dados da clínica"
                : "Preencha os dados para cadastrar uma nova clínica"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                <Building2 className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Carregar Logo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG ou JPG, máximo 2MB
                </p>
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <h3 className="font-medium mb-4">Informações Básicas</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Nome da Clínica *</Label>
                  <Input
                    value={newClinic.name}
                    onChange={(e) => setNewClinic({ ...newClinic, name: e.target.value })}
                    placeholder="Nome da clínica"
                  />
                </div>
                <div>
                  <Label>Especialidade Principal</Label>
                  <Select value={newClinic.specialty} onValueChange={(value) => setNewClinic({ ...newClinic, specialty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Clínica Geral</SelectItem>
                      <SelectItem value="cardiology">Cardiologia</SelectItem>
                      <SelectItem value="pediatrics">Pediatria</SelectItem>
                      <SelectItem value="orthopedics">Ortopedia</SelectItem>
                      <SelectItem value="dermatology">Dermatologia</SelectItem>
                      <SelectItem value="neurology">Neurologia</SelectItem>
                      <SelectItem value="psychiatry">Psiquiatria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>CNPJ</Label>
                  <Input
                    value={newClinic.cnpj}
                    onChange={(e) => setNewClinic({ ...newClinic, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-medium mb-4">Contato</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Telefone *</Label>
                  <Input
                    value={newClinic.phone}
                    onChange={(e) => setNewClinic({ ...newClinic, phone: e.target.value })}
                    placeholder="(00) 0000-0000"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={newClinic.email}
                    onChange={(e) => setNewClinic({ ...newClinic, email: e.target.value })}
                    placeholder="contato@clinica.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Website</Label>
                  <Input
                    value={newClinic.website}
                    onChange={(e) => setNewClinic({ ...newClinic, website: e.target.value })}
                    placeholder="www.clinica.com"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-medium mb-4">Endereço</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Endereço *</Label>
                  <Input
                    value={newClinic.address}
                    onChange={(e) => setNewClinic({ ...newClinic, address: e.target.value })}
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div>
                  <Label>Cidade *</Label>
                  <Input
                    value={newClinic.city}
                    onChange={(e) => setNewClinic({ ...newClinic, city: e.target.value })}
                    placeholder="Cidade"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estado *</Label>
                    <Input
                      value={newClinic.state}
                      onChange={(e) => setNewClinic({ ...newClinic, state: e.target.value })}
                      placeholder="UF"
                    />
                  </div>
                  <div>
                    <Label>CEP</Label>
                    <Input
                      value={newClinic.zipCode}
                      onChange={(e) => setNewClinic({ ...newClinic, zipCode: e.target.value })}
                      placeholder="00000-000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Responsible */}
            <div>
              <h3 className="font-medium mb-4">Responsável</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Nome do Responsável *</Label>
                  <Input
                    value={newClinic.responsibleName}
                    onChange={(e) => setNewClinic({ ...newClinic, responsibleName: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label>Email do Responsável *</Label>
                  <Input
                    type="email"
                    value={newClinic.responsibleEmail}
                    onChange={(e) => setNewClinic({ ...newClinic, responsibleEmail: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <Label>Telefone do Responsável</Label>
                  <Input
                    value={newClinic.responsiblePhone}
                    onChange={(e) => setNewClinic({ ...newClinic, responsiblePhone: e.target.value })}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Plan */}
            <div>
              <h3 className="font-medium mb-4">Plano</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { id: "starter", name: "Starter", price: "R$ 199/mês", features: ["Até 500 pacientes", "3 profissionais", "Suporte por email"] },
                  { id: "professional", name: "Professional", price: "R$ 399/mês", features: ["Até 3.000 pacientes", "10 profissionais", "Suporte prioritário"] },
                  { id: "enterprise", name: "Enterprise", price: "Personalizado", features: ["Pacientes ilimitados", "Profissionais ilimitados", "Suporte dedicado"] },
                ].map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all",
                      newClinic.plan === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setNewClinic({ ...newClinic, plan: plan.id })}
                  >
                    <p className="font-semibold">{plan.name}</p>
                    <p className="text-lg font-bold text-primary mt-1">{plan.price}</p>
                    <ul className="mt-3 space-y-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => {
              setShowNewClinic(false);
              setShowEditClinic(false);
            }}>
              Cancelar
            </Button>
            <Button>
              {showEditClinic ? "Salvar Alterações" : "Criar Clínica"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a clínica{" "}
              <strong>{selectedClinic?.name}</strong>? Esta ação não pode ser
              desfeita e todos os dados associados serão perdidos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="destructive">Excluir Clínica</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Clinics;
