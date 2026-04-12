import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import GamesPage from "./pages/GamesPage";
import CategoriesPage from "./pages/CategoriesPage";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <LanguageProvider>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Router>
        <main className="relative min-h-screen w-screen overflow-x-hidden">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </main>
      </Router>
    </LanguageProvider>
  );
}

export default App;
