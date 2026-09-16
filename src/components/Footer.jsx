import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { name: t.home, path: "/" },
    { name: t.games, path: "/games" },
    { name: t.categories, path: "/categories", state: { category: "All Games" } },
    { name: t.premiumGamesLabel, path: "/categories", state: { category: "Premium Games" }, premium: true },
  ];

  return (
    <footer className="relative w-screen overflow-hidden bg-black text-blue-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
      <div className="pointer-events-none absolute -left-20 top-0 size-56 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 size-48 rounded-full bg-yellow-300/15 blur-3xl" />

      <div className="container relative mx-auto px-5 py-14 md:px-10 md:py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-md">
            <img src="/52.png" alt="play365game" className="h-16 w-auto md:h-20" />
            <p className="mt-4 font-circular-web text-base text-white/70 md:text-lg">
              {t.gamingHub}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                state={item.state}
                className={
                  item.premium
                    ? "rounded-full bg-yellow-300 px-5 py-2.5 font-general text-xs font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
                    : "rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-general text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-violet-300 hover:bg-white/10"
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-circular-web text-sm text-white/60 md:text-base">{t.allRights}</p>
          <Link
            to="/games"
            className="inline-flex items-center gap-1 rounded-full bg-violet-300 px-5 py-2.5 font-general text-xs font-bold uppercase text-black transition-transform hover:scale-105"
          >
            {t.playNow}
            <TiLocationArrow />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
