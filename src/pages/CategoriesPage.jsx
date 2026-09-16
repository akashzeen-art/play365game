import { useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { gamesData } from "../data/gamesData";
import { premiumGames } from "../data/premiumGames";
import { useLanguage } from "../context/LanguageContext";

const premiumAsGamesData = premiumGames.map((g) => ({
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
          <h1 className="mb-8 text-center special-font text-4xl font-black uppercase text-blue-75 md:text-6xl"
            dangerouslySetInnerHTML={{ __html: t.gameCategories }}
          />
          
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`rounded-full px-6 py-2 font-general text-sm font-bold uppercase transition-all ${
                  selectedCategory === cat.key
                    ? "bg-violet-300 text-black scale-110"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${
            selectedCategory === "Premium Games" ? "rounded-3xl border border-yellow-300/50 bg-yellow-300/10 p-3 sm:p-5" : ""
          }`}>
            {filteredGames.map((game, idx) => {
              const isPremium = selectedCategory === "Premium Games";
              return (
                <div
                  key={idx}
                  onClick={() => handlePlay(game.game_url)}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 bg-black transition-all duration-300 hover:-translate-y-1 ${
                    isPremium
                      ? "border-yellow-300 shadow-[0_0_18px_rgba(237,255,102,0.25)]"
                      : "border-violet-300/30 hover:border-violet-300"
                  }`}
                >
                  <div className="relative aspect-square w-full">
                    <img
                      src={game.thumbnail_url}
                      alt={game.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {isPremium && (
                    <span className="absolute left-2 top-2 z-20 rounded-full bg-yellow-300 px-2.5 py-1 font-general text-[10px] font-bold uppercase tracking-wider text-black">
                      Premium
                    </span>
                  )}
                  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/75 p-3 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(game.game_url);
                      }}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 font-general text-xs font-bold uppercase text-black transition-transform hover:scale-110 ${
                        isPremium ? "bg-yellow-300" : "bg-violet-300"
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
