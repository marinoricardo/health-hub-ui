import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, Building2 } from "lucide-react";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula login - remover quando integrar backend
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Mock clinics for multi-clinic selection
  const userClinics = [
    { id: "1", name: "Clínica São Paulo", role: "Médico" },
    { id: "2", name: "Centro Médico Vida", role: "Administrador" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">HealthSync</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
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

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
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
            </div>

            {/* Multi-Clinic Selection (shown after successful login) */}
            {userClinics.length > 1 && (
              <div className="space-y-3">
                <Label>Selecione a clínica</Label>
                <div className="space-y-2">
                  {userClinics.map((clinic) => (
                    <button
                      key={clinic.id}
                      type="button"
                      onClick={() => setSelectedClinic(clinic.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        selectedClinic === clinic.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedClinic === clinic.id ? "bg-primary/10" : "bg-muted"
                      }`}>
                        <Building2 className={`w-5 h-5 ${
                          selectedClinic === clinic.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{clinic.name}</p>
                        <p className="text-sm text-muted-foreground">{clinic.role}</p>
                      </div>
                      {selectedClinic === clinic.id && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Manter-me conectado
              </Label>
            </div>

            {/* Submit */}
            <Button variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
              {!isLoading && <ArrowRight className="w-5 h-5 ml-1" />}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-muted-foreground">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-info relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white" />
          <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-16">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Gestão Clínica Simplificada
            </h2>
            <p className="text-white/80 max-w-md">
              Acesse prontuários, agendas e relatórios de qualquer lugar. 
              Tudo em uma plataforma segura e intuitiva.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">2.5K+</p>
              <p className="text-white/60 text-sm">Clínicas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-white/60 text-sm">Profissionais</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">2M+</p>
              <p className="text-white/60 text-sm">Pacientes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword} 
        onClose={() => setShowForgotPassword(false)} 
      />
    </div>
  );
};

export default Login;
