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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Repeat, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface BlockTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
  selectedTime?: string;
}

const BlockTimeModal = ({ isOpen, onClose, selectedDate, selectedTime }: BlockTimeModalProps) => {
  const [blockData, setBlockData] = useState({
    title: "",
    startDate: selectedDate || "",
    endDate: selectedDate || "",
    startTime: selectedTime || "08:00",
    endTime: "18:00",
    allDay: false,
    recurring: false,
    recurrencePattern: "weekly",
    recurrenceEnd: "",
    selectedDays: [] as string[],
    reason: "",
    doctor: "all",
  });

  const weekDays = [
    { id: "seg", label: "Seg" },
    { id: "ter", label: "Ter" },
    { id: "qua", label: "Qua" },
    { id: "qui", label: "Qui" },
    { id: "sex", label: "Sex" },
    { id: "sab", label: "Sáb" },
    { id: "dom", label: "Dom" },
  ];

  const handleSubmit = () => {
    if (!blockData.title) {
      toast.error("Por favor, adicione um título");
      return;
    }
    if (!blockData.startDate) {
      toast.error("Por favor, seleccione uma data");
      return;
    }

    toast.success("Horário bloqueado com sucesso!", {
      description: blockData.recurring
        ? `Bloqueio recorrente criado para ${blockData.title}`
        : `${blockData.startDate} - ${blockData.title}`,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setBlockData({
      title: "",
      startDate: "",
      endDate: "",
      startTime: "08:00",
      endTime: "18:00",
      allDay: false,
      recurring: false,
      recurrencePattern: "weekly",
      recurrenceEnd: "",
      selectedDays: [],
      reason: "",
      doctor: "all",
    });
  };

  const toggleDay = (dayId: string) => {
    setBlockData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter((d) => d !== dayId)
        : [...prev.selectedDays, dayId],
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Bloquear Horário
          </DialogTitle>
          <DialogDescription>
            Bloqueie horários para férias, reuniões ou outros compromissos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Título *</Label>
            <Input
              value={blockData.title}
              onChange={(e) => setBlockData({ ...blockData, title: e.target.value })}
              placeholder="Ex: Férias, Reunião, Formação..."
            />
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label>Médico</Label>
            <Select
              value={blockData.doctor}
              onValueChange={(v) => setBlockData({ ...blockData, doctor: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Médicos</SelectItem>
                <SelectItem value="dr-joao">Dr. João Silva</SelectItem>
                <SelectItem value="dra-ana">Dra. Ana Costa</SelectItem>
                <SelectItem value="dra-carla">Dra. Carla Mendes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data Início</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10"
                  value={blockData.startDate}
                  onChange={(e) => setBlockData({ ...blockData, startDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Data Fim</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10"
                  value={blockData.endDate}
                  onChange={(e) => setBlockData({ ...blockData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium">Dia Inteiro</p>
              <p className="text-sm text-muted-foreground">Bloquear o dia completo</p>
            </div>
            <Switch
              checked={blockData.allDay}
              onCheckedChange={(checked) => setBlockData({ ...blockData, allDay: checked })}
            />
          </div>

          {/* Time Range */}
          {!blockData.allDay && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hora Início</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="time"
                    className="pl-10"
                    value={blockData.startTime}
                    onChange={(e) => setBlockData({ ...blockData, startTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Hora Fim</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="time"
                    className="pl-10"
                    value={blockData.endTime}
                    onChange={(e) => setBlockData({ ...blockData, endTime: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Recurring Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-3">
              <Repeat className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Bloqueio Recorrente</p>
                <p className="text-sm text-muted-foreground">Repetir semanalmente</p>
              </div>
            </div>
            <Switch
              checked={blockData.recurring}
              onCheckedChange={(checked) => setBlockData({ ...blockData, recurring: checked })}
            />
          </div>

          {/* Recurring Options */}
          {blockData.recurring && (
            <div className="space-y-4 p-4 rounded-xl border border-border animate-fade-in">
              <div>
                <Label className="mb-3 block">Dias da Semana</Label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((day) => (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => toggleDay(day.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        blockData.selectedDays.includes(day.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Termina em</Label>
                <Input
                  type="date"
                  value={blockData.recurrenceEnd}
                  onChange={(e) => setBlockData({ ...blockData, recurrenceEnd: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label>Motivo (opcional)</Label>
            <Textarea
              value={blockData.reason}
              onChange={(e) => setBlockData({ ...blockData, reason: e.target.value })}
              placeholder="Adicione um motivo ou observação..."
              rows={3}
            />
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning-foreground">Atenção</p>
              <p className="text-sm text-warning-foreground/80">
                Consultas existentes neste período não serão canceladas automaticamente.
                Verifique a agenda antes de confirmar.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Bloquear Horário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTimeModal;
