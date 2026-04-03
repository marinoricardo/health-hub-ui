import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Smartphone, Banknote, Receipt, Plus, Search, Download, Filter, Eye, MoreVertical, ArrowUpRight, ArrowDownRight, Calendar, Users, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const transactions = [
  { id: "1", patient: "Maria Nguema", service: "Consulta Geral", amount: 1500, method: "mpesa", date: "03/04/2026", time: "09:15", status: "paid", ref: "MP-2026040301" },
  { id: "2", patient: "Carlos Machel", service: "ECG + Consulta Cardiologia", amount: 4500, method: "emola", date: "03/04/2026", time: "10:30", status: "paid", ref: "EM-2026040302" },
  { id: "3", patient: "Fátima Chissano", service: "Consulta Geral", amount: 1500, method: "cash", date: "03/04/2026", time: "11:00", status: "paid", ref: "CX-2026040303" },
  { id: "4", patient: "Alberto Guebuza", service: "Hemograma + Glicemia", amount: 2800, method: "pos", date: "03/04/2026", time: "14:00", status: "paid", ref: "PS-2026040304" },
  { id: "5", patient: "Rosa Cossa", service: "Consulta Ortopedia", amount: 2000, method: "mpesa", date: "02/04/2026", time: "16:00", status: "pending", ref: "MP-2026040205" },
  { id: "6", patient: "Manuel Sitoe", service: "Ecografia Abdominal", amount: 3500, method: "cash", date: "02/04/2026", time: "09:00", status: "overdue", ref: "CX-2026040206" },
];

const receivables = [
  { id: "1", patient: "Rosa Cossa", total: 2000, paid: 0, due: "05/04/2026", status: "pending" },
  { id: "2", patient: "Manuel Sitoe", total: 3500, paid: 1000, due: "01/04/2026", status: "overdue" },
  { id: "3", patient: "João Tembe", total: 5000, paid: 2500, due: "10/04/2026", status: "partial" },
];

const Finance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const filtered = transactions.filter(t =>
    t.patient.toLowerCase().includes(search.toLowerCase()) ||
    t.service.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = transactions.filter(t => t.status === "paid").reduce((s, t) => s + t.amount, 0);
  const totalPending = transactions.filter(t => t.status === "pending").reduce((s, t) => s + t.amount, 0);
  const totalOverdue = transactions.filter(t => t.status === "overdue").reduce((s, t) => s + t.amount, 0);

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "mpesa": return <Smartphone className="w-4 h-4 text-destructive" />;
      case "emola": return <Smartphone className="w-4 h-4 text-primary" />;
      case "pos": return <CreditCard className="w-4 h-4 text-info" />;
      case "cash": return <Banknote className="w-4 h-4 text-success" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getMethodLabel = (method: string) => {
    const map: Record<string, string> = { mpesa: "M-Pesa", emola: "e-Mola", pos: "POS/Cartão", cash: "Numerário" };
    return map[method] || method;
  };

  const getStatusPill = (status: string) => {
    const map: Record<string, { class: string; label: string }> = {
      paid: { class: "status-confirmed", label: "Pago" },
      pending: { class: "status-scheduled", label: "Pendente" },
      overdue: { class: "status-cancelled", label: "Em Atraso" },
      partial: { class: "status-in-progress", label: "Parcial" },
    };
    const s = map[status] || { class: "", label: status };
    return <span className={`status-pill ${s.class}`}>{s.label}</span>;
  };

  const handleViewReceipt = (t: any) => {
    setSelectedTransaction(t);
    setShowReceiptModal(true);
  };

  const handleCreatePayment = () => {
    toast.success(`Pagamento registado via ${getMethodLabel(paymentMethod)}!`);
    setShowPaymentModal(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Gestão Financeira</h1>
            <p className="text-muted-foreground">Caixa, pagamentos e contas a receber</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.success("Relatório financeiro exportado!")}><Download className="w-4 h-4 mr-2" />Exportar</Button>
            <Button onClick={() => setShowPaymentModal(true)}><Plus className="w-4 h-4 mr-2" />Registar Pagamento</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Receita Hoje", value: `${(totalRevenue).toLocaleString()} MT`, icon: TrendingUp, color: "success", change: "+12%" },
            { label: "Pendente", value: `${(totalPending).toLocaleString()} MT`, icon: Clock, color: "warning", change: "2 facturas" },
            { label: "Em Atraso", value: `${(totalOverdue).toLocaleString()} MT`, icon: XCircle, color: "destructive", change: "1 factura" },
            { label: "Transacções Hoje", value: "4", icon: Receipt, color: "primary", change: "+3 vs ontem" },
          ].map((stat, i) => (
            <div key={i} className="health-card">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Payment Methods Breakdown */}
        <div className="health-card">
          <h3 className="font-semibold mb-4">Métodos de Pagamento — Hoje</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { method: "M-Pesa", icon: Smartphone, amount: 3500, count: 2, color: "destructive" },
              { method: "e-Mola", icon: Smartphone, amount: 4500, count: 1, color: "primary" },
              { method: "Numerário", icon: Banknote, amount: 1500, count: 1, color: "success" },
              { method: "POS/Cartão", icon: CreditCard, amount: 2800, count: 1, color: "info" },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 text-center">
                <m.icon className={`w-8 h-8 text-${m.color} mx-auto mb-2`} />
                <p className="font-semibold">{m.amount.toLocaleString()} MT</p>
                <p className="text-xs text-muted-foreground">{m.method} ({m.count})</p>
              </div>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Caixa do Dia</TabsTrigger>
            <TabsTrigger value="receivables">Contas a Receber</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Pesquisar transacções..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="space-y-3">
              {filtered.map(t => (
                <div key={t.id} className="health-card hover:border-primary/20 transition-all cursor-pointer" onClick={() => handleViewReceipt(t)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                        {getMethodIcon(t.method)}
                      </div>
                      <div>
                        <p className="font-medium">{t.patient}</p>
                        <p className="text-sm text-muted-foreground">{t.service}</p>
                        <p className="text-xs text-muted-foreground">{t.date} {t.time} · Ref: {t.ref}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{t.amount.toLocaleString()} MT</p>
                      <div className="flex items-center gap-2 justify-end mt-1">
                        {getStatusPill(t.status)}
                        <span className="text-xs text-muted-foreground">{getMethodLabel(t.method)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="receivables" className="mt-4 space-y-4">
            <div className="space-y-3">
              {receivables.map(r => (
                <div key={r.id} className="health-card">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{r.patient}</p>
                      <p className="text-sm text-muted-foreground">Vencimento: {r.due}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{r.total.toLocaleString()} MT</p>
                      {getStatusPill(r.status)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Pago: {r.paid.toLocaleString()} MT</span>
                      <span>Restante: {(r.total - r.paid).toLocaleString()} MT</span>
                    </div>
                    <Progress value={(r.paid / r.total) * 100} className="h-2" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={() => { setShowPaymentModal(true); }}>Registar Pagamento</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Lembrete enviado por SMS!")}>Enviar Lembrete</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Registar Pagamento</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Paciente</Label>
              <Select><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="maria">Maria Nguema</SelectItem>
                  <SelectItem value="carlos">Carlos Machel</SelectItem>
                  <SelectItem value="rosa">Rosa Cossa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Serviço</Label>
              <Select><SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="consulta">Consulta Geral — 1.500 MT</SelectItem>
                  <SelectItem value="ecg">ECG — 3.000 MT</SelectItem>
                  <SelectItem value="hemograma">Hemograma — 800 MT</SelectItem>
                  <SelectItem value="ecografia">Ecografia — 3.500 MT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Valor (MT)</Label><Input type="number" placeholder="0" /></div>
            <div><Label>Método de Pagamento</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { id: "mpesa", label: "M-Pesa", icon: Smartphone, color: "destructive" },
                  { id: "emola", label: "e-Mola", icon: Smartphone, color: "primary" },
                  { id: "cash", label: "Numerário", icon: Banknote, color: "success" },
                  { id: "pos", label: "POS/Cartão", icon: CreditCard, color: "info" },
                ].map(m => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                    className={cn("p-3 rounded-xl border-2 flex items-center gap-2 transition-all",
                      paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}>
                    <m.icon className={`w-5 h-5 text-${m.color}`} />
                    <span className="text-sm font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {(paymentMethod === "mpesa" || paymentMethod === "emola") && (
              <div><Label>Número de Telefone</Label><Input placeholder="+258 84 xxx xxxx" /></div>
            )}
            <div><Label>Observações</Label><Textarea placeholder="Notas adicionais..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>Cancelar</Button>
            <Button onClick={handleCreatePayment}>Confirmar Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Modal */}
      <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Recibo</DialogTitle></DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-6 border text-center space-y-3">
                <h3 className="font-bold text-lg">Clínica Central Maputo</h3>
                <p className="text-xs text-muted-foreground">NUIT: 123456789 | Av. Eduardo Mondlane, Maputo</p>
                <div className="border-t border-dashed pt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Paciente:</span><span className="font-medium">{selectedTransaction.patient}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Serviço:</span><span className="font-medium">{selectedTransaction.service}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Data:</span><span>{selectedTransaction.date} {selectedTransaction.time}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Método:</span><span>{getMethodLabel(selectedTransaction.method)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Referência:</span><span>{selectedTransaction.ref}</span></div>
                </div>
                <div className="border-t border-dashed pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span><span>{selectedTransaction.amount.toLocaleString()} MT</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Obrigado pela preferência!</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => { toast.success("A imprimir recibo..."); setShowReceiptModal(false); }}>
                  <Receipt className="w-4 h-4 mr-2" />Imprimir
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => { toast.success("Recibo enviado por SMS!"); setShowReceiptModal(false); }}>
                  <Smartphone className="w-4 h-4 mr-2" />Enviar SMS
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Finance;
