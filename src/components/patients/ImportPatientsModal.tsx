import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImportPatientsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ImportStep = "upload" | "preview" | "importing" | "complete";

interface PreviewData {
  valid: number;
  invalid: number;
  total: number;
  errors: string[];
  sample: { name: string; email: string; phone: string; status: "valid" | "error"; error?: string }[];
}

const ImportPatientsModal = ({ isOpen, onClose }: ImportPatientsModalProps) => {
  const [step, setStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv"))) {
      setFile(droppedFile);
      simulatePreview();
    } else {
      toast.error("Por favor, seleccione um ficheiro CSV");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      simulatePreview();
    }
  };

  const simulatePreview = () => {
    // Simula a análise do ficheiro
    setTimeout(() => {
      setPreviewData({
        valid: 142,
        invalid: 8,
        total: 150,
        errors: [
          "Linha 23: Email inválido",
          "Linha 45: Telefone em formato incorreto",
          "Linha 67: Data de nascimento inválida",
          "Linha 89: Campo nome vazio",
          "Linha 102: Email duplicado",
          "Linha 115: NUIT já existente",
          "Linha 128: Formato de data incorreto",
          "Linha 143: Campo obrigatório ausente",
        ],
        sample: [
          { name: "Ana Maria Santos", email: "ana.santos@email.com", phone: "+258 84 111 2222", status: "valid" },
          { name: "Pedro José Almeida", email: "pedro.almeida@email.com", phone: "+258 82 333 4444", status: "valid" },
          { name: "Carla Mendes", email: "carla.mendes", phone: "+258 86 555 6666", status: "error", error: "Email inválido" },
          { name: "João Carlos", email: "joao.carlos@email.com", phone: "+258 84 777 8888", status: "valid" },
          { name: "", email: "sem.nome@email.com", phone: "+258 82 999 0000", status: "error", error: "Nome vazio" },
        ],
      });
      setStep("preview");
    }, 1500);
  };

  const handleImport = () => {
    setStep("importing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("complete");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleComplete = () => {
    toast.success("142 pacientes importados com sucesso!");
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setStep("upload");
    setFile(null);
    setProgress(0);
    setPreviewData(null);
  };

  const downloadTemplate = () => {
    toast.success("Template descarregado!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); resetModal(); } }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar Pacientes</DialogTitle>
          <DialogDescription>
            Importe múltiplos pacientes a partir de um ficheiro CSV
          </DialogDescription>
        </DialogHeader>

        {/* Upload Step */}
        {step === "upload" && (
          <div className="space-y-6">
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-colors",
                dragOver ? "border-primary bg-primary/5" : "border-border",
                file && "border-success bg-success/5"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
            >
              {file ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center">
                    <FileSpreadsheet className="w-7 h-7 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB • A processar...
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Arraste o ficheiro CSV aqui</h4>
                  <p className="text-sm text-muted-foreground mb-4">ou clique para seleccionar</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload">
                    <Button variant="outline" asChild>
                      <span>Seleccionar Ficheiro</span>
                    </Button>
                  </label>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Modelo de Importação</p>
                <p className="text-sm text-muted-foreground">
                  Descarregue o template com todos os campos necessários
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Descarregar
              </Button>
            </div>
          </div>
        )}

        {/* Preview Step */}
        {step === "preview" && previewData && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <p className="text-3xl font-bold">{previewData.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="p-4 rounded-xl bg-success/10 text-center">
                <p className="text-3xl font-bold text-success">{previewData.valid}</p>
                <p className="text-sm text-muted-foreground">Válidos</p>
              </div>
              <div className="p-4 rounded-xl bg-destructive/10 text-center">
                <p className="text-3xl font-bold text-destructive">{previewData.invalid}</p>
                <p className="text-sm text-muted-foreground">Inválidos</p>
              </div>
            </div>

            {/* Sample Preview */}
            <div>
              <h4 className="font-semibold mb-3">Pré-visualização</h4>
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium">Nome</th>
                      <th className="text-left px-4 py-2 font-medium">Email</th>
                      <th className="text-left px-4 py-2 font-medium">Telefone</th>
                      <th className="text-left px-4 py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {previewData.sample.map((row, index) => (
                      <tr key={index} className={cn(row.status === "error" && "bg-destructive/5")}>
                        <td className="px-4 py-2">{row.name || "—"}</td>
                        <td className="px-4 py-2">{row.email}</td>
                        <td className="px-4 py-2">{row.phone}</td>
                        <td className="px-4 py-2">
                          {row.status === "valid" ? (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          ) : (
                            <div className="flex items-center gap-1 text-destructive">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs">{row.error}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Errors */}
            {previewData.errors.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  Erros Detectados ({previewData.errors.length})
                </h4>
                <div className="max-h-32 overflow-y-auto space-y-1 p-3 rounded-xl bg-destructive/5 border border-destructive/20">
                  {previewData.errors.map((error, index) => (
                    <p key={index} className="text-sm text-destructive">{error}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Importing Step */}
        {step === "importing" && (
          <div className="py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileSpreadsheet className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <h4 className="font-semibold mb-2">A importar pacientes...</h4>
            <p className="text-sm text-muted-foreground mb-6">
              {Math.floor(progress)}% concluído
            </p>
            <Progress value={progress} className="max-w-md mx-auto" />
          </div>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <div className="py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Importação Concluída!</h4>
            <p className="text-muted-foreground mb-2">
              <span className="text-success font-medium">142 pacientes</span> foram importados com sucesso
            </p>
            <p className="text-sm text-muted-foreground">
              8 registos com erros foram ignorados
            </p>
          </div>
        )}

        <DialogFooter>
          {step === "upload" && (
            <Button variant="outline" onClick={() => { onClose(); resetModal(); }}>
              Cancelar
            </Button>
          )}
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={() => { setStep("upload"); setFile(null); }}>
                Voltar
              </Button>
              <Button onClick={handleImport} disabled={!previewData || previewData.valid === 0}>
                Importar {previewData?.valid} Pacientes
              </Button>
            </>
          )}
          {step === "complete" && (
            <Button onClick={handleComplete}>
              Concluir
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportPatientsModal;
