import { Link } from "react-router-dom";
import { Activity, Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-secondary flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">HealthSync</span>
            </Link>
            <p className="text-sidebar-foreground/70 mb-6 max-w-sm">
              A plataforma SaaS completa para gestão de prontuário clínico. 
              Desenvolvida para clínicas, consultórios e redes de saúde.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary transition-colors flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary transition-colors flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary transition-colors flex items-center justify-center">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/70">
              <li><a href="#features" className="hover:text-sidebar-primary transition-colors">Funcionalidades</a></li>
              <li><a href="#pricing" className="hover:text-sidebar-primary transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Atualizações</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">API</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/70">
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Parceiros</a></li>
              <li><a href="#" className="hover:text-sidebar-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contato@healthsync.app
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +55 11 4000-0000
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>São Paulo, SP<br />Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sidebar-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-sidebar-foreground/60">
            © 2025 HealthSync. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-sidebar-foreground/60">
            <a href="#" className="hover:text-sidebar-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-sidebar-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-sidebar-primary transition-colors">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
