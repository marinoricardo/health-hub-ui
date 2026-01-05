import { 
  FileText, 
  Calendar, 
  Users, 
  Shield, 
  BarChart3, 
  Building2,
  Stethoscope,
  ClipboardList,
  Bell,
  Lock,
  Cloud,
  Zap
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Prontuário Eletrônico",
    description: "Histórico completo do paciente com alergias, medicamentos, exames e notas clínicas em um só lugar.",
    color: "primary",
  },
  {
    icon: Calendar,
    title: "Agenda Inteligente",
    description: "Calendário visual com drag & drop, lembretes automáticos e visão por médico ou clínica.",
    color: "secondary",
  },
  {
    icon: Building2,
    title: "Multi-Clínicas",
    description: "Gerencie múltiplas unidades em uma única conta. Troque de clínica com um clique.",
    color: "info",
  },
  {
    icon: Users,
    title: "Gestão de Equipes",
    description: "Controle de acesso por papel: médicos, enfermeiros e recepcionistas com permissões personalizadas.",
    color: "warning",
  },
  {
    icon: Stethoscope,
    title: "Fluxo de Atendimento",
    description: "Interface otimizada para consultas rápidas. Menos cliques, mais produtividade.",
    color: "success",
  },
  {
    icon: BarChart3,
    title: "Relatórios & Analytics",
    description: "Métricas de atendimento, produtividade e crescimento em dashboards visuais.",
    color: "primary",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "LGPD Compliant",
    description: "Totalmente adequado à Lei Geral de Proteção de Dados.",
  },
  {
    icon: Cloud,
    title: "Backup Automático",
    description: "Seus dados sempre seguros com backups redundantes.",
  },
  {
    icon: Shield,
    title: "Criptografia AES-256",
    description: "Dados sensíveis protegidos com criptografia de ponta.",
  },
  {
    icon: Zap,
    title: "99.9% Uptime",
    description: "Infraestrutura em nuvem de alta disponibilidade.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tudo que sua clínica precisa em uma{" "}
            <span className="text-gradient">única plataforma</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Desenvolvido por profissionais de saúde para profissionais de saúde. 
            Cada funcionalidade pensada para o dia a dia clínico.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="health-card group hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security Section */}
        <div className="bg-gradient-to-r from-sidebar to-sidebar/95 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-white" />
            <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-white" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <Shield className="w-12 h-12 text-sidebar-primary mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-sidebar-foreground mb-3">
                Segurança de Nível Hospitalar
              </h3>
              <p className="text-sidebar-foreground/70 max-w-xl mx-auto">
                Seus dados de pacientes protegidos com os mais altos padrões de segurança da indústria.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-sidebar-accent mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-sidebar-primary" />
                  </div>
                  <h4 className="font-semibold text-sidebar-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-sidebar-foreground/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
