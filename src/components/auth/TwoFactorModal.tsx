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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Smartphone, Check, Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "intro" | "setup" | "verify" | "backup" | "complete";

const TwoFactorModal = ({ isOpen, onClose }: TwoFactorModalProps) => {
  const [step, setStep] = useState<Step>("intro");
  const [verifyCode, setVerifyCode] = useState("");
  const [backupCodes] = useState([
    "ABC123XY",
    "DEF456ZW",
    "GHI789UV",
    "JKL012ST",
    "MNO345QR",
    "PQR678OP",
    "STU901MN",
    "VWX234KL",
  ]);

  const handleVerify = () => {
    if (verifyCode.length !== 6) {
      toast.error("Por favor, insira o código de 6 dígitos");
      return;
    }
    setStep("backup");
  };

  const handleComplete = () => {
    toast.success("Autenticação de dois fatores activada!");
    onClose();
    setStep("intro");
    setVerifyCode("");
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    toast.success("Códigos copiados para a área de transferência");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); setStep("intro"); } }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {step === "intro" && "Autenticação de Dois Fatores"}
            {step === "setup" && "Configurar Autenticador"}
            {step === "verify" && "Verificar Código"}
            {step === "backup" && "Códigos de Backup"}
            {step === "complete" && "2FA Activado"}
          </DialogTitle>
          <DialogDescription>
            {step === "intro" && "Adicione uma camada extra de segurança à sua conta"}
            {step === "setup" && "Digitalize o código QR com o seu autenticador"}
            {step === "verify" && "Insira o código do seu aplicativo autenticador"}
            {step === "backup" && "Guarde estes códigos em local seguro"}
            {step === "complete" && "A sua conta está agora mais segura"}
          </DialogDescription>
        </DialogHeader>

        {/* Intro Step */}
        {step === "intro" && (
          <div className="py-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Proteja a sua conta</h3>
            <p className="text-sm text-muted-foreground mb-6">
              A autenticação de dois fatores adiciona uma camada extra de segurança.
              Além da sua senha, precisará de um código do seu telemóvel para fazer login.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-left">
                <Smartphone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Aplicativos Suportados</p>
                  <p className="text-xs text-muted-foreground">
                    Google Authenticator, Authy, Microsoft Authenticator
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Step */}
        {step === "setup" && (
          <div className="py-6 text-center">
            <div className="w-48 h-48 mx-auto mb-6 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              {/* Placeholder for QR Code */}
              <div className="text-center">
                <QrCode className="w-24 h-24 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">QR Code</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Abra o seu aplicativo autenticador e digitalize este código QR
            </p>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Ou insira manualmente:</p>
              <p className="font-mono text-sm font-medium select-all">
                JBSWY3DPEHPK3PXP
              </p>
            </div>
          </div>
        )}

        {/* Verify Step */}
        {step === "verify" && (
          <div className="py-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Insira o código de 6 dígitos do seu autenticador
              </p>
            </div>

            <div className="space-y-2">
              <Label>Código de Verificação</Label>
              <Input
                type="text"
                placeholder="000000"
                maxLength={6}
                className="h-14 text-center text-2xl tracking-[0.5em] font-mono"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
        )}

        {/* Backup Codes Step */}
        {step === "backup" && (
          <div className="py-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-warning" />
              </div>
              <p className="text-sm text-muted-foreground">
                Guarde estes códigos em local seguro. Pode usá-los se perder
                acesso ao seu autenticador.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 mb-4">
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="font-mono text-sm text-center py-2 px-3 bg-background rounded-lg"
                  >
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={copyBackupCodes}>
              <Copy className="w-4 h-4 mr-2" />
              Copiar Códigos
            </Button>

            <p className="text-xs text-destructive text-center mt-4">
              ⚠️ Estes códigos não serão mostrados novamente!
            </p>
          </div>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <div className="py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Tudo Pronto!</h3>
            <p className="text-sm text-muted-foreground">
              A autenticação de dois fatores está agora activa na sua conta.
              Da próxima vez que fizer login, precisará do código do seu autenticador.
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => { onClose(); setStep("intro"); }}>
            {step === "complete" ? "Fechar" : "Cancelar"}
          </Button>
          {step === "intro" && (
            <Button onClick={() => setStep("setup")}>
              Começar Configuração
            </Button>
          )}
          {step === "setup" && (
            <Button onClick={() => setStep("verify")}>
              Próximo
            </Button>
          )}
          {step === "verify" && (
            <Button onClick={handleVerify}>
              Verificar
            </Button>
          )}
          {step === "backup" && (
            <Button onClick={() => setStep("complete")}>
              Já Guardei
            </Button>
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

export default TwoFactorModal;
