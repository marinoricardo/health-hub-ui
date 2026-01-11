import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Calendar, Users, Activity, CreditCard } from "lucide-react";

// Dados de consultas por mês
const consultationsData = [
  { month: "Jan", consultas: 245, retornos: 120, novas: 125 },
  { month: "Fev", consultas: 280, retornos: 140, novas: 140 },
  { month: "Mar", consultas: 310, retornos: 165, novas: 145 },
  { month: "Abr", consultas: 290, retornos: 150, novas: 140 },
  { month: "Mai", consultas: 350, retornos: 180, novas: 170 },
  { month: "Jun", consultas: 380, retornos: 195, novas: 185 },
  { month: "Jul", consultas: 340, retornos: 175, novas: 165 },
  { month: "Ago", consultas: 420, retornos: 210, novas: 210 },
  { month: "Set", consultas: 395, retornos: 200, novas: 195 },
  { month: "Out", consultas: 450, retornos: 230, novas: 220 },
  { month: "Nov", consultas: 480, retornos: 245, novas: 235 },
  { month: "Dez", consultas: 510, retornos: 260, novas: 250 },
];

// Dados por especialidade
const specialtyData = [
  { name: "Cardiologia", value: 320, color: "hsl(215, 90%, 45%)" },
  { name: "Clínica Geral", value: 280, color: "hsl(168, 60%, 45%)" },
  { name: "Pediatria", value: 190, color: "hsl(38, 95%, 55%)" },
  { name: "Ortopedia", value: 150, color: "hsl(280, 60%, 50%)" },
  { name: "Dermatologia", value: 120, color: "hsl(15, 85%, 55%)" },
];

// Receita mensal
const revenueData = [
  { month: "Jan", receita: 45000, despesas: 32000 },
  { month: "Fev", receita: 52000, despesas: 35000 },
  { month: "Mar", receita: 48000, despesas: 34000 },
  { month: "Abr", receita: 55000, despesas: 36000 },
  { month: "Mai", receita: 62000, despesas: 38000 },
  { month: "Jun", receita: 68000, despesas: 40000 },
];

// Ocupação por horário
const occupancyData = [
  { hora: "08:00", ocupacao: 75 },
  { hora: "09:00", ocupacao: 95 },
  { hora: "10:00", ocupacao: 100 },
  { hora: "11:00", ocupacao: 90 },
  { hora: "12:00", ocupacao: 45 },
  { hora: "13:00", ocupacao: 30 },
  { hora: "14:00", ocupacao: 85 },
  { hora: "15:00", ocupacao: 95 },
  { hora: "16:00", ocupacao: 88 },
  { hora: "17:00", ocupacao: 70 },
  { hora: "18:00", ocupacao: 50 },
];

// Pacientes por faixa etária
const ageDistributionData = [
  { faixa: "0-17", pacientes: 180 },
  { faixa: "18-30", pacientes: 320 },
  { faixa: "31-45", pacientes: 450 },
  { faixa: "46-60", pacientes: 520 },
  { faixa: "61+", pacientes: 380 },
];

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const ChartCard = ({ title, subtitle, children, actions, className }: ChartCardProps) => (
  <div className={cn("health-card", className)}>
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions}
    </div>
    {children}
  </div>
);

export const ConsultationsChart = () => {
  const [period, setPeriod] = useState<"6m" | "12m">("12m");
  const data = period === "6m" ? consultationsData.slice(-6) : consultationsData;

  return (
    <ChartCard
      title="Evolução de Consultas"
      subtitle="Acompanhe o crescimento mensal"
      actions={
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={period === "6m" ? "default" : "ghost"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setPeriod("6m")}
          >
            6M
          </Button>
          <Button
            variant={period === "12m" ? "default" : "ghost"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setPeriod("12m")}
          >
            12M
          </Button>
        </div>
      }
    >
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConsultas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(215, 90%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(215, 90%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRetornos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(168, 60%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(168, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-lg)",
              }}
            />
            <Area
              type="monotone"
              dataKey="consultas"
              stroke="hsl(215, 90%, 45%)"
              strokeWidth={2}
              fill="url(#colorConsultas)"
              name="Total Consultas"
            />
            <Area
              type="monotone"
              dataKey="retornos"
              stroke="hsl(168, 60%, 45%)"
              strokeWidth={2}
              fill="url(#colorRetornos)"
              name="Retornos"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Total Consultas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-muted-foreground">Retornos</span>
        </div>
      </div>
    </ChartCard>
  );
};

export const SpecialtyDistributionChart = () => {
  return (
    <ChartCard title="Consultas por Especialidade" subtitle="Distribuição do último mês">
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={specialtyData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {specialtyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {specialtyData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-muted-foreground truncate">{item.name}</span>
            <span className="text-xs font-medium ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export const RevenueChart = () => {
  return (
    <ChartCard
      title="Receita vs Despesas"
      subtitle="Últimos 6 meses"
      actions={
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-success">+18%</span>
        </div>
      }
    >
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="receita" fill="hsl(152, 70%, 42%)" radius={[4, 4, 0, 0]} name="Receita" />
            <Bar dataKey="despesas" fill="hsl(0, 75%, 55%)" radius={[4, 4, 0, 0]} name="Despesas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export const OccupancyChart = () => {
  return (
    <ChartCard title="Taxa de Ocupação por Horário" subtitle="Média do último mês">
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={occupancyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="hora" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Ocupação"]}
            />
            <Line
              type="monotone"
              dataKey="ocupacao"
              stroke="hsl(215, 90%, 45%)"
              strokeWidth={2}
              dot={{ fill: "hsl(215, 90%, 45%)", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: "hsl(215, 90%, 45%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export const AgeDistributionChart = () => {
  return (
    <ChartCard title="Pacientes por Faixa Etária" subtitle="Distribuição demográfica">
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ageDistributionData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="faixa" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={45} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="pacientes" fill="hsl(168, 60%, 45%)" radius={[0, 4, 4, 0]} name="Pacientes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

// Componente de métricas rápidas
export const QuickMetrics = () => {
  const metrics = [
    {
      label: "Taxa de Retorno",
      value: "68%",
      change: "+5%",
      trend: "up" as const,
      icon: Users,
      color: "primary",
    },
    {
      label: "Tempo Médio Consulta",
      value: "32min",
      change: "-3min",
      trend: "down" as const,
      icon: Activity,
      color: "secondary",
    },
    {
      label: "Ticket Médio",
      value: "R$ 285",
      change: "+12%",
      trend: "up" as const,
      icon: CreditCard,
      color: "success",
    },
    {
      label: "Cancelamentos",
      value: "4.2%",
      change: "-1.5%",
      trend: "down" as const,
      icon: Calendar,
      color: "warning",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="health-card">
          <div className="flex items-center justify-between mb-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `bg-${metric.color}/10`)}>
              <metric.icon className={cn("w-5 h-5", `text-${metric.color}`)} />
            </div>
            <div className={cn("flex items-center gap-1 text-xs font-medium",
              metric.trend === "up" && metric.label !== "Cancelamentos" ? "text-success" : 
              metric.trend === "down" && metric.label === "Cancelamentos" ? "text-success" :
              "text-destructive"
            )}>
              {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {metric.change}
            </div>
          </div>
          <p className="text-2xl font-bold">{metric.value}</p>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </div>
  );
};
