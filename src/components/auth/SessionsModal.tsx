import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet, Globe, MapPin, Clock, LogOut, Shield, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Session {
  id: string;
  device: "desktop" | "mobile" | "tablet";
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

const mockSessions: Session[] = [
  {
    id: "1",
    device: "desktop",
    browser: "Chrome no Windows",
    location: "Maputo, Moçambique",
    ip: "197.218.xxx.xxx",
    lastActive: "Agora",
    current: true,
  },
  {
    id: "2",
    device: "mobile",
    browser: "Safari no iPhone",
    location: "Maputo, Moçambique",
    ip: "197.218.xxx.xxx",
    lastActive: "Há 2 horas",
    current: false,
  },
  {
    id: "3",
    device: "desktop",
    browser: "Firefox no MacOS",
    location: "Matola, Moçambique",
    ip: "196.28.xxx.xxx",
    lastActive: "Há 1 dia",
    current: false,
  },
  {
    id: "4",
    device: "tablet",
    browser: "Chrome no iPad",
    location: "Beira, Moçambique",
    ip: "41.94.xxx.xxx",
    lastActive: "Há 3 dias",
    current: false,
  },
];

const SessionsModal = ({ isOpen, onClose }: SessionsModalProps) => {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile":
        return Smartphone;
      case "tablet":
        return Tablet;
      default:
        return Monitor;
    }
  };

  const handleLogoutSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
    toast.success("Sessão terminada com sucesso");
  };

  const handleLogoutAll = () => {
    setSessions(sessions.filter((s) => s.current));
    toast.success("Todas as outras sessões foram terminadas");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Sessões Activas
          </DialogTitle>
          <DialogDescription>
            Gerencie os dispositivos onde a sua conta está conectada
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Security Notice */}
          <div className="p-4 rounded-xl bg-success/10 border border-success/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-success">Conta Segura</p>
              <p className="text-xs text-muted-foreground">
                Não detectámos actividade suspeita na sua conta.
              </p>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {sessions.map((session) => {
              const DeviceIcon = getDeviceIcon(session.device);
              return (
                <div
                  key={session.id}
                  className={cn(
                    "p-4 rounded-xl border transition-colors",
                    session.current ? "border-primary/50 bg-primary/5" : "border-border"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      session.current ? "bg-primary/10" : "bg-muted"
                    )}>
                      <DeviceIcon className={cn(
                        "w-6 h-6",
                        session.current ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{session.browser}</p>
                        {session.current && (
                          <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium">
                            Esta sessão
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {session.ip}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {session.lastActive}
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleLogoutSession(session.id)}
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          {sessions.filter((s) => !s.current).length > 0 && (
            <Button variant="destructive" onClick={handleLogoutAll}>
              <LogOut className="w-4 h-4 mr-2" />
              Terminar Todas as Outras
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionsModal;
