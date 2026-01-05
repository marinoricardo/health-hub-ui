import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Plataforma Segura e Certificada</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Gestão de{" "}
              <span className="text-gradient">Prontuário Clínico</span>{" "}
              Inteligente
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              A plataforma SaaS completa para clínicas, consultórios e redes de saúde. 
              Gerencie prontuários, agendas e equipes em um único lugar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Criar Conta Grátis
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5 mr-1 group-hover:text-primary transition-colors" />
                Ver Demonstração
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">LGPD</p>
                  <p>Compliant</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">99.9%</p>
                  <p>Uptime</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">2.500+</p>
                  <p>Clínicas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
                {/* Browser Header */}
                <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-background rounded-lg px-4 py-1.5 text-xs text-muted-foreground flex items-center gap-2">
                      <Shield className="w-3 h-3 text-success" />
                      healthsync.app/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard Content Preview */}
                <div className="p-6 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                      <p className="text-2xl font-bold text-primary">24</p>
                      <p className="text-xs text-muted-foreground">Consultas Hoje</p>
                    </div>
                    <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/10">
                      <p className="text-2xl font-bold text-secondary">1.847</p>
                      <p className="text-xs text-muted-foreground">Pacientes</p>
                    </div>
                    <div className="bg-success/5 rounded-xl p-4 border border-success/10">
                      <p className="text-2xl font-bold text-success">98%</p>
                      <p className="text-xs text-muted-foreground">Satisfação</p>
                    </div>
                  </div>

                  {/* Appointments Preview */}
                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-medium">Próximas Consultas</p>
                    {[
                      { name: "Maria Silva", time: "09:00", type: "Consulta Geral", status: "confirmed" },
                      { name: "João Santos", time: "09:30", type: "Retorno", status: "scheduled" },
                      { name: "Ana Costa", time: "10:00", type: "Exame", status: "in-progress" },
                    ].map((apt, i) => (
                      <div key={i} className="flex items-center justify-between bg-card rounded-lg p-3 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-medium text-primary-foreground">
                            {apt.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{apt.name}</p>
                            <p className="text-xs text-muted-foreground">{apt.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{apt.time}</p>
                          <span className={`status-pill status-${apt.status}`}>
                            {apt.status === "confirmed" ? "Confirmado" : apt.status === "scheduled" ? "Agendado" : "Em Atendimento"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -left-6 top-1/4 bg-card rounded-xl shadow-xl border border-border/50 p-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dados Protegidos</p>
                    <p className="text-xs text-muted-foreground">Criptografia AES-256</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-card rounded-xl shadow-xl border border-border/50 p-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tempo Real</p>
                    <p className="text-xs text-muted-foreground">Sincronização Instantânea</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
