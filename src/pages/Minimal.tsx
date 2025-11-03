import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Minimal = () => {
  const [api, setApi] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!api) return;
    
    // Auto-play do carrossel
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mediaItems: Array<{ type: 'video' | 'image'; src: string }> = [
    { type: 'video', src: '/video 1.mp4' },
    { type: 'image', src: '/imagem 2.jpeg' },
    { type: 'image', src: '/imagem 3.jpeg' },
    { type: 'image', src: '/imagem 4.jpeg' },
    { type: 'image', src: '/imagem 5.jpeg' },
  ];

  // Pinterest-like feed (1..19) from public/video and public/fotos with extension fallbacks
  const feedNumbers = Array.from({ length: 19 }, (_, i) => i + 1);

  const imageExtensions = ["jpeg", "jpg", "png", "webp"] as const;
  const videoExtensions = ["mp4", "mov", "webm"] as const;

  const buildPath = (folder: string, n: number, ext: string) => `/${folder}/${n}.${ext}`;

  // Build feed entries (1..19) and include both image and video variants to integrate together
  type PinterestItem = { n: number };
  const pinterestItems: PinterestItem[] = feedNumbers.map((n) => ({ n }));

  const getCandidates = (kind: 'image' | 'video', n: number): string[] => {
    if (kind === 'image') {
      // NOW prefer root files (since user moved to /public), then combined folder, then others
      const plainRoot = imageExtensions.map((ext) => `/${n}.${ext}`);
      const inCombined = imageExtensions.map((ext) => `/video e fotos/${n}.${ext}`);
      const inFolder = imageExtensions.map((ext) => buildPath('fotos', n, ext));
      const namedImagem = imageExtensions.map((ext) => `/imagem ${n}.${ext}`);
      return [...plainRoot, ...inCombined, ...inFolder, ...namedImagem];
    }
    const plainRoot = videoExtensions.map((ext) => `/${n}.${ext}`);
    const inCombined = videoExtensions.map((ext) => `/video e fotos/${n}.${ext}`);
    const inFolder = videoExtensions.map((ext) => buildPath('video', n, ext));
    const namedVideo = videoExtensions.map((ext) => `/video ${n}.${ext}`);
    return [...plainRoot, ...inCombined, ...inFolder, ...namedVideo];
  };

  const resolveFirstExistingSrc = (kind: 'image' | 'video', n: number, index: number) => {
    const candidates = getCandidates(kind, n);
    return candidates[Math.min(index, candidates.length - 1)];
  };

  // Combined candidate list per index; prefer images, then videos
  const getAllCandidates = (n: number, prefer: 'image' | 'video'): string[] => {
    const first = prefer === 'image' ? getCandidates('image', n) : getCandidates('video', n);
    const second = prefer === 'image' ? getCandidates('video', n) : getCandidates('image', n);
    return [...first, ...second];
  };

  const isVideoPath = (src: string) => /\.(mp4|mov|webm)(\?|#)?$/i.test(src);

  function FeedCardPrefer({ n, prefer }: { n: number; prefer: 'image' | 'video' }) {
    const [attempt, setAttempt] = useState(0);
    const [hidden, setHidden] = useState(false);
    const candidates = getAllCandidates(n, prefer);
    const src = candidates[Math.min(attempt, candidates.length - 1)];

    const handleError = () => {
      if (attempt < candidates.length - 1) setAttempt((a) => a + 1);
      else setHidden(true);
    };

    if (hidden) return null;

    return (
      <div className="mb-2 sm:mb-3 break-inside-avoid rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-blue-400/20 hover:-translate-y-1">
        <div className="relative">
          {isVideoPath(src) ? (
            <video
              key={src}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto"
              onError={handleError}
            />
          ) : (
            <img
              key={src}
              src={src}
              alt={`Foto ${n}`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
              onError={handleError}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 via-gray-300 via-gray-600 via-gray-700 via-gray-800 via-gray-900 to-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-black animate-pulse">
              Bem-vindo ao meu portfólio
            </h1>
            <div className="w-28 h-1 bg-black animate-fade-in"></div>
          </div>

          <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed text-gray-900 transition-all duration-1000 delay-300 mb-12 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            Sou Daniel Rodrigues, Designer Gráfico. Crio identidades visuais, artes para redes sociais,
            edições de vídeo e peças publicitárias. Abaixo você encontra alguns trabalhos e referências.
            Se curtir o estilo, vamos conversar.
          </p>

          {/* Video moved to bottom section */}
        </div>
      </section>

      <Separator className="bg-black" />

      {/* About Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-white via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="transition-all duration-1000 hover:scale-105">
              <h2 className="text-5xl sm:text-6xl font-bold mb-12 tracking-tight text-black">
                Sobre mim
              </h2>
              <div className="space-y-8 text-xl text-black font-light leading-relaxed">
                <p>
                  Atuo com criação e direção de arte, focado em comunicar com clareza e impacto.
                  Gosto de unir estética e funcionalidade para fortalecer marcas e projetos.
                </p>
                <p>
                  Trabalho com identidade visual, social media, fotografia e edição de vídeos.
                  Meu objetivo é transformar ideias em peças que geram resultado.
                </p>
              </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-px bg-black"></div>
                  <span className="text-base font-bold tracking-wider uppercase text-black">
                    Especialidades
                  </span>
                </div>
                <ul className="space-y-4 text-xl text-black font-medium">
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-black rounded-full"></span>
                    Identidade Visual
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-black rounded-full"></span>
                    Social Media (posts e campanhas)
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-black rounded-full"></span>
                    Edição de Vídeo
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-black rounded-full"></span>
                    Fotografia e Tratamento de Imagem
                  </li>
                </ul>
              </div>

              <div className="mt-16">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-px bg-black"></div>
                  <span className="text-base font-bold tracking-wider uppercase text-black">
                    Como trabalho
                  </span>
                </div>
                <p className="text-xl text-black font-light leading-relaxed">
                  Converso para entender a necessidade, estudo referências, crio propostas e ajusto
                  com feedback até chegar no resultado ideal para o projeto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-gray-200" />

      {/* Work Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-white via-gray-200 via-gray-600 via-gray-800 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 01 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-black transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:rotate-1 cursor-pointer">
              <div className="space-y-6">
                <div className="w-20 h-1 bg-black animate-pulse"></div>
                <h3 className="text-4xl font-bold tracking-tight text-black">01</h3>
                <p className="text-black text-lg font-medium leading-relaxed">
                  Reduzir ao essencial, eliminando o supérfluo.
                </p>
              </div>
            </div>
            
            {/* Card 02 */}
            <div className="bg-gray-100 rounded-2xl p-8 shadow-xl border-2 border-gray-800 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-rotate-1 cursor-pointer">
              <div className="space-y-6">
                <div className="w-20 h-1 bg-gray-900"></div>
                <h3 className="text-4xl font-bold tracking-tight text-gray-900">02</h3>
                <p className="text-gray-900 text-lg font-medium leading-relaxed">
                  Criar hierarquia visual clara e funcional.
                </p>
              </div>
            </div>
            
            {/* Card 03 */}
            <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border-2 border-white transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:rotate-1 cursor-pointer">
              <div className="space-y-6">
                <div className="w-20 h-1 bg-white"></div>
                <h3 className="text-4xl font-bold tracking-tight text-white">03</h3>
                <p className="text-white text-lg font-medium leading-relaxed">
                  Priorizar a experiência do usuário acima de tudo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Gallery Section - Degradê preto para verde, depois azul começa aqui */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-black via-green-950 via-green-900 via-blue-950 via-blue-900 to-blue-700">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">Portfolio</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          {/* Card wrapper para o carrossel */}
          <div className="bg-blue-950/50 backdrop-blur-md rounded-3xl p-8 border border-blue-800/30">
            <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {mediaItems.map((item, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="relative aspect-square rounded-2xl border-2 border-blue-400/30 group hover:border-blue-400/50 transition-all duration-500 overflow-hidden shadow-lg bg-black/20 animate-fade-in">
                      {item.type === 'video' ? (
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={item.src} 
                          alt={`Carrossel ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                      {/* Overlay com gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      {/* Linhas decorativas */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 left-4 w-16 h-px bg-blue-400/70"></div>
                        <div className="absolute top-4 left-4 h-16 w-px bg-blue-400/70"></div>
                        <div className="absolute bottom-4 right-4 w-16 h-px bg-blue-400/70"></div>
                        <div className="absolute bottom-4 right-4 h-16 w-px bg-blue-400/70"></div>
                      </div>
                      {/* Número no canto */}
                      <div className="absolute top-4 left-4 text-2xl font-bold text-blue-400 bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-blue-400 border-blue-400/50 hover:bg-blue-400/20" />
              <CarouselNext className="text-blue-400 border-blue-400/50 hover:bg-blue-400/20" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-blue-700 to-blue-600">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border-2 border-white/30 shadow-2xl transition-all duration-1000 hover:bg-white/20 hover:scale-105 hover:shadow-blue-400/20 cursor-pointer">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl md:text-6xl font-light italic leading-relaxed text-white mb-10 animate-pulse">
                "O melhor design é invisível."
              </p>
              <div className="w-32 h-1 bg-white mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-blue-600 to-blue-500">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border-2 border-white/30 shadow-2xl transition-all duration-1000 hover:shadow-blue-300/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="transition-all duration-500 hover:scale-105">
                <h2 className="text-5xl sm:text-6xl font-bold mb-10 tracking-tight text-white">
                  Contato
                </h2>
                <p className="text-2xl text-white leading-relaxed font-light">
                  Vamos conversar sobre como podemos criar 
                  algo extraordinário juntos.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="pb-8 border-b border-white/40 transition-all duration-300 hover:border-white/70 hover:scale-105">
                  <span className="text-sm font-bold tracking-wider uppercase text-blue-100">
                    Email
                  </span>
                  <p className="text-2xl mt-3 font-bold text-white">danielrodriguis@live.com</p>
                </div>
                
                <div className="pb-8 border-b border-white/40 transition-all duration-300 hover:border-white/70 hover:scale-105">
                  <span className="text-sm font-bold tracking-wider uppercase text-blue-100">
                    Telefone
                  </span>
                  <p className="text-2xl mt-3 font-bold text-white">+55 19 99221-1226</p>
                </div>
                
                <div className="pb-8 transition-all duration-300 hover:scale-105">
                  <span className="text-sm font-bold tracking-wider uppercase text-blue-100">
                    LinkedIn
                  </span>
                  <p className="text-2xl mt-3 font-bold text-white">danfotoos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section (Bottom) */}
      <section className="py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-blue-600 to-blue-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
            {/* Video - Menor */}
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 transition-all duration-1000 max-w-md ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src="/video.mov" type="video/quicktime" />
                <source src="/video.mov" type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            </div>
            
            {/* Imagem Sky Motos - tamanho normal */}
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 transition-all duration-1000 delay-300 w-full ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img 
                src="/outdoor.jpeg" 
                alt="Sky Motos" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pinterest-style Feed (Videos + Fotos 1..19) */}
      <section className="py-16 px-2 sm:px-4 md:px-8 bg-gradient-to-b from-blue-500 to-blue-400">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Feed</h3>
            <div className="w-16 sm:w-20 h-1 bg-white/70 mx-auto mt-2" />
          </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-2 sm:gap-3 [column-fill:_balance]">
        {[...
          pinterestItems.flatMap((item) => ([
            { n: item.n, prefer: 'image' as const },
            { n: item.n, prefer: 'video' as const },
          ]))
        ]
          .sort(() => Math.random() - 0.5)
          .map((entry) => (
          <FeedCardPrefer key={`feed-${entry.prefer}-${entry.n}`} n={entry.n} prefer={entry.prefer} />
        ))}
      </div>
        </div>
      </section>

      {/* Footer com degradê azul continuado */}
      <footer className="py-12 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-blue-500 to-blue-400 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2025 Daniel Rodrigues. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Minimal;
