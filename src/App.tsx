import { Header } from "./components/Header";

import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Recipe } from "./pages/Recipe";
import { PageError } from "./pages/PageError";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<PageError />} />
        </Routes>

    </div>
  );
}

export default App;
