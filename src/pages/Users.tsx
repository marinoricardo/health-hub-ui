import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Users as UsersIcon,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Shield,
  UserPlus,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  EyeOff,
  Key,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "doctor" | "nurse" | "receptionist";
  specialty?: string;
  crm?: string;
  status: "active" | "inactive" | "pending";
  lastLogin?: string;
  avatar?: string;
  clinics: string[];
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    email: "joao.silva@healthsync.com",
    phone: "(11) 98765-4321",
    role: "doctor",
    specialty: "Cardiologia",
    crm: "CRM/SP 123456",
    status: "active",
    lastLogin: "28/01/2025 09:15",
    clinics: ["Clínica São Paulo", "Centro Médico Vida"],
  },
  {
    id: "2",
    name: "Dra. Ana Costa",
    email: "ana.costa@healthsync.com",
    phone: "(11) 91234-5678",
    role: "doctor",
    specialty: "Clínica Geral",
    crm: "CRM/SP 654321",
    status: "active",
    lastLogin: "28/01/2025 08:30",
    clinics: ["Clínica São Paulo"],
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria.santos@healthsync.com",
    phone: "(11) 99876-5432",
    role: "nurse",
    status: "active",
    lastLogin: "27/01/2025 18:45",
    clinics: ["Clínica São Paulo"],
  },
  {
    id: "4",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@healthsync.com",
    phone: "(11) 94567-8901",
    role: "receptionist",
    status: "active",
    lastLogin: "28/01/2025 07:00",
    clinics: ["Clínica São Paulo", "Centro Médico Vida"],
  },
  {
    id: "5",
    name: "Patricia Lima",
    email: "patricia.lima@healthsync.com",
    phone: "(11) 93456-7890",
    role: "admin",
    status: "active",
    lastLogin: "28/01/2025 10:00",
    clinics: ["Clínica São Paulo", "Centro Médico Vida"],
  },
  {
    id: "6",
    name: "Dr. Roberto Alves",
    email: "roberto.alves@healthsync.com",
    phone: "(11) 92345-6789",
    role: "doctor",
    specialty: "Ortopedia",
    crm: "CRM/SP 789012",
    status: "pending",
    clinics: ["Centro Médico Vida"],
  },
];

const roleLabels: Record<string, { label: string; color: string }> = {
  admin: { label: "Administrador", color: "bg-primary/10 text-primary" },
  doctor: { label: "Médico", color: "bg-secondary/10 text-secondary" },
  nurse: { label: "Enfermeiro", color: "bg-success/10 text-success" },
  receptionist: { label: "Recepcionista", color: "bg-warning/10 text-warning-foreground" },
};

const permissions = [
  { id: "dashboard", label: "Dashboard", description: "Visualizar dashboard e estatísticas" },
  { id: "patients_view", label: "Ver Pacientes", description: "Visualizar lista de pacientes" },
  { id: "patients_edit", label: "Editar Pacientes", description: "Criar e editar dados de pacientes" },
  { id: "patients_delete", label: "Excluir Pacientes", description: "Remover pacientes do sistema" },
  { id: "records_view", label: "Ver Prontuários", description: "Visualizar prontuários médicos" },
  { id: "records_edit", label: "Editar Prontuários", description: "Adicionar e editar prontuários" },
  { id: "agenda_view", label: "Ver Agenda", description: "Visualizar agendamentos" },
  { id: "agenda_edit", label: "Gerenciar Agenda", description: "Criar e modificar agendamentos" },
  { id: "prescriptions", label: "Prescrições", description: "Emitir prescrições médicas" },
  { id: "reports", label: "Relatórios", description: "Gerar e visualizar relatórios" },
  { id: "billing", label: "Faturação", description: "Acessar dados de faturação" },
  { id: "settings", label: "Configurações", description: "Modificar configurações do sistema" },
  { id: "users", label: "Gestão de Utilizadores", description: "Gerenciar utilizadores e permissões" },
  { id: "clinics", label: "Gestão de Clínicas", description: "Gerenciar clínicas e unidades" },
];

const rolePermissions: Record<string, string[]> = {
  admin: permissions.map((p) => p.id),
  doctor: ["dashboard", "patients_view", "patients_edit", "records_view", "records_edit", "agenda_view", "agenda_edit", "prescriptions", "reports"],
  nurse: ["dashboard", "patients_view", "records_view", "agenda_view"],
  receptionist: ["dashboard", "patients_view", "patients_edit", "agenda_view", "agenda_edit"],
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [inviteData, setInviteData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    specialty: "",
    crm: "",
    clinics: [] as string[],
    customPermissions: false,
    permissions: [] as string[],
  });

  const filteredUsers = mockUsers.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter)
  );

  const statusLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    active: { label: "Ativo", icon: <CheckCircle2 className="w-4 h-4 text-success" /> },
    inactive: { label: "Inativo", icon: <XCircle className="w-4 h-4 text-destructive" /> },
    pending: { label: "Pendente", icon: <Clock className="w-4 h-4 text-warning" /> },
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setInviteData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      specialty: user.specialty || "",
      crm: user.crm || "",
      clinics: user.clinics,
      customPermissions: false,
      permissions: rolePermissions[user.role],
    });
    setShowEditUser(true);
  };

  const handlePermissions = (user: User) => {
    setSelectedUser(user);
    setInviteData({
      ...inviteData,
      permissions: rolePermissions[user.role],
    });
    setShowPermissions(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const handleRoleChange = (role: string) => {
    setInviteData({
      ...inviteData,
      role,
      permissions: rolePermissions[role] || [],
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Utilizadores</h1>
            <p className="text-muted-foreground">
              Gerencie utilizadores e permissões
            </p>
          </div>
          <Button onClick={() => setShowInviteUser(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Convidar Utilizador
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
                <p className="text-sm text-muted-foreground">Total Utilizadores</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockUsers.filter((u) => u.role === "doctor").length}
                </p>
                <p className="text-sm text-muted-foreground">Médicos</p>
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
                  {mockUsers.filter((u) => u.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Ativos</p>
              </div>
            </div>
          </div>
          <div className="health-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockUsers.filter((u) => u.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
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
                placeholder="Buscar utilizadores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos os papéis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os papéis</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="doctor">Médico</SelectItem>
                <SelectItem value="nurse">Enfermeiro</SelectItem>
                <SelectItem value="receptionist">Recepcionista</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users List */}
        <div className="health-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Utilizador
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Contacto
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Papel
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Último Login
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="w-20 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="table-row-interactive">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary-foreground">
                            {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{user.name}</p>
                          {user.specialty && (
                            <p className="text-sm text-muted-foreground">{user.specialty}</p>
                          )}
                          {user.crm && (
                            <p className="text-xs text-muted-foreground">{user.crm}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="truncate max-w-[200px]">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", roleLabels[user.role].color)}>
                        {roleLabels[user.role].label}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {user.lastLogin || "Nunca"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {statusLabels[user.status].icon}
                        <span className="text-sm">{statusLabels[user.status].label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePermissions(user)}>
                            <Shield className="w-4 h-4 mr-2" />
                            Permissões
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="w-4 h-4 mr-2" />
                            Redefinir Senha
                          </DropdownMenuItem>
                          {user.status === "pending" && (
                            <DropdownMenuItem>
                              <Send className="w-4 h-4 mr-2" />
                              Reenviar Convite
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(user)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite/Edit User Modal */}
      <Dialog open={showInviteUser || showEditUser} onOpenChange={(open) => {
        if (!open) {
          setShowInviteUser(false);
          setShowEditUser(false);
          setSelectedUser(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {showEditUser ? "Editar Utilizador" : "Convidar Utilizador"}
            </DialogTitle>
            <DialogDescription>
              {showEditUser
                ? "Atualize os dados do utilizador"
                : "Envie um convite por email para um novo utilizador"}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="permissions">Permissões</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Nome Completo *</Label>
                  <Input
                    value={inviteData.name}
                    onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                    placeholder="Nome do utilizador"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={inviteData.phone}
                    onChange={(e) => setInviteData({ ...inviteData, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <Label>Papel *</Label>
                <Select value={inviteData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o papel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="doctor">Médico</SelectItem>
                    <SelectItem value="nurse">Enfermeiro</SelectItem>
                    <SelectItem value="receptionist">Recepcionista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor specific fields */}
              {inviteData.role === "doctor" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Especialidade</Label>
                    <Select value={inviteData.specialty} onValueChange={(value) => setInviteData({ ...inviteData, specialty: value })}>
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
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>CRM</Label>
                    <Input
                      value={inviteData.crm}
                      onChange={(e) => setInviteData({ ...inviteData, crm: e.target.value })}
                      placeholder="CRM/UF 000000"
                    />
                  </div>
                </div>
              )}

              {/* Clinics */}
              <div>
                <Label>Clínicas</Label>
                <div className="mt-2 space-y-2">
                  {["Clínica São Paulo", "Centro Médico Vida", "Clínica Bem Estar"].map((clinic) => (
                    <div key={clinic} className="flex items-center gap-2">
                      <Checkbox
                        id={clinic}
                        checked={inviteData.clinics.includes(clinic)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setInviteData({ ...inviteData, clinics: [...inviteData.clinics, clinic] });
                          } else {
                            setInviteData({ ...inviteData, clinics: inviteData.clinics.filter((c) => c !== clinic) });
                          }
                        }}
                      />
                      <Label htmlFor={clinic} className="font-normal">{clinic}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Permissões do papel</p>
                  <p className="text-sm text-muted-foreground">
                    {inviteData.role ? roleLabels[inviteData.role]?.label : "Selecione um papel"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="custom"
                    checked={inviteData.customPermissions}
                    onCheckedChange={(checked) => setInviteData({ ...inviteData, customPermissions: !!checked })}
                  />
                  <Label htmlFor="custom" className="font-normal">Personalizar</Label>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {permissions.map((permission) => {
                  const isEnabled = inviteData.permissions.includes(permission.id);
                  const isDisabled = !inviteData.customPermissions;

                  return (
                    <div
                      key={permission.id}
                      className={cn(
                        "p-3 rounded-lg border transition-colors",
                        isEnabled ? "border-primary/50 bg-primary/5" : "border-border",
                        isDisabled && "opacity-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={permission.id}
                          checked={isEnabled}
                          disabled={isDisabled}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setInviteData({ ...inviteData, permissions: [...inviteData.permissions, permission.id] });
                            } else {
                              setInviteData({ ...inviteData, permissions: inviteData.permissions.filter((p) => p !== permission.id) });
                            }
                          }}
                        />
                        <div>
                          <Label htmlFor={permission.id} className="font-medium">{permission.label}</Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => {
              setShowInviteUser(false);
              setShowEditUser(false);
            }}>
              Cancelar
            </Button>
            <Button>
              {showEditUser ? "Salvar Alterações" : "Enviar Convite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Modal */}
      <Dialog open={showPermissions} onOpenChange={setShowPermissions}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Permissões - {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Gerencie as permissões deste utilizador
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {selectedUser?.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{selectedUser?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser?.role && roleLabels[selectedUser.role]?.label}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {permissions.map((permission) => {
                const isEnabled = inviteData.permissions.includes(permission.id);

                return (
                  <div
                    key={permission.id}
                    className={cn(
                      "p-3 rounded-lg border transition-colors cursor-pointer",
                      isEnabled ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/30"
                    )}
                    onClick={() => {
                      if (isEnabled) {
                        setInviteData({ ...inviteData, permissions: inviteData.permissions.filter((p) => p !== permission.id) });
                      } else {
                        setInviteData({ ...inviteData, permissions: [...inviteData.permissions, permission.id] });
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox checked={isEnabled} />
                      <div>
                        <p className="font-medium text-sm">{permission.label}</p>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissions(false)}>
              Cancelar
            </Button>
            <Button>Salvar Permissões</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Remoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o utilizador{" "}
              <strong>{selectedUser?.name}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="destructive">Remover Utilizador</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;
