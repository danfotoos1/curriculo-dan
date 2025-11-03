import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Menu, X, Home, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur-xl border border-purple-500/20 flex items-center justify-center text-purple-300 hover:text-purple-100 hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 shadow-2xl"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-purple-500/20 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Home className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Daniel Rodrigues</h2>
                <p className="text-purple-300 text-sm">Designer Gráfico</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <Link to="/curriculo" onClick={toggleSidebar}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left h-14 rounded-xl transition-all duration-300 ${
                  location.pathname === "/curriculo"
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white"
                    : "text-purple-300 hover:text-purple-100 hover:bg-purple-500/10"
                }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-semibold">Currículo</div>
                  <div className="text-xs opacity-70">Visualizar CV completo</div>
                </div>
              </Button>
            </Link>

            <Link to="/minimal" onClick={toggleSidebar}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left h-14 rounded-xl transition-all duration-300 ${
                  (location.pathname === "/minimal" || location.pathname === "/")
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white"
                    : "text-purple-300 hover:text-purple-100 hover:bg-purple-500/10"
                }`}
              >
                <Minus className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-semibold">Minimal</div>
                  <div className="text-xs opacity-70">Design essencial</div>
                </div>
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-4" />
            <p className="text-purple-400 text-xs text-center">
              © 2025 Daniel Rodrigues
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};
