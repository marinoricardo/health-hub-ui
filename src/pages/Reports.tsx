import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter, FileText, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Jan", consultas: 320, pacientes: 45, receita: 48000 },
  { month: "Fev", consultas: 285, pacientes: 38, receita: 42000 },
  { month: "Mar", consultas: 350, pacientes: 52, receita: 55000 },
  { month: "Abr", consultas: 410, pacientes: 61, receita: 62000 },
  { month: "Mai", consultas: 380, pacientes: 48, receita: 58000 },
  { month: "Jun", consultas: 420, pacientes: 55, receita: 65000 },
];

const doctorData = [
  { name: "Dr. João Silva", consultas: 142, taxa: 95 },
  { name: "Dra. Ana Costa", consultas: 128, taxa: 92 },
  { name: "Dra. Carla Mendes", consultas: 98, taxa: 88 },
  { name: "Dr. Pedro Santos", consultas: 85, taxa: 90 },
];

const specialtyData = [
  { name: "Cardiologia", value: 35, color: "hsl(215, 90%, 45%)" },
  { name: "Clínica Geral", value: 28, color: "hsl(168, 60%, 45%)" },
  { name: "Pediatria", value: 20, color: "hsl(38, 95%, 55%)" },
  { name: "Ortopedia", value: 17, color: "hsl(152, 70%, 42%)" },
];

const Reports = () => {
  const [period, setPeriod] = useState("month");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">Análise de desempenho e indicadores</p>
          </div>
          <div className="flex gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              toast.success("Relatório exportado!", { description: "O ficheiro PDF foi descarregado." });
            }}>
              <Download className="w-4 h-4 mr-2" />Exportar
            </Button>
            <Button variant="outline" onClick={() => {
              toast.success("A preparar impressão...");
              setTimeout(() => window.print(), 500);
            }}>
              <Printer className="w-4 h-4 mr-2" />Imprimir
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Consultas", value: "2.165", change: "+12%", icon: Calendar, color: "primary" },
            { label: "Novos Pacientes", value: "299", change: "+8%", icon: Users, color: "secondary" },
            { label: "Taxa Ocupação", value: "87%", change: "+5%", icon: TrendingUp, color: "success" },
            { label: "Receita", value: "R$ 330k", change: "+15%", icon: BarChart3, color: "warning" },
          ].map((stat, i) => (
            <div key={i} className="health-card">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-success">{stat.change} vs período anterior</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="health-card">
            <h3 className="font-semibold mb-4">Consultas por Mês</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="consultas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="health-card">
            <h3 className="font-semibold mb-4">Crescimento de Pacientes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="pacientes" stroke="hsl(var(--secondary))" strokeWidth={3} dot={{ fill: "hsl(var(--secondary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="health-card">
            <h3 className="font-semibold mb-4">Consultas por Especialidade</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={specialtyData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {specialtyData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="health-card">
            <h3 className="font-semibold mb-4">Produtividade por Profissional</h3>
            <div className="space-y-4">
              {doctorData.map((doctor, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center text-xs font-medium text-primary-foreground">
                    {doctor.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{doctor.name}</span>
                      <span className="text-sm text-muted-foreground">{doctor.consultas} consultas</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${doctor.taxa}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
