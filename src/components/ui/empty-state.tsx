import { cn } from "@/lib/utils";
import { LucideIcon, FileQuestion, Users, Calendar, FileText, Building2, BarChart3 } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: "default" | "compact";
}

const EmptyState = ({
  icon: Icon = FileQuestion,
  title,
  description,
  action,
  className,
  variant = "default",
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center animate-fade-in",
        variant === "default" ? "py-16 px-8" : "py-8 px-4",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full bg-muted/50 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110",
          variant === "default" ? "w-20 h-20" : "w-14 h-14"
        )}
      >
        <Icon
          className={cn(
            "text-muted-foreground",
            variant === "default" ? "w-10 h-10" : "w-7 h-7"
          )}
        />
      </div>
      <h3
        className={cn(
          "font-semibold text-foreground mb-2",
          variant === "default" ? "text-xl" : "text-lg"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-muted-foreground max-w-sm",
          variant === "default" ? "text-base" : "text-sm"
        )}
      >
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} className="mt-6 group">
          <span className="group-hover:scale-105 transition-transform">
            {action.label}
          </span>
        </Button>
      )}
    </div>
  );
};

// Pre-configured empty states for common scenarios
export const EmptyPatients = ({ onAdd }: { onAdd: () => void }) => (
  <EmptyState
    icon={Users}
    title="Nenhum paciente encontrado"
    description="Comece a adicionar pacientes para gerir os seus prontuários e consultas."
    action={{ label: "Adicionar Paciente", onClick: onAdd }}
  />
);

export const EmptyAppointments = ({ onAdd }: { onAdd: () => void }) => (
  <EmptyState
    icon={Calendar}
    title="Nenhuma consulta agendada"
    description="Agende a primeira consulta para começar a gerir a sua agenda."
    action={{ label: "Agendar Consulta", onClick: onAdd }}
  />
);

export const EmptyRecords = ({ onAdd }: { onAdd: () => void }) => (
  <EmptyState
    icon={FileText}
    title="Nenhum prontuário encontrado"
    description="Os prontuários aparecerão aqui depois de adicionar pacientes."
    action={{ label: "Ver Pacientes", onClick: onAdd }}
  />
);

export const EmptyClinics = ({ onAdd }: { onAdd: () => void }) => (
  <EmptyState
    icon={Building2}
    title="Nenhuma clínica registada"
    description="Adicione a sua primeira clínica para começar a gerir múltiplas unidades."
    action={{ label: "Adicionar Clínica", onClick: onAdd }}
  />
);

export const EmptyReports = () => (
  <EmptyState
    icon={BarChart3}
    title="Sem dados suficientes"
    description="Os relatórios serão gerados automaticamente quando houver dados suficientes."
  />
);

export const EmptySearch = ({ query }: { query: string }) => (
  <EmptyState
    variant="compact"
    icon={FileQuestion}
    title="Nenhum resultado"
    description={`Não encontrámos resultados para "${query}". Tente pesquisar por outro termo.`}
  />
);

export default EmptyState;
