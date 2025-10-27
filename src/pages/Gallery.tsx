import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";

const Gallery = () => {
  // Imagens do carrossel (primeiro post)
  const carouselImages = [
    {
      src: "/carrossel 1.png",
      alt: "Carrossel 1"
    },
    {
      src: "/carrosel 2.png", 
      alt: "Carrossel 2"
    },
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop",
      alt: "Design abstrato"
    }
  ];

  // Posts do Instagram
  const posts = [
    {
      id: 1,
      isCarousel: true,
      src: "/carrossel 1.png", // fallback para posts não-carrossel
      alt: "Carrossel",
      username: "daniel.designer",
      location: "São Paulo, Brasil",
      likes: 1234,
      caption: "Design futurístico em ação 🚀✨ Veja o carrossel!",
      timeAgo: "2h"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=800&fit=crop",
      alt: "Sorteio Design",
      username: "daniel.designer", 
      location: "São Paulo, Brasil",
      likes: 2341,
      caption: "SORTEIO 🎁 Design futurístico em ação 🎨✨",
      timeAgo: "3h",
      isCarousel: false
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=800&fit=crop",
      alt: "Arte digital",
      username: "daniel.designer",
      location: "Digital Space",
      likes: 987,
      caption: "Arte digital em movimento 🎭✨",
      timeAgo: "5h",
      isCarousel: false
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop",
      alt: "Design abstrato",
      username: "daniel.designer",
      location: "Studio",
      likes: 2341,
      caption: "Explorando novas dimensões do design 🌌",
      timeAgo: "1d",
      isCarousel: false
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=800&fit=crop",
      alt: "Tecnologia futurística",
      username: "daniel.designer",
      location: "Future Lab",
      likes: 1876,
      caption: "O futuro é agora 🔮💫",
      timeAgo: "2d",
      isCarousel: false
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=800&fit=crop",
      alt: "Código futurístico",
      username: "daniel.designer",
      location: "Dev Space",
      likes: 3421,
      caption: "Programação e design unidos 💻✨",
      timeAgo: "3d",
      isCarousel: false
    }
  ];

  const [liked, setLiked] = useState<{[key: number]: boolean}>({});
  const [saved, setSaved] = useState<{[key: number]: boolean}>({});
  
  // Carrossel state
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleLike = (postId: number) => {
    setLiked(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleSave = (postId: number) => {
    setSaved(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Carrossel functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const InstagramPost = ({ post }: { post: any }) => {
    const [localSelectedIndex, setLocalSelectedIndex] = useState(0);
    
    const nextImage = () => {
      setLocalSelectedIndex((prev) => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    };

    const prevImage = () => {
      setLocalSelectedIndex((prev) => 
        prev === 0 ? carouselImages.length - 1 : prev - 1
      );
    };

    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-purple-400 font-bold text-sm">DR</span>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{post.username}</p>
              <p className="text-purple-300 text-xs">{post.location}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-purple-300 hover:text-purple-100 hover:bg-purple-500/10">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Image or Carousel */}
        {post.isCarousel ? (
          <div className="relative">
            <div className="aspect-square bg-slate-950 overflow-hidden">
              <img
                src={carouselImages[localSelectedIndex].src}
                alt={carouselImages[localSelectedIndex].alt}
                className="w-full h-full object-cover transition-all duration-500"
                onDoubleClick={() => toggleLike(post.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setLocalSelectedIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === localSelectedIndex
                      ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                      : "w-1.5 bg-purple-500/30 hover:bg-purple-500/50"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative aspect-square bg-slate-950">
            <img
              src={post.src || ""}
              alt={post.alt || "Post image"}
              className="w-full h-full object-cover"
              onDoubleClick={() => toggleLike(post.id)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
          </div>
        )}

      {/* Actions */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-3 pt-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleLike(post.id)}
              className="transition-all duration-300 hover:scale-110"
            >
              <Heart
                className={`h-7 w-7 ${
                  liked[post.id]
                    ? "fill-red-500 text-red-500"
                    : "text-purple-300 hover:text-purple-100"
                }`}
              />
            </button>
            <button className="text-purple-300 hover:text-purple-100 transition-all duration-300 hover:scale-110">
              <MessageCircle className="h-7 w-7" />
            </button>
            <button className="text-purple-300 hover:text-purple-100 transition-all duration-300 hover:scale-110">
              <Send className="h-7 w-7" />
            </button>
          </div>
          <button
            onClick={() => toggleSave(post.id)}
            className="transition-all duration-300 hover:scale-110"
          >
            <Bookmark
              className={`h-7 w-7 ${
                saved[post.id]
                  ? "fill-purple-400 text-purple-400"
                  : "text-purple-300 hover:text-purple-100"
              }`}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="text-white font-semibold text-sm mb-2">
          {post.likes + (liked[post.id] ? 1 : 0)} curtidas
        </p>

        {/* Caption */}
        <p className="text-white text-sm mb-1">
          <span className="font-semibold mr-2">{post.username}</span>
          <span className="text-purple-100">{post.caption}</span>
        </p>

        {/* Time */}
        <p className="text-purple-400 text-xs uppercase tracking-wide">
          {post.timeAgo}
        </p>
      </div>

      {/* Comment Input */}
      <div className="border-t border-purple-500/10 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Adicione um comentário..."
            className="flex-1 bg-transparent text-purple-100 placeholder-purple-400/50 text-sm focus:outline-none"
          />
          <button className="text-purple-400 font-semibold text-sm hover:text-purple-300 transition-colors">
            Publicar
          </button>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4">
      <Navigation />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto pt-20 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Galeria Futurística</h1>
          <p className="text-purple-300">Portfolio digital de Daniel Rodrigues</p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto pt-12 pb-8">
        <div className="text-center">
          <p className="text-purple-400 text-sm">
            ✨ Design futurístico • Interação em tempo real • Portfolio digital
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
