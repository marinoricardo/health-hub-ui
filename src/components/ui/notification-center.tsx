import { useState } from "react";
import { Bell, X, Check, AlertTriangle, Calendar, Users, FileText, Clock, CheckCheck, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "appointment" | "alert" | "system" | "patient" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority?: "low" | "medium" | "high";
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Alerta Clínico",
    message: "Paciente Pedro Sitoe apresenta pressão arterial elevada (180/110 mmHg)",
    time: "Agora",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "appointment",
    title: "Consulta em 15 minutos",
    message: "Maria Fernanda Macuácua - Cardiologia às 10:00",
    time: "5 min",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "patient",
    title: "Novo Paciente Cadastrado",
    message: "João Carlos Mondlane foi adicionado ao sistema",
    time: "30 min",
    read: false,
    priority: "low",
  },
  {
    id: "4",
    type: "reminder",
    title: "Lembrete de Retorno",
    message: "5 pacientes com consulta de retorno pendente esta semana",
    time: "1h",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "Backup Concluído",
    message: "Backup automático dos dados realizado com sucesso",
    time: "2h",
    read: true,
  },
  {
    id: "6",
    type: "appointment",
    title: "Consulta Cancelada",
    message: "Ana Paula Costa cancelou a consulta de amanhã",
    time: "3h",
    read: true,
  },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return Calendar;
      case "alert":
        return AlertTriangle;
      case "patient":
        return Users;
      case "reminder":
        return Clock;
      case "system":
        return Settings;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive";
      case "medium":
        return "border-l-warning";
      default:
        return "border-l-muted";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-destructive bg-destructive/10";
      case "appointment":
        return "text-primary bg-primary/10";
      case "patient":
        return "text-secondary bg-secondary/10";
      case "reminder":
        return "text-warning bg-warning/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Notificações</h3>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} não lidas` : "Todas lidas"}
            </p>
          </div>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="icon-sm" onClick={markAllAsRead} title="Marcar todas como lidas">
                <CheckCheck className="w-4 h-4" />
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="icon-sm" onClick={clearAll} title="Limpar todas">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full rounded-none border-b border-border bg-transparent h-10 p-0">
            <TabsTrigger value="all" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Todas
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Não Lidas
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Alertas
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[350px]">
            <TabsContent value="all" className="m-0">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Sem notificações</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => {
                    const Icon = getIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-3 hover:bg-muted/50 transition-colors cursor-pointer border-l-4 group",
                          getPriorityColor(notification.priority),
                          !notification.read && "bg-primary/5"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", getTypeColor(notification.type))}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={cn("text-sm font-medium truncate", !notification.read && "text-foreground")}>
                                {notification.title}
                              </p>
                              <span className="text-[10px] text-muted-foreground flex-shrink-0">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
                          >
                            <X className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread" className="m-0">
              {notifications.filter((n) => !n.read).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">Todas as notificações foram lidas</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.filter((n) => !n.read).map((notification) => {
                    const Icon = getIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-3 hover:bg-muted/50 transition-colors cursor-pointer border-l-4 bg-primary/5 group",
                          getPriorityColor(notification.priority)
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", getTypeColor(notification.type))}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium truncate">
                                {notification.title}
                              </p>
                              <span className="text-[10px] text-muted-foreground flex-shrink-0">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
                          >
                            <X className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="alerts" className="m-0">
              {notifications.filter((n) => n.type === "alert" || n.priority === "high").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">Sem alertas críticos</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.filter((n) => n.type === "alert" || n.priority === "high").map((notification) => {
                    const Icon = getIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-3 hover:bg-muted/50 transition-colors cursor-pointer border-l-4 group",
                          getPriorityColor(notification.priority),
                          !notification.read && "bg-destructive/5"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", getTypeColor(notification.type))}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium truncate">
                                {notification.title}
                              </p>
                              <span className="text-[10px] text-muted-foreground flex-shrink-0">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
                          >
                            <X className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="p-3 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full text-primary">
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
