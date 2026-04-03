import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { FileText, Plus, Search, Printer, Download, Eye, Pill, ClipboardCheck, FileCheck, Filter, MoreVertical, Calendar, User, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const prescriptionsData = [
  { id: "1", patient: "Maria Nguema", doctor: "Dr. João Silva", date: "03/04/2026", type: "prescription", status: "active", items: ["Amoxicilina 500mg - 8/8h por 7 dias", "Paracetamol 500mg - SOS"] },
  { id: "2", patient: "Carlos Machel", doctor: "Dr. Ana Mondlane", date: "02/04/2026", type: "prescription", status: "active", items: ["Metformina 850mg - 12/12h", "Losartan 50mg - 1x/dia"] },
  { id: "3", patient: "Fátima Chissano", doctor: "Dr. João Silva", date: "01/04/2026", type: "certificate", status: "issued", days: 3, reason: "Gripe" },
  { id: "4", patient: "Alberto Guebuza", doctor: "Dr. Ana Mondlane", date: "31/03/2026", type: "referral", status: "pending", specialty: "Cardiologia", hospital: "Hospital Central de Maputo" },
  { id: "5", patient: "Rosa Cossa", doctor: "Dr. João Silva", date: "30/03/2026", type: "prescription", status: "dispensed", items: ["Omeprazol 20mg - 1x/dia", "Domperidona 10mg - antes das refeições"] },
  { id: "6", patient: "Manuel Sitoe", doctor: "Dr. Ana Mondlane", date: "29/03/2026", type: "certificate", status: "issued", days: 5, reason: "Pós-operatório" },
];

const Prescriptions = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [docType, setDocType] = useState("prescription");

  // New prescription form
  const [newForm, setNewForm] = useState({
    patient: "", medications: "", dosage: "", duration: "", notes: "",
    // Certificate fields
    days: "", reason: "",
    // Referral fields
    specialty: "", hospital: "", referralReason: "",
  });

  const filtered = prescriptionsData.filter(p => {
    const matchSearch = p.patient.toLowerCase().includes(search.toLowerCase()) || p.doctor.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "all") return matchSearch;
    return matchSearch && p.type === activeTab;
  });

  const handleView = (item: any) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handlePrint = (item: any) => {
    toast.success(`A imprimir ${item.type === "prescription" ? "receita" : item.type === "certificate" ? "atestado" : "guia"} de ${item.patient}`);
  };

  const handleCreate = () => {
    toast.success(`${docType === "prescription" ? "Receita" : docType === "certificate" ? "Atestado" : "Guia de referência"} criado(a) com sucesso!`);
    setShowNewModal(false);
    setNewForm({ patient: "", medications: "", dosage: "", duration: "", notes: "", days: "", reason: "", specialty: "", hospital: "", referralReason: "" });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prescription": return <Pill className="w-5 h-5 text-primary" />;
      case "certificate": return <ClipboardCheck className="w-5 h-5 text-warning" />;
      case "referral": return <FileCheck className="w-5 h-5 text-info" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "prescription": return "Receita Médica";
      case "certificate": return "Atestado Médico";
      case "referral": return "Guia de Referência";
      default: return type;
    }
  };

  const getStatusPill = (status: string) => {
    const map: Record<string, { class: string; label: string }> = {
      active: { class: "status-confirmed", label: "Activa" },
      dispensed: { class: "status-completed", label: "Dispensada" },
      issued: { class: "status-confirmed", label: "Emitido" },
      pending: { class: "status-scheduled", label: "Pendente" },
      expired: { class: "status-cancelled", label: "Expirada" },
    };
    const s = map[status] || { class: "", label: status };
    return <span className={`status-pill ${s.class}`}>{s.label}</span>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Prescrições & Documentos</h1>
            <p className="text-muted-foreground">Receitas, atestados e guias de referência</p>
          </div>
          <Button onClick={() => setShowNewModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Documento
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Receitas Activas", value: "12", icon: Pill, color: "primary" },
            { label: "Atestados Emitidos", value: "8", icon: ClipboardCheck, color: "warning" },
            { label: "Guias Pendentes", value: "3", icon: FileCheck, color: "info" },
            { label: "Total do Mês", value: "47", icon: FileText, color: "success" },
          ].map((stat, i) => (
            <div key={i} className="health-card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Pesquisar por paciente ou médico..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="prescription">Receitas</TabsTrigger>
              <TabsTrigger value="certificate">Atestados</TabsTrigger>
              <TabsTrigger value="referral">Guias</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="health-card hover:border-primary/20 transition-all cursor-pointer" onClick={() => handleView(item)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{getTypeLabel(item.type)}</h3>
                      {getStatusPill(item.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{item.patient}</span>
                      <span className="flex items-center gap-1"><Stethoscope className="w-3.5 h-3.5" />{item.doctor}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
                    </div>
                    {item.type === "prescription" && item.items && (
                      <p className="text-xs text-muted-foreground mt-1">{item.items.join(" | ")}</p>
                    )}
                    {item.type === "certificate" && (
                      <p className="text-xs text-muted-foreground mt-1">{item.days} dias — {item.reason}</p>
                    )}
                    {item.type === "referral" && (
                      <p className="text-xs text-muted-foreground mt-1">{item.specialty} — {item.hospital}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); handlePrint(item); }}>
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); toast.success("Documento descarregado!"); }}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Document Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Documento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tipo de Documento</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="prescription">Receita Médica</SelectItem>
                  <SelectItem value="certificate">Atestado Médico</SelectItem>
                  <SelectItem value="referral">Guia de Referência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Paciente</Label>
              <Select value={newForm.patient} onValueChange={v => setNewForm({...newForm, patient: v})}>
                <SelectTrigger><SelectValue placeholder="Seleccionar paciente" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="maria">Maria Nguema</SelectItem>
                  <SelectItem value="carlos">Carlos Machel</SelectItem>
                  <SelectItem value="fatima">Fátima Chissano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {docType === "prescription" && (
              <>
                <div>
                  <Label>Medicamentos</Label>
                  <Textarea placeholder="Ex: Amoxicilina 500mg - 8/8h por 7 dias" value={newForm.medications} onChange={e => setNewForm({...newForm, medications: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Dosagem</Label><Input placeholder="Ex: 500mg" value={newForm.dosage} onChange={e => setNewForm({...newForm, dosage: e.target.value})} /></div>
                  <div><Label>Duração</Label><Input placeholder="Ex: 7 dias" value={newForm.duration} onChange={e => setNewForm({...newForm, duration: e.target.value})} /></div>
                </div>
              </>
            )}

            {docType === "certificate" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Dias de Dispensa</Label><Input type="number" placeholder="Ex: 3" value={newForm.days} onChange={e => setNewForm({...newForm, days: e.target.value})} /></div>
                  <div><Label>Motivo</Label><Input placeholder="Ex: Gripe" value={newForm.reason} onChange={e => setNewForm({...newForm, reason: e.target.value})} /></div>
                </div>
              </>
            )}

            {docType === "referral" && (
              <>
                <div><Label>Especialidade</Label>
                  <Select value={newForm.specialty} onValueChange={v => setNewForm({...newForm, specialty: v})}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologia">Cardiologia</SelectItem>
                      <SelectItem value="ortopedia">Ortopedia</SelectItem>
                      <SelectItem value="neurologia">Neurologia</SelectItem>
                      <SelectItem value="oftalmologia">Oftalmologia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Hospital/Clínica de Destino</Label><Input placeholder="Ex: Hospital Central de Maputo" value={newForm.hospital} onChange={e => setNewForm({...newForm, hospital: e.target.value})} /></div>
                <div><Label>Motivo da Referência</Label><Textarea placeholder="Descreva o motivo..." value={newForm.referralReason} onChange={e => setNewForm({...newForm, referralReason: e.target.value})} /></div>
              </>
            )}

            <div><Label>Observações</Label><Textarea placeholder="Notas adicionais..." value={newForm.notes} onChange={e => setNewForm({...newForm, notes: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar Documento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedItem && getTypeLabel(selectedItem.type)}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4 space-y-3 border">
                <div className="text-center border-b pb-3">
                  <h3 className="font-bold text-lg">Clínica Central Maputo</h3>
                  <p className="text-xs text-muted-foreground">Av. Eduardo Mondlane, 1234 — Maputo, Moçambique</p>
                  <p className="text-xs text-muted-foreground">Tel: +258 21 123 456 | NUIT: 123456789</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Paciente:</span> <span className="font-medium">{selectedItem.patient}</span></div>
                  <div><span className="text-muted-foreground">Data:</span> <span className="font-medium">{selectedItem.date}</span></div>
                  <div><span className="text-muted-foreground">Médico:</span> <span className="font-medium">{selectedItem.doctor}</span></div>
                  <div><span className="text-muted-foreground">Estado:</span> {getStatusPill(selectedItem.status)}</div>
                </div>
                {selectedItem.type === "prescription" && selectedItem.items && (
                  <div className="pt-3 border-t">
                    <p className="font-medium mb-2">Medicamentos:</p>
                    <ul className="space-y-1">
                      {selectedItem.items.map((item: string, i: number) => (
                        <li key={i} className="text-sm flex items-start gap-2"><span className="text-primary font-bold">{i + 1}.</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedItem.type === "certificate" && (
                  <div className="pt-3 border-t text-sm">
                    <p>Atesta-se que o(a) paciente <strong>{selectedItem.patient}</strong> esteve em consulta médica e necessita de <strong>{selectedItem.days} dias</strong> de repouso por motivo de <strong>{selectedItem.reason}</strong>.</p>
                  </div>
                )}
                {selectedItem.type === "referral" && (
                  <div className="pt-3 border-t text-sm">
                    <p>Solicita-se a avaliação do(a) paciente <strong>{selectedItem.patient}</strong> pela especialidade de <strong>{selectedItem.specialty}</strong> no(a) <strong>{selectedItem.hospital}</strong>.</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => { handlePrint(selectedItem); setShowViewModal(false); }}><Printer className="w-4 h-4 mr-2" />Imprimir</Button>
                <Button variant="outline" className="flex-1" onClick={() => { toast.success("PDF descarregado!"); setShowViewModal(false); }}><Download className="w-4 h-4 mr-2" />Descarregar PDF</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Prescriptions;
