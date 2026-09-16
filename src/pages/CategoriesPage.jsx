import { useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { gamesData } from "../data/gamesData";
import { premiumGames } from "../data/premiumGames";
import { useLanguage } from "../context/LanguageContext";

const shuffleList = (list) => {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const premiumAsGamesData = shuffleList(premiumGames).map((g) => ({
  name: g.title,
  game_url: g.link,
  thumbnail_url: g.img,
  categories: ["Premium Games"],
}));

const CategoriesPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "All Games");
  const [gameUrl, setGameUrl] = useState(null);
  
  const categories = [
    { key: "All Games", label: t.allGames },
    { key: "Premium Games", label: t.premiumGamesLabel },
    { key: "Top 10 Games", label: t.top10Games },
    { key: "Easy to Play", label: t.easyToPlay },
    { key: "Arcade", label: t.arcadeTitle.replace(/<[^>]*>/g, "") },
    { key: "Puzzle", label: t.puzzleTitle.replace(/<[^>]*>/g, "") },
    { key: "Action", label: t.actionTitle.replace(/<[^>]*>/g, "") },
  ];
  
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);
  
  const filteredGames =
    selectedCategory === "Premium Games"
      ? premiumAsGamesData
      : gamesData.filter((game) => game.categories.includes(selectedCategory));

  const handlePlay = (url) => {
    new Audio('/audio/Whoosh.mp3').play();
    setGameUrl(url);
  };

  const handleClose = () => {
    setGameUrl(null);
  };

  return (
    <>
      <div className="relative min-h-screen w-screen overflow-hidden pt-24 pb-20">
        <video src="/videos/hero-3.mp4" autoPlay loop muted playsInline className="fixed left-0 top-0 size-full object-cover" />
        <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="container relative z-10 mx-auto px-5 md:px-10">
          <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-violet-300/40 px-4 py-10 text-center shadow-[0_0_48px_rgba(87,36,255,0.28)] sm:px-8 md:py-14">
            <div className="pointer-events-none absolute -left-16 -top-16 size-52 rounded-full bg-violet-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 size-44 rounded-full bg-yellow-300/20 blur-3xl" />
            <span className="pointer-events-none absolute left-4 top-4 size-8 border-l-2 border-t-2 border-yellow-300" />
            <span className="pointer-events-none absolute right-4 top-4 size-8 border-r-2 border-t-2 border-yellow-300" />
            <span className="pointer-events-none absolute bottom-4 left-4 size-8 border-b-2 border-l-2 border-yellow-300" />
            <span className="pointer-events-none absolute bottom-4 right-4 size-8 border-b-2 border-r-2 border-yellow-300" />

            <h1
              className="relative special-font text-5xl font-black uppercase leading-[0.9] text-blue-75 sm:text-6xl md:text-7xl lg:text-8xl"
              dangerouslySetInnerHTML={{ __html: t.gameCategories }}
            />
            <div className="relative mx-auto mt-5 h-1 w-24 rounded-full bg-yellow-300" />

            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                const isPremium = cat.key === "Premium Games";
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`rounded-full border px-5 py-2.5 font-general text-sm font-bold uppercase tracking-wide transition-all md:px-7 md:py-3 md:text-base ${
                      isActive
                        ? isPremium
                          ? "scale-105 border-yellow-300 bg-yellow-300 text-black shadow-[0_0_24px_rgba(237,255,102,0.45)]"
                          : "scale-105 border-violet-300 bg-violet-300 text-black shadow-[0_0_24px_rgba(87,36,255,0.45)]"
                        : isPremium
                          ? "border-yellow-300/50 bg-yellow-300/10 text-yellow-300 hover:bg-yellow-300/20"
                          : "border-white/15 bg-white/10 text-white hover:border-white/40 hover:bg-white/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-[2rem] border p-3 sm:p-5 md:p-6 ${
              selectedCategory === "Premium Games"
                ? "border-yellow-300/50 bg-black/40 shadow-[0_0_48px_rgba(237,255,102,0.14)]"
                : "border-white/10 bg-black/40 shadow-[0_0_48px_rgba(87,36,255,0.16)]"
            }`}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredGames.map((game, idx) => {
                const isPremium = selectedCategory === "Premium Games";
                return (
                  <div
                    key={idx}
                    onClick={() => handlePlay(game.game_url)}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-black transition-all duration-300 hover:-translate-y-1.5 ${
                      isPremium
                        ? "border-yellow-300/80 shadow-[0_0_18px_rgba(237,255,102,0.22)] hover:shadow-[0_16px_36px_rgba(237,255,102,0.28)]"
                        : "border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-violet-300 hover:shadow-[0_16px_36px_rgba(87,36,255,0.35)]"
                    }`}
                  >
                    <div className="relative aspect-square w-full">
                      <img
                        src={game.thumbnail_url}
                        alt={game.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                    </div>
                    {isPremium && (
                      <span className="absolute left-2 top-2 z-20 rounded-full bg-yellow-300 px-2.5 py-1 font-general text-[10px] font-bold uppercase tracking-wider text-black shadow-[0_0_12px_rgba(237,255,102,0.45)]">
                        Premium
                      </span>
                    )}
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(game.game_url);
                        }}
                        className={`flex items-center gap-1 rounded-full px-5 py-2.5 font-general text-sm font-bold uppercase text-black shadow-lg transition-transform hover:scale-110 ${
                          isPremium
                            ? "bg-yellow-300 shadow-yellow-300/40"
                            : "bg-violet-300 shadow-violet-300/40"
                        }`}
                      >
                        <span>{t.playBtn}</span>
                        <TiLocationArrow />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {gameUrl && (
        <div className="fixed inset-0 z-50 bg-black">
          <button onClick={handleClose} className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-violet-300 px-4 py-2 font-general text-sm font-bold uppercase text-black transition-transform hover:scale-110">
            <IoMdClose className="text-xl" />
            <span className="hidden sm:inline">{t.back}</span>
          </button>
          <iframe src={gameUrl} className="h-full w-full border-0" title="Game" />
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
