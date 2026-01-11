import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Plus, Trash2, Download, Send, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: any;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const InvoiceModal = ({ isOpen, onClose, invoice }: InvoiceModalProps) => {
  const [invoiceData, setInvoiceData] = useState({
    patient: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentMethod: "card",
    notes: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Consulta de Cardiologia", quantity: 1, unitPrice: 2500, total: 2500 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: "", quantity: 1, unitPrice: 0, total: 0 },
    ]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updated.total = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const handleSave = () => {
    toast.success("Factura criada com sucesso!");
    onClose();
  };

  const handleSend = () => {
    toast.success("Factura enviada por email!");
    onClose();
  };

  const handlePrint = () => {
    toast.success("Preparando impressão...");
  };

  const handleDownload = () => {
    toast.success("Factura descarregada!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {invoice ? "Ver Factura" : "Nova Factura"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Paciente *</Label>
              <Select
                value={invoiceData.patient}
                onValueChange={(v) => setInvoiceData({ ...invoiceData, patient: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maria">Maria Fernanda Macuácua</SelectItem>
                  <SelectItem value="joao">João Carlos Mondlane</SelectItem>
                  <SelectItem value="ana">Ana Paula Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Método de Pagamento</Label>
              <Select
                value={invoiceData.paymentMethod}
                onValueChange={(v) => setInvoiceData({ ...invoiceData, paymentMethod: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Cartão</SelectItem>
                  <SelectItem value="cash">Numerário</SelectItem>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="transfer">Transferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data de Emissão</Label>
              <Input
                type="date"
                value={invoiceData.date}
                onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <Input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
              />
            </div>
          </div>

          {/* Items Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Itens</Label>
              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="w-4 h-4 mr-1" />
                Adicionar Item
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium">Descrição</th>
                    <th className="text-center px-4 py-3 text-sm font-medium w-24">Qtd</th>
                    <th className="text-right px-4 py-3 text-sm font-medium w-32">Preço Unit.</th>
                    <th className="text-right px-4 py-3 text-sm font-medium w-32">Total</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          placeholder="Descrição do serviço"
                          className="h-9"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                          className="h-9 text-center"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                          className="h-9 text-right"
                        />
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {item.total.toLocaleString("pt-MZ")} MT
                      </td>
                      <td className="px-2 py-3">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-72 space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{subtotal.toLocaleString("pt-MZ")} MT</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">IVA (16%)</span>
                <span className="font-medium">{iva.toLocaleString("pt-MZ")} MT</span>
              </div>
              <div className="flex justify-between py-3 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  {total.toLocaleString("pt-MZ")} MT
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              placeholder="Notas adicionais para o paciente..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              PDF
            </Button>
          </div>
          <div className="flex-1" />
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleSend}>
            <Send className="w-4 h-4 mr-1" />
            Enviar
          </Button>
          <Button onClick={handleSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
