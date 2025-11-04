import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";

const Performance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 via-blue-950 via-blue-900 to-black text-white">
      <Navigation />
      <div className="px-6 sm:px-12 md:px-24">
        <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/10 text-amber-100 text-sm text-center px-4 py-3">
          Portfólio pessoal em aprendizado — projeto em estudo e desenvolvimento contínuo.
        </div>
      </div>

      <section className="py-28 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Growth & Performance</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl leading-relaxed">
            Planejamento, execução e otimização orientados por dados para transformar tráfego em receita.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#servicos" className="px-5 py-3 rounded-xl border border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/20 transition-all">Serviços</a>
            <a href="#funil" className="px-5 py-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all">Funil</a>
            <a href="#tracking" className="px-5 py-3 rounded-xl border border-purple-400/40 bg-purple-500/10 hover:bg-purple-500/20 transition-all">Tracking</a>
            <a href="#testes" className="px-5 py-3 rounded-xl border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500/20 transition-all">Testes</a>
            <a href="#colab" className="px-5 py-3 rounded-xl border border-pink-400/40 bg-pink-500/10 hover:bg-pink-500/20 transition-all">Colaboração</a>
            <a href="#relatorios" className="px-5 py-3 rounded-xl border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all">Relatórios</a>
          </div>
        </div>
      </section>

      <Separator className="bg-white/10" />

      <section id="servicos" className="py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Serviços de Mídia Paga</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">Meta Ads (Facebook & Instagram)</h3>
              <ul className="space-y-3 text-slate-200">
                <li>• Planejamento de campanhas Full-Funnel</li>
                <li>• Estrutura por objetivos (Leads, Tráfego, Vendas)</li>
                <li>• Públicos: interesses, lookalike, remarketing</li>
                <li>• Otimização de criativos e posições</li>
              </ul>
            </div>
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">Google & YouTube Ads</h3>
              <ul className="space-y-3 text-slate-200">
                <li>• Search, Performance Max, Display e Discovery</li>
                <li>• YouTube In-Stream/Shorts para awareness e conversão</li>
                <li>• Estrutura de palavras-chave e correspondências</li>
                <li>• Lances orientados a valor (tCPA/tROAS)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="funil" className="py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-blue-950 via-blue-900 to-emerald-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Arquitetura de Funil (TOFU • MOFU • BOFU)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-blue-300 mb-2">TOFU</div>
              <h3 className="text-xl font-semibold mb-3">Descoberta</h3>
              <p className="text-slate-200">Criativos de impacto e ofertas de topo para gerar atenção qualificada.</p>
            </div>
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-emerald-300 mb-2">MOFU</div>
              <h3 className="text-xl font-semibold mb-3">Consideração</h3>
              <p className="text-slate-200">Sequências, provas sociais e páginas otimizadas para educar e filtrar.</p>
            </div>
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-amber-300 mb-2">BOFU</div>
              <h3 className="text-xl font-semibold mb-3">Conversão</h3>
              <p className="text-slate-200">Remarketing, ofertas fortes e follow-up para transformar leads em vendas.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tracking" className="py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-emerald-950 via-emerald-900 to-purple-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Tracking e Mensuração</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-3">GTM / GA4</h3>
              <ul className="space-y-3 text-slate-200">
                <li>• Tags, triggers e variáveis padronizados</li>
                <li>• Eventos: view_item, generate_lead, purchase</li>
                <li>• Enhanced Conversions e Consent Mode</li>
              </ul>
            </div>
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-3">Pixels e Server-Side</h3>
              <ul className="space-y-3 text-slate-200">
                <li>• Meta Pixel + CAPI</li>
                <li>• Google Ads / Enhanced Conversions</li>
                <li>• QA contínuo e depuração</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="testes" className="py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-purple-950 via-purple-900 to-amber-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">Ciclo de Testes Semanais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-3">Públicos</h3>
              <p className="text-slate-200">Interesses, lookalikes, segmentos 1P e intent signals.</p>
            </div>
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-3">Criativos</h3>
              <p className="text-slate-200">Hooks, formatos, variações de copy e estrutura (UGC, prova, oferta).</p>
            </div>
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-3">Páginas</h3>
              <p className="text-slate-200">Testes A/B de headlines, provas, CTAs e velocidade.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="colab" className="py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-amber-950 via-rose-950 to-cyan-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Colaboração</h2>
          <p className="text-lg text-slate-200 max-w-3xl">
            Trabalho integrado com Copy, Design e BI para garantir velocidade de experimentação
            e coerência entre mensagem, visual e medição. Ritmo semanal e cerimônias objetivas.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 border border-white/10 bg-white/5">Briefings e roteiros</div>
            <div className="rounded-2xl p-6 border border-white/10 bg-white/5">Kits de criativos e variações</div>
            <div className="rounded-2xl p-6 border border-white/10 bg-white/5">Checklist de implementação</div>
          </div>
        </div>
      </section>

      <section id="relatorios" className="py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-cyan-950 via-cyan-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Relatórios e Painéis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <span className="absolute -top-4 left-6 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/40 bg-cyan-500/10 text-cyan-100 backdrop-blur-sm">Aprendendo</span>
              <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
                <h3 className="text-xl font-semibold mb-3">Pipeline</h3>
                <p className="text-slate-200">Leads → MQL → SQL → Vendas com métricas por etapa e coorte.</p>
              </div>
            </div>
            <div className="relative">
              <span className="absolute -top-4 left-6 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/40 bg-cyan-500/10 text-cyan-100 backdrop-blur-sm">Aprendendo</span>
              <div className="rounded-2xl p-8 border border-white/10 bg-white/5">
                <h3 className="text-xl font-semibold mb-3">North Stars</h3>
                <p className="text-slate-200">CPA, ROAS, Velocity, Payback e CAC/LTV com metas e alertas.</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <a href="#contato" className="inline-block px-6 py-4 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all text-white font-semibold">Quero ver um plano para o meu negócio</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Performance;
