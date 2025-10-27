import { Navigation } from "@/components/Navigation";

const GallerySimple = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4">
      <Navigation />
      
      <div className="max-w-7xl mx-auto pt-20 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Galeria Futurística</h1>
          <p className="text-purple-300">Portfolio digital de Daniel Rodrigues</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-purple-500/10">
              <h3 className="text-white font-semibold">Post de Teste</h3>
            </div>
            <div className="aspect-square bg-slate-950 flex items-center justify-center">
              <p className="text-purple-300">Carregando...</p>
            </div>
            <div className="p-4">
              <p className="text-purple-100">Teste básico da galeria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySimple;
