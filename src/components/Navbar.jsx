import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "es", label: "Español" },
  { code: "rn", label: "Ikirundi" },
  { code: "lo", label: "ລາວ" },
  { code: "sw", label: "Kiswahili" },
  { code: "de", label: "Deutsch" },
];

const NavBar = () => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const langMenuRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: t.home, path: "/" },
    { name: t.games, path: "/games" },
    { name: t.categories, path: "/categories", state: { category: "All Games" } },
    { name: t.premiumGamesLabel, path: "/categories", state: { category: "Premium Games" }, premium: true },
  ];

  const isActive = (item) => {
    if (item.path !== location.pathname) return false;
    if (!item.state?.category) return true;
    const current = location.state?.category || "All Games";
    return current === item.state.category;
  };

  const playWhoosh = () => new Audio("/audio/Whoosh.mp3").play();

  useEffect(() => {
    const scrolled = currentScrollY > 12;
    setIsScrolled(scrolled);
    setIsNavVisible(true);
    navContainerRef.current.classList.toggle("floating-nav", scrolled);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangOpen(false);
  }, [location.pathname, location.state]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  return (
    <div
      ref={navContainerRef}
      className={clsx(
        "fixed inset-x-3 top-4 z-50 h-20 rounded-full border backdrop-blur-xl transition-all duration-700 sm:inset-x-6",
        isScrolled
          ? "border-black/10 bg-white text-black shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          : "border-white/10 bg-black/45 text-white shadow-[0_0_30px_rgba(87,36,255,0.18)]"
      )}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4 py-2 md:px-5">
          <div className="flex items-center gap-4">
            <Link to="/" className="shrink-0">
              <img src="/52.png" alt="play365game" className="h-12 w-auto md:h-14" />
            </Link>
            <Link to="/games" className="hidden md:block">
              <Button
                id="play-now-button"
                title={t.playNow}
                rightIcon={<TiLocationArrow />}
                containerClass="!bg-violet-300 flex items-center justify-center gap-1 !px-5 !py-2.5 shadow-[0_0_18px_rgba(87,36,255,0.35)]"
              />
            </Link>
          </div>

          <div className="flex h-full items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  state={item.state}
                  onClick={playWhoosh}
                  className={
                    item.premium
                      ? `rounded-full border px-4 py-2 font-general text-xs font-bold uppercase tracking-wide transition-all ${
                          isScrolled
                            ? "border-black bg-yellow-300 text-black shadow-none hover:bg-black hover:text-yellow-300"
                            : isActive(item)
                              ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_18px_rgba(237,255,102,0.45)]"
                              : "border-yellow-300/60 bg-yellow-300/10 text-yellow-300 hover:bg-yellow-300 hover:text-black"
                        }`
                      : `rounded-full px-4 py-2 font-general text-xs font-bold uppercase tracking-wide transition-all ${
                          isScrolled
                            ? isActive(item)
                              ? "bg-black/10 text-black"
                              : "text-black/80 hover:bg-black/5 hover:text-black"
                            : isActive(item)
                              ? "bg-white/15 text-white"
                              : "text-blue-50 hover:bg-white/10 hover:text-white"
                        }`
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={clsx(
                  "flex items-center gap-1 rounded-full border px-3 py-2 font-general text-xs uppercase backdrop-blur-sm transition-colors",
                  isScrolled
                    ? "border-black/15 bg-black/5 text-black hover:bg-black/10"
                    : "border-white/20 bg-white/10 text-white hover:border-violet-300/60 hover:bg-white/15"
                )}
              >
                {currentLang?.label}
                <span className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {isLangOpen && (
                <div className={clsx(
                  "absolute right-0 mt-3 w-40 overflow-hidden rounded-2xl border shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl",
                  isScrolled ? "border-black/10 bg-white" : "border-white/15 bg-black/90"
                )}>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left font-general text-sm transition-colors ${
                        isScrolled
                          ? lang === l.code
                            ? "bg-violet-300/15 font-semibold text-violet-300"
                            : "text-black hover:bg-black/5"
                          : lang === l.code
                            ? "bg-yellow-300/15 font-semibold text-yellow-300"
                            : "text-white hover:bg-white/10"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-1 flex flex-col gap-1.5 md:hidden"
              aria-label="Menu"
            >
              <span className={`h-0.5 w-6 transition-all ${isScrolled ? "bg-black" : "bg-white"} ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 transition-all ${isScrolled ? "bg-black" : "bg-white"} ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 transition-all ${isScrolled ? "bg-black" : "bg-white"} ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={clsx(
            "absolute left-0 top-full mt-3 w-full rounded-3xl border p-3 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl md:hidden",
            isScrolled ? "border-black/10 bg-white" : "border-white/15 bg-black/90"
          )}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                state={item.state}
                onClick={() => { playWhoosh(); setIsMobileMenuOpen(false); }}
                className={`mb-2 block rounded-2xl px-4 py-3 font-general text-sm font-bold uppercase tracking-wide transition-colors ${
                  item.premium
                    ? "bg-yellow-300 text-black"
                    : isScrolled
                      ? isActive(item)
                        ? "bg-black/10 text-black"
                        : "text-black hover:bg-black/5"
                      : isActive(item)
                        ? "bg-white/15 text-white"
                        : "text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/games"
              onClick={() => { playWhoosh(); setIsMobileMenuOpen(false); }}
              className="mt-1 flex items-center justify-center gap-1 rounded-2xl bg-violet-300 px-4 py-3 font-general text-sm font-bold uppercase text-black"
            >
              {t.playNow}
              <TiLocationArrow />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
