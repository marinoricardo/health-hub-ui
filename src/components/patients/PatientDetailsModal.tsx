import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  Pill,
  Users,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: any;
}

const PatientDetailsModal = ({ isOpen, onClose, patient }: PatientDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [familyHistory, setFamilyHistory] = useState([
    { id: "1", relation: "Pai", condition: "Diabetes Tipo 2", age: 68 },
    { id: "2", relation: "Mãe", condition: "Hipertensão", age: 65 },
  ]);
  const [allergies, setAllergies] = useState([
    { id: "1", allergen: "Penicilina", severity: "high", reaction: "Anafilaxia" },
    { id: "2", allergen: "Dipirona", severity: "medium", reaction: "Urticária" },
  ]);
  const [medications, setMedications] = useState([
    { id: "1", name: "Losartana 50mg", dosage: "1x ao dia", since: "2020", active: true },
    { id: "2", name: "Metformina 850mg", dosage: "2x ao dia", since: "2019", active: true },
  ]);
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [newAllergy, setNewAllergy] = useState({ allergen: "", severity: "medium", reaction: "" });
  const [newFamily, setNewFamily] = useState({ relation: "", condition: "", age: "" });

  const handleAddAllergy = () => {
    if (newAllergy.allergen) {
      setAllergies([...allergies, { ...newAllergy, id: Date.now().toString() }]);
      setNewAllergy({ allergen: "", severity: "medium", reaction: "" });
      setShowAddAllergy(false);
      toast.success("Alergia adicionada!");
    }
  };

  const handleAddFamily = () => {
    if (newFamily.relation && newFamily.condition) {
      setFamilyHistory([...familyHistory, { ...newFamily, id: Date.now().toString(), age: parseInt(newFamily.age) || 0 }]);
      setNewFamily({ relation: "", condition: "", age: "" });
      setShowAddFamily(false);
      toast.success("Histórico familiar adicionado!");
    }
  };

  const removeAllergy = (id: string) => {
    setAllergies(allergies.filter((a) => a.id !== id));
    toast.success("Alergia removida!");
  };

  const removeFamily = (id: string) => {
    setFamilyHistory(familyHistory.filter((f) => f.id !== id));
    toast.success("Histórico removido!");
  };

  const severityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning-foreground border-warning/20",
    low: "bg-success/10 text-success border-success/20",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">MF</span>
            </div>
            <div>
              <span className="text-xl">Maria Fernanda Macuácua</span>
              <p className="text-sm text-muted-foreground font-normal">39 anos • Feminino • NUIT: 100123456</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-xl">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Dados Médicos
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Histórico Familiar
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documentos
            </TabsTrigger>
          </TabsList>

          {/* Personal Data */}
          <TabsContent value="personal" className="space-y-6 mt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input defaultValue="Maria Fernanda Macuácua" />
              </div>
              <div className="space-y-2">
                <Label>Data de Nascimento</Label>
                <Input type="date" defaultValue="1985-05-15" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="maria.macuacua@email.co.mz" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="+258 84 123 4567" />
                </div>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Endereço</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="Av. Eduardo Mondlane, 123, Flat 4" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input defaultValue="Maputo" />
              </div>
              <div className="space-y-2">
                <Label>Província</Label>
                <Input defaultValue="Maputo Cidade" />
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="font-semibold mb-4">Contacto de Emergência</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input defaultValue="João Macuácua" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="+258 82 234 5678" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Medical Data */}
          <TabsContent value="medical" className="space-y-6 mt-6">
            {/* Allergies Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Alergias
                </h4>
                <Button size="sm" variant="outline" onClick={() => setShowAddAllergy(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>

              {showAddAllergy && (
                <div className="p-4 rounded-xl bg-muted/50 mb-4 animate-fade-in">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input
                      placeholder="Alérgeno"
                      value={newAllergy.allergen}
                      onChange={(e) => setNewAllergy({ ...newAllergy, allergen: e.target.value })}
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newAllergy.severity}
                      onChange={(e) => setNewAllergy({ ...newAllergy, severity: e.target.value })}
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                    <Input
                      placeholder="Reação"
                      value={newAllergy.reaction}
                      onChange={(e) => setNewAllergy({ ...newAllergy, reaction: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => setShowAddAllergy(false)}>
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={handleAddAllergy}>
                      Salvar
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {allergies.map((allergy) => (
                  <div
                    key={allergy.id}
                    className={cn("flex items-center justify-between p-3 rounded-lg border", severityColors[allergy.severity as keyof typeof severityColors])}
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4" />
                      <div>
                        <p className="font-medium">{allergy.allergen}</p>
                        <p className="text-xs opacity-80">{allergy.reaction}</p>
                      </div>
                    </div>
                    <button onClick={() => removeAllergy(allergy.id)} className="p-1 hover:bg-background/50 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Pill className="w-5 h-5 text-secondary" />
                  Medicação Atual
                </h4>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Pill className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-xs text-muted-foreground">{med.dosage} • Desde {med.since}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                      Ativo
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-warning" />
                Condições Crónicas
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning-foreground text-sm font-medium border border-warning/20">
                  Hipertensão
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning-foreground text-sm font-medium border border-warning/20">
                  Diabetes Tipo 2
                </span>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Family History */}
          <TabsContent value="family" className="space-y-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Histórico Familiar
              </h4>
              <Button size="sm" variant="outline" onClick={() => setShowAddFamily(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>

            {showAddFamily && (
              <div className="p-4 rounded-xl bg-muted/50 mb-4 animate-fade-in">
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    placeholder="Parentesco (ex: Pai, Mãe)"
                    value={newFamily.relation}
                    onChange={(e) => setNewFamily({ ...newFamily, relation: e.target.value })}
                  />
                  <Input
                    placeholder="Condição"
                    value={newFamily.condition}
                    onChange={(e) => setNewFamily({ ...newFamily, condition: e.target.value })}
                  />
                  <Input
                    placeholder="Idade"
                    type="number"
                    value={newFamily.age}
                    onChange={(e) => setNewFamily({ ...newFamily, age: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="ghost" size="sm" onClick={() => setShowAddFamily(false)}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleAddFamily}>
                    Salvar
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {familyHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.relation}</p>
                      <p className="text-sm text-muted-foreground">{item.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{item.age} anos</span>
                    <button onClick={() => removeFamily(item.id)} className="p-1 hover:bg-muted rounded">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-6 mt-6">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="font-semibold mb-2">Carregar Documentos</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Arraste ficheiros ou clique para seleccionar
              </p>
              <Button variant="outline">
                Seleccionar Ficheiros
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                PDF, JPG, PNG até 10MB
              </p>
            </div>

            <div className="space-y-3">
              {[
                { name: "Laudo ECG 2024.pdf", type: "pdf", size: "245 KB", date: "10/10/2024" },
                { name: "Raio-X Tórax.jpg", type: "image", size: "1.2 MB", date: "05/08/2024" },
                { name: "Exames Laboratoriais.pdf", type: "pdf", size: "890 KB", date: "20/01/2025" },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => { toast.success("Alterações salvas!"); onClose(); }}>
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
