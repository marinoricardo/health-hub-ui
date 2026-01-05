import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    description: "Para consultórios individuais",
    price: "89",
    period: "/mês",
    features: [
      "1 Clínica",
      "Até 3 profissionais",
      "500 pacientes",
      "Prontuário eletrônico",
      "Agenda básica",
      "Suporte por e-mail",
    ],
    cta: "Começar Grátis",
    popular: false,
  },
  {
    name: "Professional",
    description: "Para clínicas em crescimento",
    price: "189",
    period: "/mês",
    features: [
      "Até 3 Clínicas",
      "Até 10 profissionais",
      "Pacientes ilimitados",
      "Prontuário completo",
      "Agenda avançada",
      "Relatórios & Analytics",
      "Integrações",
      "Suporte prioritário",
    ],
    cta: "Escolher Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Para redes de saúde",
    price: "Sob consulta",
    period: "",
    features: [
      "Clínicas ilimitadas",
      "Profissionais ilimitados",
      "Pacientes ilimitados",
      "Todas as funcionalidades",
      "API personalizada",
      "SSO & LDAP",
      "SLA dedicado",
      "Gerente de conta",
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-muted/30 relative">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4">
            Preços
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Planos que crescem com sua{" "}
            <span className="text-gradient">clínica</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece gratuitamente por 14 dias. Sem cartão de crédito. 
            Cancele quando quiser.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-card rounded-2xl border ${
                plan.popular 
                  ? "border-primary shadow-xl shadow-primary/10 scale-105" 
                  : "border-border shadow-lg"
              } overflow-hidden animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-info text-primary-foreground text-xs font-medium px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Mais Popular
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Sob consulta" && (
                      <span className="text-sm text-muted-foreground">R$</span>
                    )}
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-primary/10" : "bg-success/10"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? "text-primary" : "text-success"}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  size="lg" 
                  className="w-full"
                  asChild
                >
                  <Link to="/register">{plan.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <p className="text-center mt-12 text-muted-foreground">
          Tem dúvidas?{" "}
          <a href="#faq" className="text-primary hover:underline font-medium">
            Veja nossas perguntas frequentes
          </a>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
