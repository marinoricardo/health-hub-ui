import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Users,
  Calendar,
  FileText,
  Building2,
  BarChart3,
  CreditCard,
  Settings,
  UserPlus,
  CalendarPlus,
  Home,
  Search,
  Keyboard,
} from "lucide-react";

interface CommandPaletteProps {
  onNewPatient?: () => void;
  onNewAppointment?: () => void;
}

const CommandPalette = ({ onNewPatient, onNewAppointment }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Global shortcuts
      if (e.altKey) {
        switch (e.key) {
          case "p":
            e.preventDefault();
            onNewPatient?.();
            break;
          case "a":
            e.preventDefault();
            onNewAppointment?.();
            break;
          case "d":
            e.preventDefault();
            navigate("/dashboard");
            break;
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [navigate, onNewPatient, onNewAppointment]);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const navigationItems = [
    { icon: Home, label: "Dashboard", shortcut: "Alt+D", action: () => navigate("/dashboard") },
    { icon: Users, label: "Pacientes", shortcut: "", action: () => navigate("/patients") },
    { icon: Calendar, label: "Agenda", shortcut: "", action: () => navigate("/agenda") },
    { icon: FileText, label: "Prontuários", shortcut: "", action: () => navigate("/records") },
    { icon: Building2, label: "Clínicas", shortcut: "", action: () => navigate("/clinics") },
    { icon: Users, label: "Utilizadores", shortcut: "", action: () => navigate("/users") },
    { icon: BarChart3, label: "Relatórios", shortcut: "", action: () => navigate("/reports") },
    { icon: CreditCard, label: "Facturação", shortcut: "", action: () => navigate("/billing") },
    { icon: Settings, label: "Configurações", shortcut: "", action: () => navigate("/settings") },
  ];

  const actionItems = [
    { icon: UserPlus, label: "Novo Paciente", shortcut: "Alt+P", action: () => onNewPatient?.() },
    { icon: CalendarPlus, label: "Nova Consulta", shortcut: "Alt+A", action: () => onNewAppointment?.() },
  ];

  return (
    <>
      {/* Keyboard shortcut hint button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-lg border border-border/50 transition-all duration-200 hover:border-border"
      >
        <Search className="w-4 h-4" />
        <span>Buscar...</span>
        <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Pesquisar pacientes, acções, páginas..." />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center py-6 text-muted-foreground">
              <Search className="w-10 h-10 mb-2 opacity-50" />
              <p>Nenhum resultado encontrado.</p>
              <p className="text-sm">Tente pesquisar por outra coisa.</p>
            </div>
          </CommandEmpty>
          
          <CommandGroup heading="Acções Rápidas">
            {actionItems.map((item) => (
              <CommandItem
                key={item.label}
                onSelect={() => runCommand(item.action)}
                className="flex items-center gap-3 py-3 cursor-pointer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                </div>
                {item.shortcut && (
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    {item.shortcut}
                  </kbd>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Navegação">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.label}
                onSelect={() => runCommand(item.action)}
                className="flex items-center gap-3 py-2.5 cursor-pointer"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
                {item.shortcut && (
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    {item.shortcut}
                  </kbd>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Atalhos de Teclado">
            <div className="px-2 py-3 text-xs text-muted-foreground space-y-1.5">
              <div className="flex items-center gap-2">
                <Keyboard className="w-3.5 h-3.5" />
                <span>Pressiona</span>
                <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">⌘K</kbd>
                <span>para abrir esta paleta</span>
              </div>
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
