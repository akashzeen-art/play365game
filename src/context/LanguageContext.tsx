import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "fr" | "ar" | "es";

interface Translations {
  playNow: string;
  home: string;
  games: string;
  categories: string;
  welcomeTo: string;
  experienceUltimate: string;
  whereEvery: string;
  instantAccess: string;
  exploreCategories: string;
  exploreDesc: string;
  actionTitle: string;
  puzzleTitle: string;
  top10Title: string;
  arcadeTitle: string;
  action: string;
  puzzle: string;
  top10: string;
  arcade: string;
  moreGames: string;
  journeyStarts: string;
  discoverEndless: string;
  jumpInto: string;
  joinCommunity: string;
  letsPlay: string;
  playAnytime: string;
  gamingHub: string;
  allRights: string;
  gameCategories: string;
  allGames: string;
  top10Games: string;
  easyToPlay: string;
  playBtn: string;
  back: string;
  playConquer: string;
  exploreEpic: string;
  thrilling: string;
  featuredGames: string;
  popularPicks: string;
  allGamesHeading: string;
}

const translations: Record<Lang, Translations> = {
  en: {
    playNow: "Play Now",
    home: "Home",
    games: "Games",
    categories: "Categories",
    welcomeTo: "Welcome to Play365Game",
    experienceUltimate: "Exper<b>i</b>ence the ultimate <br /> gaming platf<b>o</b>rm",
    whereEvery: "Where every game is an adventure waiting to be conquered",
    instantAccess: "Play365Game brings you instant access to hundreds of games across all genres, from action-packed shooters to brain-teasing puzzles",
    exploreCategories: "Explore Gaming Categories",
    exploreDesc: "Dive into our diverse collection of games spanning multiple genres. From intense action to relaxing puzzles, find your perfect gaming experience.",
    actionTitle: "Acti<b>o</b>n",
    puzzleTitle: "Puzz<b>l</b>e",
    top10Title: "Top <b>1</b>0 Games",
    arcadeTitle: "Arca<b>d</b>e",
    action: "Experience heart-pounding action games with intense combat, epic battles, and adrenaline-pumping gameplay.",
    puzzle: "Challenge your mind with brain-teasing puzzles, strategic thinking, and mind-bending challenges.",
    top10: "Discover our most popular and trending games loved by players worldwide.",
    arcade: "Enjoy classic arcade fun with retro-inspired games, endless entertainment, and nostalgic vibes.",
    moreGames: "M<b>o</b>re ga<b>m</b>es",
    journeyStarts: "your gaming journey starts here",
    discoverEndless: "disc<b>o</b>ver <br /> endless g<b>a</b>mes",
    jumpInto: "Jump into thrilling gameplay with instant access to top-rated games. Challenge yourself, compete globally, and dominate the leaderboards.",
    joinCommunity: "Join Our Community",
    letsPlay: "let&#39;s pl<b>a</b>y and <br /> conquer <br /> t<b>o</b>gether.",
    playAnytime: "Play Anytime, Anywhere",
    gamingHub: "Your Gaming Hub Awaits",
    gameCategories: "G<b>a</b>me Categories",
    allGames: "All Games",
    top10Games: "Top 10 Games",
    easyToPlay: "Easy to Play",
    playBtn: "Play",
    back: "Back",
    playConquer: "Play & Conquer",
    exploreEpic: "Expl<b>o</b>re Epic <br /> G<b>a</b>mes",
    thrilling: "Dive into our collection of thrilling adventures",
    featuredGames: "Feat<b>u</b>red Games",
    popularPicks: "Pop<b>u</b>lar Picks",
    allGamesHeading: "<b>A</b>ll Games",
    allRights: "©Play365Game 2026. All rights reserved",
  },
  fr: {
    playNow: "Jouer Maintenant",
    home: "Accueil",
    games: "Jeux",
    categories: "Catégories",
    welcomeTo: "Bienvenue sur Play365Game",
    experienceUltimate: "Viv<b>e</b>z la plateforme <br /> de jeu ulti<b>m</b>e",
    whereEvery: "Où chaque jeu est une aventure à conquérir",
    instantAccess: "Play365Game vous offre un accès instantané à des centaines de jeux dans tous les genres.",
    exploreCategories: "Explorer les Catégories",
    exploreDesc: "Plongez dans notre collection de jeux couvrant plusieurs genres. De l'action intense aux puzzles relaxants.",
    actionTitle: "Acti<b>o</b>n",
    puzzleTitle: "Casse-<b>t</b>ête",
    top10Title: "Top <b>1</b>0 Jeux",
    arcadeTitle: "Arca<b>d</b>e",
    action: "Vivez des jeux d'action palpitants avec des combats intenses et des batailles épiques.",
    puzzle: "Défiez votre esprit avec des puzzles et une réflexion stratégique.",
    top10: "Découvrez nos jeux les plus populaires aimés par les joueurs du monde entier.",
    arcade: "Profitez du plaisir classique de l'arcade avec des jeux rétro.",
    moreGames: "Pl<b>u</b>s de j<b>e</b>ux",
    journeyStarts: "votre aventure commence ici",
    discoverEndless: "déc<b>o</b>uvrir <br /> des j<b>e</b>ux infinis",
    jumpInto: "Plongez dans un gameplay palpitant avec un accès instantané aux jeux les mieux notés.",
    joinCommunity: "Rejoignez Notre Communauté",
    letsPlay: "jouons et <br /> conquér<b>o</b>ns <br /> ens<b>e</b>mble.",
    playAnytime: "Jouez N'importe Quand",
    gamingHub: "Votre Hub Gaming Vous Attend",
    gameCategories: "Cat<b>é</b>gories de Jeux",
    allGames: "Tous les Jeux",
    top10Games: "Top 10 Jeux",
    easyToPlay: "Facile à Jouer",
    playBtn: "Jouer",
    back: "Retour",
    playConquer: "Jouer & Conquérir",
    exploreEpic: "Expl<b>o</b>rer les <br /> J<b>e</b>ux Épiques",
    thrilling: "Plongez dans notre collection d'aventures palpitantes",
    featuredGames: "J<b>e</b>ux en Vedette",
    popularPicks: "S<b>é</b>lections Populaires",
    allGamesHeading: "<b>T</b>ous les Jeux",
    allRights: "©Play365Game 2026. Tous droits réservés",
  },
  ar: {
    playNow: "العب الآن",
    home: "الرئيسية",
    games: "الألعاب",
    categories: "الفئات",
    welcomeTo: "مرحباً بك في Play365Game",
    experienceUltimate: "اختب<b>ر</b> منصة <br /> الألع<b>ا</b>ب المثالية",
    whereEvery: "حيث كل لعبة مغامرة تنتظر أن تُفتح",
    instantAccess: "يمنحك Play365Game وصولاً فورياً لمئات الألعاب عبر جميع الأنواع.",
    exploreCategories: "استكشف فئات الألعاب",
    exploreDesc: "انغمس في مجموعتنا المتنوعة من الألعاب. من الحركة المكثفة إلى الألغاز المريحة.",
    actionTitle: "<b>ح</b>ركة",
    puzzleTitle: "أل<b>غ</b>از",
    top10Title: "أفضل <b>١٠</b> ألعاب",
    arcadeTitle: "أرك<b>ي</b>د",
    action: "اختبر ألعاب الحركة المثيرة مع قتال مكثف ومعارك ملحمية.",
    puzzle: "تحدَّ عقلك بألغاز صعبة وتفكير استراتيجي.",
    top10: "اكتشف أكثر ألعابنا شعبية التي يحبها اللاعبون حول العالم.",
    arcade: "استمتع بمتعة الأركيد الكلاسيكية مع ألعاب مستوحاة من الحنين.",
    moreGames: "مز<b>ي</b>د من <b>الأ</b>لعاب",
    journeyStarts: "رحلتك في الألعاب تبدأ هنا",
    discoverEndless: "اكتش<b>ف</b> <br /> ألع<b>ا</b>باً لا نهاية لها",
    jumpInto: "انغمس في أسلوب لعب مثير مع وصول فوري لأعلى الألعاب تقييماً.",
    joinCommunity: "انضم إلى مجتمعنا",
    letsPlay: "لنلع<b>ب</b> <br /> ونتغل<b>ب</b> <br /> مع<b>ا</b>ً.",
    playAnytime: "العب في أي وقت وأي مكان",
    gamingHub: "مركز الألعاب الخاص بك في انتظارك",
    gameCategories: "<b>ف</b>ئات الألعاب",
    allGames: "جميع الألعاب",
    top10Games: "أفضل 10 ألعاب",
    easyToPlay: "سهل اللعب",
    playBtn: "العب",
    back: "رجوع",
    playConquer: "العب وانتصر",
    exploreEpic: "استكش<b>ف</b> ألعاب <br /> مل<b>ح</b>مية",
    thrilling: "انغمس في مجموعتنا من المغامرات المثيرة",
    featuredGames: "ألعاب <b>م</b>ميزة",
    popularPicks: "الأكثر <b>ش</b>عبية",
    allGamesHeading: "<b>ج</b>ميع الألعاب",
    allRights: "©Play365Game 2026. جميع الحقوق محفوظة",
  },
  es: {
    playNow: "Jugar Ahora",
    home: "Inicio",
    games: "Juegos",
    categories: "Categorías",
    welcomeTo: "Bienvenido a Play365Game",
    experienceUltimate: "Exper<b>i</b>menta la plataforma <br /> de juegos ulti<b>m</b>a",
    whereEvery: "Donde cada juego es una aventura esperando ser conquistada",
    instantAccess: "Play365Game te brinda acceso instantáneo a cientos de juegos en todos los géneros.",
    exploreCategories: "Explorar Categorías de Juegos",
    exploreDesc: "Sumérgete en nuestra diversa colección de juegos. Desde acción intensa hasta puzzles relajantes.",
    actionTitle: "Acci<b>ó</b>n",
    puzzleTitle: "Rompe<b>c</b>abezas",
    top10Title: "Top <b>1</b>0 Juegos",
    arcadeTitle: "Arca<b>d</b>e",
    action: "Experimenta juegos de acción emocionantes con combate intenso y batallas épicas.",
    puzzle: "Desafía tu mente con puzzles y pensamiento estratégico.",
    top10: "Descubre nuestros juegos más populares amados por jugadores de todo el mundo.",
    arcade: "Disfruta la diversión clásica del arcade con juegos retro y entretenimiento sin fin.",
    moreGames: "M<b>á</b>s ju<b>e</b>gos",
    journeyStarts: "tu aventura de juegos comienza aquí",
    discoverEndless: "desc<b>u</b>bre <br /> juegos <b>i</b>nfinitos",
    jumpInto: "Sumérgete en una jugabilidad emocionante con acceso instantáneo a los juegos mejor valorados.",
    joinCommunity: "Únete a Nuestra Comunidad",
    letsPlay: "juguemos y <br /> conquisT<b>e</b>mos <br /> junt<b>o</b>s.",
    playAnytime: "Juega en Cualquier Momento",
    gamingHub: "Tu Centro de Juegos Te Espera",
    gameCategories: "Cat<b>e</b>gorías de Juegos",
    allGames: "Todos los Juegos",
    top10Games: "Top 10 Juegos",
    easyToPlay: "Fácil de Jugar",
    playBtn: "Jugar",
    back: "Volver",
    playConquer: "Jugar & Conquistar",
    exploreEpic: "Expl<b>o</b>ra Juegos <br /> Ép<b>i</b>cos",
    thrilling: "Súmergete en nuestra colección de aventuras emocionantes",
    featuredGames: "Ju<b>e</b>gos Destacados",
    popularPicks: "Sel<b>e</b>cciones Populares",
    allGamesHeading: "<b>T</b>odos los Juegos",
    allRights: "©Play365Game 2026. Todos los derechos reservados",
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
