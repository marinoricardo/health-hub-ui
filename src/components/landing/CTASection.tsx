import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-info" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Circles */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full border border-white/20" />
      <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full border border-white/10" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Mais de 2.500 clínicas já confiam no HealthSync
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto para transformar a gestão da sua clínica?
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Comece gratuitamente em menos de 2 minutos. 
            Sem cartão de crédito, sem compromisso.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-xl"
              asChild
            >
              <Link to="/register">
                Criar Conta Grátis
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              <MessageCircle className="w-5 h-5 mr-1" />
              Solicitar Demonstração
            </Button>
          </div>

          {/* Trust Text */}
          <p className="mt-8 text-white/60 text-sm">
            14 dias grátis • Configuração em minutos • Suporte humano real
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
