import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import AnimatedTitle from "../components/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const games = [
  { id: 1, img: "https://cdn.simpleviralgames.com/images/e96f1c9f-684b-46d0-824e-3067e361a218.webp", title: "Adventure Quest", category: "Action", link: "https://cdn.timepass.games/games/9ba9bef2-8483-4c94-92a3-b3896a3e9c9b/f4311c05-9336-4be6-babe-3febf30a73e0/" },
  { id: 2, img: "https://cdn.simpleviralgames.com/images/e9d1b5b2-bbeb-4ccd-8ac0-1128016d2620.webp", title: "Puzzle Master", category: "Puzzle", link: "https://cdn.timepass.games/games/b13b5b99-bb86-45a7-90dd-d1f295ea5ce3/a0d29cca-f17b-419d-8af1-68e3d7847231/" },
  { id: 3, img: "https://cdn.simpleviralgames.com/images/51a83a0c-f3b4-4099-8099-8091af13e00b.webp", title: "Racing Fury", category: "Racing", link: "https://cdn.timepass.games/games/48749ba2-e270-4aa7-833f-29f485919176/02ec686a-849b-4a04-9615-3d70eaceda4d/" },
  { id: 4, img: "https://cdn.simpleviralgames.com/images/ae1f0e78-a2be-4aa4-a592-c8e6deaf23ab.webp", title: "Strategy Wars", category: "Strategy", link: "https://cdn.timepass.games/games/aea31b26-5ea8-469e-ba97-0b0ad7e0cd77/b54faac1-cb2d-4a93-afc2-37f48c972228/" },
  { id: 5, img: "https://cdn.timepass.games/images/9d8a74e4-b8fc-457c-801e-5c5406f83fd6.webp", title: "Arcade Blast", category: "Arcade", link: "https://cdn.timepass.games/games/9cac2c11-67b6-4303-891a-f3c5fe9d4b03/a15f234b-2818-4ea1-91d9-1f8e30e5a396/" },
  { id: 6, img: "https://cdn.timepass.games/images/136af4be-20ae-4347-8b04-7b3d1c660253.webp", title: "Sports Champion", category: "Sports", link: "https://cdn.timepass.games/games/197b2d64-9d1c-475f-8b7f-b06c55a54ed7/2d564def-b895-478d-aebc-ef89724bd260/" },
  { id: 7, img: "https://cdn.simpleviralgames.com/images/7d9b4897-3037-4096-bd4c-611688664ad5.webp", title: "Brain Teaser", category: "Puzzle", link: "https://cdn.timepass.games/games/66550db6-b343-4464-b34c-8bbd70119da7/50a48faa-d9af-4264-80d1-b85981c4ccc7/" },
  { id: 8, img: "https://cdn.simpleviralgames.com/images/e3fae4f0-4941-45ee-9ac0-2c278a1abcaa.webp", title: "Combat Zone", category: "Action", link: "https://cdn.timepass.games/games/24cbddf4-8fff-4172-b030-f039789a7392/05e1085c-b794-4923-9efd-486dd016d350/" },
  { id: 9, img: "https://cdn.timepass.games/images/d8721056-f2f5-4aed-8aef-99ba3b244006.webp", title: "Speed Racer", category: "Racing", link: "https://cdn.timepass.games/games/50f9d5d8-67b7-4f8f-8651-e3af66558447/ecd62645-cd67-4be9-8235-3f2defd105d0/" },
  { id: 10, img: "https://cdn.timepass.games/images/e2d7657f-28d5-453a-81fc-117324fcb755.webp", title: "Tower Defense", category: "Strategy", link: "https://cdn.timepass.games/games/cfc03ecd-e59d-4b96-851c-984b2afc9cdd/b5530b1d-8811-49e8-8c62-a6e94408272b/" },
  { id: 11, img: "https://cdn.timepass.games/images/2f2871a9-c857-49af-b18c-e20f14036f22.webp", title: "Jump Master", category: "Arcade", link: "https://cdn.timepass.games/games/0e4c5637-8935-4487-8160-1c312f7f7d3e/f7178de5-7bab-4d02-bd64-4cf9c14c48a6/" },
  { id: 12, img: "https://cdn.timepass.games/images/8d4eb4f9-1443-456d-8297-ad1f2407cbcc.webp", title: "Goal Striker", category: "Sports", link: "https://cdn.timepass.games/games/ef6644b1-f9ba-4fe5-ae33-05b26b8b7671/e3adf6e5-09fb-4068-ada3-3d65f3cd0e1f/" },
  { id: 13, img: "https://cdn.timepass.games/images/4117af8f-e378-488d-8a85-d5a0da9c459a.webp", title: "Word Quest", category: "Puzzle", link: "https://cdn.timepass.games/games/e0706fd9-06f4-4a29-96b7-e8fba0574cd5/0bc7b5de-fe58-4a4f-8a6a-3029bf27efe4/" },
  { id: 14, img: "https://cdn.timepass.games/images/63c4d2da-7a22-440b-9937-e2c7b64a99de.webp", title: "Battle Arena", category: "Action", link: "https://cdn.timepass.games/games/8ba2dbb3-d984-4cfb-b3ab-c539222eb51b/bb835f37-fc8a-461c-9e92-fb7b66811bac/" },
  { id: 15, img: "https://cdn.timepass.games/images/886c11c5-d356-430e-90d0-58a7befe6424.webp", title: "Drift King", category: "Racing", link: "https://cdn.timepass.games/games/51b11c11-cb32-4959-9364-2d65dad22ab5/3da3c9c3-208c-4cbc-92fa-6141136500cf/" },
  { id: 16, img: "https://cdn.timepass.games/images/be2b2829-3567-4513-b164-f3204325edcc.webp", title: "Empire Builder", category: "Strategy", link: "https://cdn.timepass.games/games/f5e3374b-8f87-4886-9e04-78986f738f7f/ae4b233c-4503-4d68-8039-798bcdbdb9d5/" },
  { id: 17, img: "https://cdn.timepass.games/images/fftliyjlii.webp", title: "Retro Arcade", category: "Arcade", link: "https://cdn.timepass.games/games/4dcfd91b-3ff6-461b-b655-aab5013d05ef/1dd76b9f-1b48-4c2c-a948-c6d5156a32d7/" },
  { id: 18, img: "https://cdn.simpleviralgames.com/images/eaf1dca9-970f-4227-b87d-2c55fa683746.webp", title: "Tennis Pro", category: "Sports", link: "https://cdn.timepass.games/games/1559e623-d0e4-441d-a8f1-7e89e9175528/c244a21e-8966-451c-8e48-f0d9e56b1e2a/" },
  { id: 19, img: "https://cdn.timepass.games/images/hktagdrusj.webp", title: "Logic Master", category: "Puzzle", link: "https://cdn.timepass.games/games/a640e65e-f8cf-45ed-904b-6f95e125c358/699be819-8b88-4e6d-a042-c3c0f5bcfc62/" },
  { id: 20, img: "https://cdn.timepass.games/images/ddc7db95-816c-430b-bc56-79bf9d576b56.webp", title: "Hero Quest", category: "Action", link: "https://cdn.timepass.games/games/1379deb1-0192-4237-9f33-f0274ac42a72/f8f87336-c8de-451c-b6ba-b9d4635b341f/" },
  { id: 21, img: "https://cdn.timepass.games/images/585555ad-bd12-4cb9-9546-97b1cff6e6b3.webp", title: "Turbo Rush", category: "Racing", link: "https://cdn.timepass.games/games/954a1061-ab71-4cf2-b203-bbfe8be0ee3e/65f8fba3-6fe5-436d-9fad-637c137bdfaf/" },
  { id: 22, img: "https://cdn.simpleviralgames.com/images/1fc2ca0e-0daf-4e5e-8a2e-727c4b4c2bb6.webp", title: "Chess Master", category: "Strategy", link: "https://cdn.timepass.games/games/25ddd110-8c7b-452e-a13f-9359585c8cc4/47dc9e35-3c8b-4cc4-8402-d40b918f3f7a/" },
  { id: 23, img: "https://cdn.simpleviralgames.com/images/34e03b4b-5984-4ce6-b8a9-f8af52a72364.webp", title: "Coin Collector", category: "Arcade", link: "https://cdn.timepass.games/games/50f9d5d8-67b7-4f8f-8651-e3af66558447/ecd62645-cd67-4be9-8235-3f2defd105d0/" },
  { id: 24, img: "https://cdn.timepass.games/images/1bf46ab2-5179-4e42-b1a6-e665f073c208.webp", title: "Basketball Star", category: "Sports", link: "https://cdn.timepass.games/games/f67c362d-1b8e-43f9-a664-5fdacd00566f/deb2af43-72f7-4ff2-bda6-c90541553fc3/" },
  { id: 25, img: "https://cdn.timepass.games/images/43f5c1d6-78b8-4959-a50f-701137a80625.webp", title: "Square Game", category: "Puzzle", link: "https://cdn.timepass.games/games/9a875167-9c7c-4802-8c82-9fa0d8632ea5/5566f807-8ea3-4dcf-868e-64e9bfcd38c0/" },
  { id: 26, img: "https://cdn.simpleviralgames.com/images/7d9b4897-3037-4096-bd4c-611688664ad5.webp", title: "Mega Quest", category: "Action", link: "https://cdn.timepass.games/games/66550db6-b343-4464-b34c-8bbd70119da7/50a48faa-d9af-4264-80d1-b85981c4ccc7/" },
  { id: 27, img: "https://cdn.timepass.games/images/09717a3d-6f4c-4396-ab37-5765173e43d2.webp", title: "Final Strike", category: "Action", link: "https://cdn.timepass.games/games/05cb773c-9b54-4773-aedc-24a42b568584/aee3cd6b-808d-432b-be3d-e0efe6b2f2ee/" },
];

const GameCard = ({ game, onPlay }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const tiltX = (y - 0.5) * 8;
    const tiltY = (x - 0.5) * -8;
    setTransformStyle(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handlePlay = () => {
    new Audio('/audio/Whoosh.mp3').play();
    onPlay(game.link);
  };

  return (
    <div className="game-card-wrapper mb-4">
      <div
        ref={cardRef}
        className="game-card border-hsla group relative overflow-hidden rounded-xl transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTransformStyle("")}
        style={{ transform: transformStyle }}
      >
        <div className="aspect-square w-full overflow-hidden bg-violet-300">
          <img
            src={game.img}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
          <button onClick={handlePlay} className="flex items-center gap-1 rounded-full bg-violet-300 px-4 py-2 font-general text-xs font-bold uppercase text-black transition-transform hover:scale-110">
            <span>Play</span>
            <TiLocationArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

const CircleGame = ({ game, index, isMobile, isTablet, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const angle = (index * 360) / 8;
  
  const radius = isMobile ? 120 : isTablet ? 180 : 250;
  
  const handlePlay = () => {
    new Audio('/audio/Whoosh.mp3').play();
    onPlay(game.link);
  };
  
  return (
    <div
      className="absolute"
      style={{
        transform: `rotate(${angle}deg) translate(0, -${radius}px) rotate(-${angle}deg)`,
      }}
    >
      <div 
        className="flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlay}
      >
        <div className="group relative size-16 cursor-pointer overflow-hidden rounded-full border-2 border-violet-300 transition-all duration-300 hover:scale-125 hover:border-yellow-300 sm:size-24 sm:border-3 md:size-40 md:border-4">
          <img
            src={game.img}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 flex items-center justify-center bg-black/80 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <TiLocationArrow className="text-lg text-violet-300 sm:text-xl md:text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

const GamesPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [gameUrl, setGameUrl] = useState(null);
  
  const sliderGames = games.slice(0, 7);
  const circleGames = games.slice(7, 15);
  const gridGames = games.slice(15, 27);

  const handleClose = () => {
    setGameUrl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.set(".game-card-wrapper", { opacity: 1 });
    
    gsap.from(".games-title", {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".games-subtitle", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3,
    });
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-screen overflow-hidden pt-24 pb-20">
        <video
          src="/videos/hero-3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="fixed left-0 top-0 size-full object-cover"
        />
        <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="container relative z-10 mx-auto px-5 md:px-10">
          <div className="mb-16 text-center">
            <p className="games-subtitle mb-3 font-general text-xs uppercase tracking-wider text-violet-300 md:text-sm">
              Play & Conquer
            </p>
            <div className="games-title">
              <AnimatedTitle
                title="Expl<b>o</b>re Epic <br /> G<b>a</b>mes"
                containerClass="!text-white"
              />
            </div>
            <p className="games-subtitle mx-auto mt-5 max-w-2xl font-circular-web text-sm text-white/70 md:text-base">
              Dive into our collection of thrilling adventures
            </p>
          </div>

          <div className="mb-20 overflow-hidden">
            <h2 className="mb-6 special-font text-2xl font-black uppercase text-blue-75 sm:text-3xl md:text-5xl">
              Feat<b>u</b>red Games
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide sm:gap-4">
              {sliderGames.map((game) => (
                <div key={game.id} className="min-w-[150px] sm:min-w-[200px] md:min-w-[250px]">
                  <GameCard game={game} onPlay={setGameUrl} />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-16 text-center special-font text-2xl font-black uppercase text-blue-75 sm:mb-20 sm:text-3xl md:mb-24 md:text-5xl">
              Pop<b>u</b>lar Picks
            </h2>
            <div className="relative mx-auto flex h-[280px] w-full max-w-[280px] items-center justify-center sm:h-[400px] sm:max-w-[400px] md:h-[550px] md:max-w-[650px]">
              {circleGames.map((game, index) => (
                <CircleGame key={game.id} game={game} index={index} isMobile={isMobile} isTablet={isTablet} onPlay={setGameUrl} />
              ))}
              <img src="/220208.gif" alt="center" className="absolute size-20 rounded-full object-cover sm:size-26 md:size-32" />
            </div>
          </div>

          <div>
            <h2 className="mb-6 special-font text-2xl font-black uppercase text-blue-75 sm:text-3xl md:text-5xl">
              <b>A</b>ll Games
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {gridGames.map((game) => (
                <GameCard key={game.id} game={game} onPlay={setGameUrl} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {gameUrl && (
        <div className="fixed inset-0 z-50 bg-black">
          <button onClick={handleClose} className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-violet-300 px-4 py-2 font-general text-sm font-bold uppercase text-black transition-transform hover:scale-110">
            <IoMdClose className="text-xl" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <iframe src={gameUrl} className="h-full w-full border-0" title="Game" />
        </div>
      )}
    </>
  );
};

export default GamesPage;
