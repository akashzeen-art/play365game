import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, onClick }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div onClick={onClick} className="relative size-full cursor-pointer">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>


      </div>
    </div>
  );
};

const Features = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-24 md:py-32">
        <p className="font-circular-web text-2xl text-blue-50 md:text-4xl">
          {t.exploreCategories}
        </p>
        <p className="mt-4 max-w-xl font-circular-web text-lg text-blue-50 opacity-70 md:text-2xl">
          {t.exploreDesc}
        </p>
      </div>

      <div className="mb-7 grid grid-cols-1 gap-7 md:grid-cols-2">
        <BentoTilt className="relative h-96 w-full overflow-hidden rounded-md border-2 border-yellow-300 shadow-[0_0_36px_rgba(237,255,102,0.28)] md:h-[52vh]">
          <BentoCard
            src="videos/feature-5.mp4"
            title={
              <span className="block text-yellow-300">
                <span className="mb-4 inline-flex rounded-full bg-yellow-300 px-3 py-1 font-general text-[10px] font-bold uppercase tracking-[0.2em] text-black md:text-xs">
                  Exclusive
                </span>
                <span className="mt-3 block" dangerouslySetInnerHTML={{ __html: t.premiumGames }} />
              </span>
            }
            description={t.premium}
            onClick={() => navigate('/categories', { state: { category: 'Premium Games' } })}
          />
        </BentoTilt>

        <BentoTilt className="border-hsla relative h-96 w-full overflow-hidden rounded-md md:h-[52vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={<span dangerouslySetInnerHTML={{ __html: t.actionTitle }} />}
            description={t.action}
            onClick={() => navigate('/categories', { state: { category: 'Action' } })}
          />
        </BentoTilt>
      </div>

      <div className="mb-7 grid grid-cols-1 gap-7 md:grid-cols-2 md:h-[78vh]">
        <BentoTilt className="border-hsla relative h-[70vh] w-full overflow-hidden rounded-md md:h-full">
          <BentoCard
            src="videos/feature-2.mp4"
            title={<span dangerouslySetInnerHTML={{ __html: t.puzzleTitle }} />}
            description={t.puzzle}
            onClick={() => navigate('/categories', { state: { category: 'Puzzle' } })}
          />
        </BentoTilt>

        <div className="grid h-[70vh] grid-rows-2 gap-7 md:h-full">
          <BentoTilt className="border-hsla relative overflow-hidden rounded-md">
            <BentoCard
              src="videos/feature-3.mp4"
              title={<span dangerouslySetInnerHTML={{ __html: t.top10Title }} />}
              description={t.top10}
              onClick={() => navigate('/categories', { state: { category: 'Top 10 Games' } })}
            />
          </BentoTilt>

          <BentoTilt className="border-hsla relative overflow-hidden rounded-md">
            <BentoCard
              src="videos/feature-4.mp4"
              title={<span dangerouslySetInnerHTML={{ __html: t.arcadeTitle }} />}
              description={t.arcade}
              onClick={() => navigate('/categories', { state: { category: 'Arcade' } })}
            />
          </BentoTilt>
        </div>
      </div>

      <BentoTilt className="relative h-80 w-full overflow-hidden rounded-md border border-violet-300 md:h-[46vh]">
        <div
          onClick={() => navigate('/categories', { state: { category: 'All Games' } })}
          className="relative size-full cursor-pointer"
        >
          <video
            src="videos/hero-2.mp4"
            loop
            muted
            autoPlay
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-300/80 via-black/55 to-black/20" />
          <div className="relative z-10 flex size-full flex-col justify-between p-6 md:p-10">
            <p className="w-fit rounded-full border border-yellow-300 bg-black/40 px-4 py-1 font-general text-xs uppercase tracking-[0.25em] text-yellow-300">
              {t.allGames}
            </p>
            <div className="flex items-end justify-between gap-4">
              <h1 className="bento-title special-font max-w-xl text-white" dangerouslySetInnerHTML={{ __html: t.moreGames }} />
              <TiLocationArrow className="mb-2 size-16 shrink-0 text-yellow-300 md:size-24" />
            </div>
          </div>
        </div>
      </BentoTilt>
    </div>
  </section>
  );
};

export default Features;
