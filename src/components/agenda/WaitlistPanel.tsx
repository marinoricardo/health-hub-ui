import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Phone, Calendar, User, Plus, X, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface WaitlistItem {
  id: string;
  patient: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
  specialty: string;
  priority: "normal" | "urgent";
  addedAt: string;
  notes?: string;
}

interface WaitlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockWaitlist: WaitlistItem[] = [
  {
    id: "1",
    patient: "Carlos Eduardo Silva",
    phone: "+258 84 555 1234",
    preferredDate: "Qualquer dia",
    preferredTime: "Manhã",
    specialty: "Cardiologia",
    priority: "urgent",
    addedAt: "28/01/2025",
    notes: "Paciente com histórico de problemas cardíacos",
  },
  {
    id: "2",
    patient: "Ana Beatriz Santos",
    phone: "+258 82 666 5678",
    preferredDate: "Segunda a Quarta",
    preferredTime: "Tarde",
    specialty: "Clínica Geral",
    priority: "normal",
    addedAt: "27/01/2025",
  },
  {
    id: "3",
    patient: "Roberto Mendes",
    phone: "+258 86 777 9012",
    preferredDate: "Sexta-feira",
    preferredTime: "Qualquer horário",
    specialty: "Ortopedia",
    priority: "normal",
    addedAt: "25/01/2025",
  },
  {
    id: "4",
    patient: "Fátima Langa",
    phone: "+258 84 888 3456",
    preferredDate: "Urgente",
    preferredTime: "Manhã",
    specialty: "Cardiologia",
    priority: "urgent",
    addedAt: "28/01/2025",
    notes: "Retorno urgente",
  },
];

const WaitlistPanel = ({ isOpen, onClose }: WaitlistPanelProps) => {
  const [waitlist, setWaitlist] = useState<WaitlistItem[]>(mockWaitlist);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<{
    patient: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    specialty: string;
    priority: "normal" | "urgent";
    notes: string;
  }>({
    patient: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    specialty: "",
    priority: "normal",
    notes: "",
  });

  const handleAdd = () => {
    if (newItem.patient && newItem.specialty) {
      const item: WaitlistItem = {
        id: Date.now().toString(),
        patient: newItem.patient,
        phone: newItem.phone,
        preferredDate: newItem.preferredDate,
        preferredTime: newItem.preferredTime,
        specialty: newItem.specialty,
        priority: newItem.priority,
        addedAt: new Date().toLocaleDateString("pt-BR"),
        notes: newItem.notes,
      };
      setWaitlist([item, ...waitlist]);
      setNewItem({
        patient: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        specialty: "",
        priority: "normal",
        notes: "",
      });
      setShowAddForm(false);
      toast.success("Paciente adicionado à lista de espera!");
    }
  };

  const handleRemove = (id: string) => {
    setWaitlist(waitlist.filter((item) => item.id !== id));
    toast.success("Removido da lista de espera");
  };

  const handleSchedule = (item: WaitlistItem) => {
    toast.success("Abrindo agenda para agendar...", {
      description: `Paciente: ${item.patient}`,
    });
    onClose();
  };

  const urgentCount = waitlist.filter((item) => item.priority === "urgent").length;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Lista de Espera
            {urgentCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                {urgentCount} urgente{urgentCount > 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            Pacientes aguardando disponibilidade de agenda
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Add Button or Form */}
          {!showAddForm ? (
            <Button onClick={() => setShowAddForm(true)} className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar à Lista
            </Button>
          ) : (
            <div className="p-4 rounded-xl bg-muted/50 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Novo Paciente</h4>
                <Button variant="ghost" size="icon-sm" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Nome do Paciente</Label>
                  <Input
                    value={newItem.patient}
                    onChange={(e) => setNewItem({ ...newItem, patient: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={newItem.phone}
                    onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
                    placeholder="+258 84 000 0000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Especialidade</Label>
                    <Select
                      value={newItem.specialty}
                      onValueChange={(v) => setNewItem({ ...newItem, specialty: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                        <SelectItem value="Clínica Geral">Clínica Geral</SelectItem>
                        <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                        <SelectItem value="Pediatria">Pediatria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Prioridade</Label>
                  <Select
                    value={newItem.priority}
                    onValueChange={(v) => setNewItem({ ...newItem, priority: v as "normal" | "urgent" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Data Preferencial</Label>
                    <Input
                      value={newItem.preferredDate}
                      onChange={(e) => setNewItem({ ...newItem, preferredDate: e.target.value })}
                      placeholder="Ex: Segundas"
                    />
                  </div>
                  <div>
                    <Label>Horário Preferencial</Label>
                    <Input
                      value={newItem.preferredTime}
                      onChange={(e) => setNewItem({ ...newItem, preferredTime: e.target.value })}
                      placeholder="Ex: Manhã"
                    />
                  </div>
                </div>
                <div>
                  <Label>Observações</Label>
                  <Input
                    value={newItem.notes}
                    onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                    placeholder="Notas adicionais"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAdd}>
                  Adicionar
                </Button>
              </div>
            </div>
          )}

          {/* Waitlist Items */}
          <div className="space-y-3">
            {waitlist.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <p className="text-muted-foreground">Lista de espera vazia</p>
              </div>
            ) : (
              waitlist.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "p-4 rounded-xl border-l-4 bg-card border border-border shadow-sm",
                    item.priority === "urgent" ? "border-l-destructive" : "border-l-muted"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{item.patient}</p>
                        {item.priority === "urgent" && (
                          <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-medium">
                            Urgente
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {item.phone}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                          {item.specialty}
                        </span>
                        {item.preferredDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.preferredDate}
                          </span>
                        )}
                        {item.preferredTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.preferredTime}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Adicionado em {item.addedAt}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-destructive hover:text-destructive"
                        onClick={() => handleRemove(item.id)}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Remover
                      </Button>
                      <Button size="sm" className="h-8" onClick={() => handleSchedule(item)}>
                        Agendar
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          {waitlist.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold mb-3">Resumo</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{waitlist.length}</p>
                  <p className="text-xs text-muted-foreground">Total na Lista</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{urgentCount}</p>
                  <p className="text-xs text-muted-foreground">Urgentes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WaitlistPanel;
