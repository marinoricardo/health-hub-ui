import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Building2, Palette, Globe, Bell, Shield, Database, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [clinicData, setClinicData] = useState({ name: "Clínica São Paulo", email: "contato@clinicasp.com.br", phone: "(11) 3456-7890", address: "Av. Paulista, 1000", city: "São Paulo", state: "SP" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, reminders: true, marketing: false });
  const [appearance, setAppearance] = useState({ theme: "light", language: "pt-BR", timezone: "America/Sao_Paulo" });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Personalize o sistema conforme suas necessidades</p>
        </div>

        <Tabs defaultValue="clinic" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-xl">
            <TabsTrigger value="clinic" className="flex items-center gap-2"><Building2 className="w-4 h-4" />Clínica</TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2"><Palette className="w-4 h-4" />Aparência</TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2"><Bell className="w-4 h-4" />Notificações</TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2"><Shield className="w-4 h-4" />Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="clinic" className="space-y-6">
            <div className="health-card">
              <h3 className="font-semibold mb-6">Dados da Clínica</h3>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                  <Building2 className="w-10 h-10 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-2" />Carregar Logo</Button>
                  <p className="text-xs text-muted-foreground mt-2">PNG ou JPG, máximo 2MB</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><Label>Nome da Clínica</Label><Input value={clinicData.name} onChange={(e) => setClinicData({...clinicData, name: e.target.value})} /></div>
                <div><Label>Email</Label><Input type="email" value={clinicData.email} onChange={(e) => setClinicData({...clinicData, email: e.target.value})} /></div>
                <div><Label>Telefone</Label><Input value={clinicData.phone} onChange={(e) => setClinicData({...clinicData, phone: e.target.value})} /></div>
                <div className="sm:col-span-2"><Label>Endereço</Label><Input value={clinicData.address} onChange={(e) => setClinicData({...clinicData, address: e.target.value})} /></div>
                <div><Label>Cidade</Label><Input value={clinicData.city} onChange={(e) => setClinicData({...clinicData, city: e.target.value})} /></div>
                <div><Label>Estado</Label><Input value={clinicData.state} onChange={(e) => setClinicData({...clinicData, state: e.target.value})} /></div>
              </div>
              <Button className="mt-6"><Save className="w-4 h-4 mr-2" />Salvar Alterações</Button>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="health-card">
              <h3 className="font-semibold mb-6">Preferências de Aparência</h3>
              <div className="space-y-6">
                <div>
                  <Label>Tema</Label>
                  <Select value={appearance.theme} onValueChange={(v) => setAppearance({...appearance, theme: v})}>
                    <SelectTrigger className="w-[200px] mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Idioma</Label>
                  <Select value={appearance.language} onValueChange={(v) => setAppearance({...appearance, language: v})}>
                    <SelectTrigger className="w-[200px] mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="pt-PT">Português (Portugal)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fuso Horário</Label>
                  <Select value={appearance.timezone} onValueChange={(v) => setAppearance({...appearance, timezone: v})}>
                    <SelectTrigger className="w-[250px] mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                      <SelectItem value="Europe/Lisbon">Lisboa (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="health-card">
              <h3 className="font-semibold mb-6">Preferências de Notificação</h3>
              <div className="space-y-4">
                {[
                  { key: "email", label: "Notificações por Email", desc: "Receber atualizações importantes por email" },
                  { key: "sms", label: "Notificações por SMS", desc: "Receber alertas via mensagem de texto" },
                  { key: "push", label: "Notificações Push", desc: "Notificações no navegador" },
                  { key: "reminders", label: "Lembretes de Consulta", desc: "Lembretes automáticos para pacientes" },
                  { key: "marketing", label: "Comunicações de Marketing", desc: "Novidades e promoções" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div><p className="font-medium">{item.label}</p><p className="text-sm text-muted-foreground">{item.desc}</p></div>
                    <Switch checked={notifications[item.key as keyof typeof notifications]} onCheckedChange={(c) => setNotifications({...notifications, [item.key]: c})} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="health-card">
              <h3 className="font-semibold mb-6">Segurança da Conta</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium">Autenticação de Dois Fatores</p><p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p></div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium">Alterar Senha</p><p className="text-sm text-muted-foreground">Atualize sua senha regularmente</p></div>
                    <Button variant="outline">Alterar</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium">Sessões Ativas</p><p className="text-sm text-muted-foreground">Gerencie dispositivos conectados</p></div>
                    <Button variant="outline">Ver Sessões</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium">Backup de Dados</p><p className="text-sm text-muted-foreground">Último backup: 28/01/2025</p></div>
                    <Button variant="outline"><Database className="w-4 h-4 mr-2" />Fazer Backup</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
