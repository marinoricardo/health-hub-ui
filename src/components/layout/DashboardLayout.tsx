import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Building2,
  UserCog,
  BarChart3,
  Settings,
  CreditCard,
  ChevronDown,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronLeft,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CommandPalette from "@/components/ui/command-palette";
import NotificationCenter from "@/components/ui/notification-center";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Recepção", path: "/reception" },
  { icon: Activity, label: "Enfermagem", path: "/nurse-station" },
  { icon: Users, label: "Pacientes", path: "/patients" },
  { icon: Calendar, label: "Agenda", path: "/agenda" },
  { icon: FileText, label: "Prontuários", path: "/records" },
  { icon: Building2, label: "Clínicas", path: "/clinics" },
  { icon: UserCog, label: "Utilizadores", path: "/users" },
  { icon: BarChart3, label: "Relatórios", path: "/reports" },
  { icon: CreditCard, label: "Facturação", path: "/billing" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

const clinics = [
  { id: "1", name: "Clínica Central Maputo", specialty: "Cardiologia" },
  { id: "2", name: "Centro Médico Polana", specialty: "Clínica Geral" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clinicDropdownOpen, setClinicDropdownOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(clinics[0]);
  const isActive = (path: string) => location.pathname === path;

  // Global action handlers for Command Palette
  const handleNewPatient = () => {
    navigate("/patients?action=new");
  };

  const handleNewAppointment = () => {
    navigate("/agenda?action=new");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 fixed inset-y-0 left-0 z-40",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Activity className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold text-sidebar-foreground">HealthSync</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform", !sidebarOpen && "rotate-180")} />
          </button>
        </div>

        {/* Clinic Switcher */}
        <div className="p-3">
          <div className="relative">
            <button
              onClick={() => setClinicDropdownOpen(!clinicDropdownOpen)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors",
                sidebarOpen ? "justify-between" : "justify-center"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4 text-sidebar-primary" />
                </div>
                {sidebarOpen && (
                  <div className="text-left min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {selectedClinic.name}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {selectedClinic.specialty}
                    </p>
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <ChevronDown className={cn(
                  "w-4 h-4 text-sidebar-foreground/60 transition-transform flex-shrink-0",
                  clinicDropdownOpen && "rotate-180"
                )} />
              )}
            </button>

            {/* Dropdown */}
            {clinicDropdownOpen && sidebarOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in">
                {clinics.map((clinic) => (
                  <button
                    key={clinic.id}
                    onClick={() => {
                      setSelectedClinic(clinic);
                      setClinicDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors",
                      selectedClinic.id === clinic.id && "bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      selectedClinic.id === clinic.id ? "bg-primary/10" : "bg-muted"
                    )}>
                      <Building2 className={cn(
                        "w-4 h-4",
                        selectedClinic.id === clinic.id ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{clinic.name}</p>
                      <p className="text-xs text-muted-foreground">{clinic.specialty}</p>
                    </div>
                  </button>
                ))}
                <div className="border-t border-border p-2">
                  <Link
                    to="/clinics"
                    className="flex items-center justify-center gap-2 p-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    Gerir Clínicas
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive(item.path)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                !sidebarOpen && "justify-center"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer",
            !sidebarOpen && "justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-white">JS</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Dr. João Silva</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">Médico</p>
              </div>
            )}
            {sidebarOpen && (
              <button className="p-1.5 rounded-lg hover:bg-sidebar-border text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Command Palette Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <CommandPalette
              onNewPatient={handleNewPatient}
              onNewAppointment={handleNewAppointment}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <NotificationCenter />

            {/* Mobile Search */}
            <button className="md:hidden p-2 rounded-lg hover:bg-muted">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center lg:hidden">
              <span className="text-sm font-medium text-white">JS</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-sidebar animate-slide-down">
            {/* Mobile Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
              <Link to="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-secondary flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-bold text-sidebar-foreground">HealthSync</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Clinic Switcher */}
            <div className="p-3 border-b border-sidebar-border">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent">
                <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-sidebar-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">{selectedClinic.name}</p>
                  <p className="text-xs text-sidebar-foreground/60">{selectedClinic.specialty}</p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive(item.path)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
