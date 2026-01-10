import { X, Phone, Mail, MapPin, Calendar, FileText, AlertTriangle, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./sheet";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";

interface PatientQuickViewProps {
  open: boolean;
  onClose: () => void;
  patient: {
    id: string;
    name: string;
    nuit: string;
    phone: string;
    email: string;
    birthDate: string;
    gender: string;
    address?: string;
    bloodType?: string;
    allergies?: string[];
    conditions?: string[];
    lastVisit?: string;
    nextAppointment?: string;
    status: string;
  } | null;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewRecord?: (id: string) => void;
}

export const PatientQuickView = ({
  open,
  onClose,
  patient,
  onEdit,
  onDelete,
  onViewRecord,
}: PatientQuickViewProps) => {
  if (!patient) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "inactive":
        return "bg-muted text-muted-foreground border-muted";
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activo";
      case "inactive":
        return "Inactivo";
      case "critical":
        return "Crítico";
      default:
        return status;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <SheetTitle className="text-left">Detalhes do Paciente</SheetTitle>
          </div>
        </SheetHeader>

        <div className="space-y-6 animate-fade-in">
          {/* Patient Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">NUIT: {patient.nuit}</p>
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border mt-1", getStatusColor(patient.status))}>
                {getStatusLabel(patient.status)}
              </span>
            </div>
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{patient.email}</span>
              </div>
              {patient.address && (
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Medical Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Informação Médica</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Género</p>
                <p className="font-medium">{patient.gender}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Data Nasc.</p>
                <p className="font-medium">{patient.birthDate}</p>
              </div>
              {patient.bloodType && (
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">Tipo Sanguíneo</p>
                  <p className="font-medium">{patient.bloodType}</p>
                </div>
              )}
            </div>
          </div>

          {/* Allergies & Conditions */}
          {(patient.allergies?.length || patient.conditions?.length) && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Alertas Clínicos</h4>
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">Alergias</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.allergies.map((allergy, i) => (
                      <span key={i} className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded-full">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {patient.conditions && patient.conditions.length > 0 && (
                <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium text-warning-foreground">Condições</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.conditions.map((condition, i) => (
                      <span key={i} className="px-2 py-0.5 bg-warning/10 text-warning-foreground text-xs rounded-full">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Appointments */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Consultas</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Última Visita</p>
                </div>
                <p className="font-medium text-sm">{patient.lastVisit || "—"}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <p className="text-xs text-primary">Próxima</p>
                </div>
                <p className="font-medium text-sm">{patient.nextAppointment || "—"}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button onClick={() => onViewRecord?.(patient.id)} className="w-full group">
              <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Ver Prontuário Completo
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => onEdit?.(patient.id)} className="group">
                <Edit className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Editar
              </Button>
              <Button variant="outline" onClick={() => onDelete?.(patient.id)} className="text-destructive hover:text-destructive group">
                <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PatientQuickView;
