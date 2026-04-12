import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "es", label: "Español" },
];

const NavBar = () => {
  const { lang, setLang, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: t.home, path: "/" },
    { name: t.games, path: "/games" },
    { name: t.categories, path: "/categories" },
  ];

  const playWhoosh = () => new Audio("/audio/Whoosh.mp3").play();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Link to="/">
              <img src="/52.png" alt="play365game" className="h-16 w-auto md:h-20" />
            </Link>
            <Link to="/games">
              <Button
                id="play-now-button"
                title={t.playNow}
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </Link>
          </div>

          <div className="flex h-full items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <Link key={index} to={item.path} onClick={playWhoosh} className="nav-hover-btn">
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 rounded-md border border-white/30 bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                {currentLang?.label}
                <span className={`ml-1 transition-transform ${isLangOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-md border border-white/20 bg-black/90 backdrop-blur-md shadow-lg overflow-hidden">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${lang === l.code ? "text-blue-400 font-semibold" : "text-white"}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden flex-col gap-1.5 ml-2"
            >
              <span className={`h-0.5 w-6 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-6 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md p-4 mt-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => { playWhoosh(); setIsMobileMenuOpen(false); }}
                className="block py-3 text-white font-general text-sm uppercase hover:text-blue-75 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
