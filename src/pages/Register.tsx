import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Activity, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User, 
  Phone,
  Building2,
  Stethoscope,
  ArrowLeft,
  Check,
  Upload
} from "lucide-react";

const specialties = [
  "Clínica Geral",
  "Cardiologia",
  "Dermatologia",
  "Ortopedia",
  "Pediatria",
  "Ginecologia",
  "Oftalmologia",
  "Odontologia",
  "Psicologia",
  "Fisioterapia",
  "Nutrição",
  "Outra",
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

  const totalSteps = 3;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Seus dados</h2>
              <p className="text-sm text-muted-foreground">
                Informações básicas para criar sua conta
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Dr. João Silva"
                  className="pl-10 h-12 input-healthcare"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail profissional</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com"
                  className="pl-10 h-12 input-healthcare"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+55 11 99999-9999"
                  className="pl-10 h-12 input-healthcare"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Mínimo 8 caracteres"
                  className="pl-10 pr-10 h-12 input-healthcare"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use letras, números e caracteres especiais
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Dados da clínica</h2>
              <p className="text-sm text-muted-foreground">
                Configure sua primeira clínica na plataforma
              </p>
            </div>

            {/* Clinic Name */}
            <div className="space-y-2">
              <Label htmlFor="clinicName">Nome da clínica</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="clinicName" 
                  type="text" 
                  placeholder="Clínica São Paulo"
                  className="pl-10 h-12 input-healthcare"
                />
              </div>
            </div>

            {/* Specialty */}
            <div className="space-y-2">
              <Label>Especialidade principal</Label>
              <div className="grid grid-cols-3 gap-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedSpecialty === specialty
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Logo da clínica (opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium">Arraste uma imagem ou clique para selecionar</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 2MB</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Tudo pronto!</h2>
              <p className="text-sm text-muted-foreground">
                Revise os dados e finalize sua conta
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-muted/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Clínica São Paulo</p>
                  <p className="text-muted-foreground">{selectedSpecialty || "Clínica Geral"}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>Prontuário eletrônico ilimitado</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>Agenda inteligente</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>Gestão de equipe</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>14 dias de teste grátis</span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                Aceito os{" "}
                <a href="#" className="text-primary hover:underline">Termos de Uso</a>
                {" "}e a{" "}
                <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                . Estou ciente que meus dados serão tratados conforme a LGPD.
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="w-full max-w-lg mx-auto">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">HealthSync</span>
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < totalSteps && (
                  <div className={`w-16 h-1 rounded-full transition-colors ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <form className="space-y-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Voltar
                </Button>
              )}
              <Button 
                type="button"
                variant="hero" 
                size="lg" 
                className="flex-1"
                onClick={() => step < totalSteps ? setStep(step + 1) : null}
              >
                {step === totalSteps ? "Criar Conta" : "Continuar"}
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Fazer login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-secondary via-secondary/90 to-primary relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white" />
          <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full border border-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-16">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Comece gratuitamente
            </h2>
            <p className="text-white/80 max-w-md">
              Configure sua clínica em minutos. Sem cartão de crédito. 
              14 dias para testar todas as funcionalidades.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 text-left max-w-sm">
            {[
              "Prontuário eletrônico completo",
              "Agenda inteligente com lembretes",
              "Gestão de múltiplas clínicas",
              "Relatórios e indicadores",
              "Suporte dedicado",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
