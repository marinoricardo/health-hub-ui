import { X, Trash2, Download, Mail, Tag, CheckCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onEmail?: () => void;
  onTag?: () => void;
  className?: string;
}

const BulkActionsBar = ({
  selectedCount,
  onClear,
  onDelete,
  onExport,
  onEmail,
  onTag,
  className,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  const handleExport = () => {
    onExport?.();
    toast.success(`${selectedCount} registos exportados!`, {
      description: "O ficheiro foi descarregado.",
    });
  };

  const handleEmail = () => {
    onEmail?.();
    toast.success("Email preparado!", {
      description: `${selectedCount} destinatários adicionados.`,
    });
  };

  const handleTag = () => {
    onTag?.();
    toast.success("Etiquetas actualizadas!", {
      description: `${selectedCount} registos etiquetados.`,
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-3 px-4 py-3 rounded-xl",
        "bg-foreground text-background shadow-xl",
        "animate-slide-up",
        className
      )}
    >
      <div className="flex items-center gap-2 pr-3 border-r border-background/20">
        <CheckCircle className="w-4 h-4" />
        <span className="font-medium text-sm">
          {selectedCount} seleccionado{selectedCount !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {onExport && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="text-background hover:bg-background/10 hover:text-background"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Exportar
          </Button>
        )}

        {onEmail && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEmail}
            className="text-background hover:bg-background/10 hover:text-background"
          >
            <Mail className="w-4 h-4 mr-1.5" />
            Enviar Email
          </Button>
        )}

        {onTag && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleTag}
            className="text-background hover:bg-background/10 hover:text-background"
          >
            <Tag className="w-4 h-4 mr-1.5" />
            Etiquetar
          </Button>
        )}

        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:bg-destructive/20 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Eliminar
          </Button>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="ml-2 h-8 w-8 text-background hover:bg-background/10 hover:text-background"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default BulkActionsBar;
