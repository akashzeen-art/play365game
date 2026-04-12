import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          {t.allRights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
