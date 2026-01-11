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
import { Mail, ArrowRight, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "email" | "sent" | "reset";

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = () => {
    if (!email) {
      toast.error("Por favor, insira o seu email");
      return;
    }
    // Simular envio
    toast.success("Código enviado!", {
      description: `Verifique a sua caixa de entrada em ${email}`,
    });
    setStep("sent");
  };

  const handleVerifyCode = () => {
    if (code.length < 6) {
      toast.error("Por favor, insira o código de 6 dígitos");
      return;
    }
    // Simular verificação
    setStep("reset");
  };

  const handleResetPassword = () => {
    if (newPassword.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    toast.success("Senha alterada com sucesso!");
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep("email");
    setEmail("");
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); resetForm(); } }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === "email" && "Recuperar Senha"}
            {step === "sent" && "Verificar Código"}
            {step === "reset" && "Nova Senha"}
          </DialogTitle>
          <DialogDescription>
            {step === "email" && "Insira o seu email para receber um código de recuperação"}
            {step === "sent" && "Insira o código de 6 dígitos enviado para o seu email"}
            {step === "reset" && "Crie uma nova senha para a sua conta"}
          </DialogDescription>
        </DialogHeader>

        {/* Email Step */}
        {step === "email" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recovery-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="recovery-email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Sent Step */}
        {step === "sent" && (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-success" />
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Enviámos um código de verificação para<br />
                <strong className="text-foreground">{email}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <Label>Código de Verificação</Label>
              <Input
                type="text"
                placeholder="000000"
                maxLength={6}
                className="h-14 text-center text-2xl tracking-[0.5em] font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <button
              onClick={handleSendCode}
              className="text-sm text-primary hover:underline w-full text-center"
            >
              Não recebeu? Reenviar código
            </button>
          </div>
        )}

        {/* Reset Step */}
        {step === "reset" && (
          <div className="space-y-4 py-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Código verificado! Agora crie uma nova senha.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Nova Senha</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-12"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres</p>
            </div>

            <div className="space-y-2">
              <Label>Confirmar Senha</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step !== "email" && (
            <Button
              variant="ghost"
              onClick={() => setStep(step === "reset" ? "sent" : "email")}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="outline" onClick={() => { onClose(); resetForm(); }}>
            Cancelar
          </Button>
          {step === "email" && (
            <Button onClick={handleSendCode}>
              Enviar Código
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
          {step === "sent" && (
            <Button onClick={handleVerifyCode}>
              Verificar
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
          {step === "reset" && (
            <Button onClick={handleResetPassword}>
              Alterar Senha
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
