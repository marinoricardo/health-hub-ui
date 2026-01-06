import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CreditCard, Download, CheckCircle2, AlertCircle, TrendingUp, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const currentPlan = { name: "Professional", price: "R$ 399", period: "/mês", patients: { used: 1847, limit: 3000 }, professionals: { used: 7, limit: 10 }, storage: { used: 12.4, limit: 50 } };

const invoices = [
  { id: "1", date: "01/01/2025", amount: "R$ 399,00", status: "paid" },
  { id: "2", date: "01/12/2024", amount: "R$ 399,00", status: "paid" },
  { id: "3", date: "01/11/2024", amount: "R$ 399,00", status: "paid" },
  { id: "4", date: "01/10/2024", amount: "R$ 399,00", status: "paid" },
];

const plans = [
  { id: "starter", name: "Starter", price: "R$ 199", features: ["500 pacientes", "3 profissionais", "10 GB", "Suporte email"], current: false },
  { id: "professional", name: "Professional", price: "R$ 399", features: ["3.000 pacientes", "10 profissionais", "50 GB", "Suporte prioritário"], current: true, popular: true },
  { id: "enterprise", name: "Enterprise", price: "Personalizado", features: ["Ilimitado", "Ilimitado", "500 GB", "Suporte dedicado"], current: false },
];

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Faturação</h1>
            <p className="text-muted-foreground">Gerencie seu plano e pagamentos</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="health-card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{currentPlan.name}</span>
                  <div className="mt-3"><span className="text-3xl font-bold">{currentPlan.price}</span><span className="text-muted-foreground">{currentPlan.period}</span></div>
                </div>
                <Button>Fazer Upgrade</Button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Pacientes", used: currentPlan.patients.used, limit: currentPlan.patients.limit, unit: "" },
                  { label: "Profissionais", used: currentPlan.professionals.used, limit: currentPlan.professionals.limit, unit: "" },
                  { label: "Armazenamento", used: currentPlan.storage.used, limit: currentPlan.storage.limit, unit: " GB" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.used}{item.unit} / {item.limit}{item.unit}</span>
                    </div>
                    <Progress value={(item.used / item.limit) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="health-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Histórico de Faturas</h3>
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Exportar</Button>
              </div>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Fatura - {invoice.date}</p>
                        <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="status-pill status-confirmed">Pago</span>
                      <Button variant="ghost" size="icon-sm"><Download className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="health-card">
              <h3 className="font-semibold mb-4">Método de Pagamento</h3>
              <div className="p-4 rounded-lg bg-muted/50 flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expira 12/26</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">Alterar Cartão</Button>
            </div>

            <div className="health-card">
              <h3 className="font-semibold mb-4">Próxima Cobrança</h3>
              <div className="text-center py-4">
                <p className="text-3xl font-bold">R$ 399,00</p>
                <p className="text-muted-foreground">01 de Fevereiro, 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="health-card">
          <h3 className="font-semibold mb-6">Comparar Planos</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.id} className={cn("p-6 rounded-xl border-2 transition-all", plan.current ? "border-primary bg-primary/5" : "border-border hover:border-primary/50", plan.popular && "relative")}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Popular</span>}
                <h4 className="font-semibold text-lg">{plan.name}</h4>
                <p className="text-2xl font-bold mt-2">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f, i) => (<li key={i} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" />{f}</li>))}
                </ul>
                <Button variant={plan.current ? "outline" : "default"} className="w-full mt-6" disabled={plan.current}>
                  {plan.current ? "Plano Atual" : "Selecionar"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
