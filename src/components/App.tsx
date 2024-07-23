// import du composant Link de react-router-dom
// on va l'utiliser dans le JSX à  la place des <a>
// ça va faire des leins qui quand on clique dessus on ne change pas de page (pas de nouvelle requette HTTP) mais l'url change quand même (pushState de l'API history html)
// import de Routes qui emglobe toutes les Route (sans S)
// une route est un mapping entre une URL et un element JSX
import { Link, Route, Routes } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { Moon, Sun } from "feather-icons-react";

// import de notre interface
import { IPokemon } from "../@types/pokemon";
import PokemonList from "./PokemonList/PokemonList";
import logo from "../assets/logo.png";
import AboutPage from "./AboutPage/AboutPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

function App() {
  // STATE pour stocker un tableau d'objet Pokemon
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  // STATE pour stocker l'état du mode couleur
  const [isDark, setIsDark] = useState(false);

  // après le premier chargement de la page on va fetch les données et on les placent dans le state
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // fetch les données
        const response = await axios.get(
          "https://tyradex.vercel.app/api/v1/pokemon"
        );
        console.log(response);

        // on a recupéré les pokemosn de l'APi on va les enregistrer dans le state
        // le state est affcihé sur la page
        const pokemonArray = response.data;
        // on vire le premier pokemon avant de les enregistrer dans le state pke c'est le bug avec tout à null
        pokemonArray.shift();

        setPokemons(pokemonArray);
      } catch (e) {
        console.log("erreur");
      }
    };
    fetchPokemons();
  }, []);

  return (
    <div
      className={
        isDark ? "bg-slate-800 text-zinc-50 h-lvh" : "bg-slate-100 h-lvh"
      }
    >
      <nav className="flex items-center justify-around p-2">
        <Link to="/" className="w-3/4">
          <img src={logo} className="w-32" />
        </Link>
        <Link to="/about" className="w-32">
          About us
        </Link>
        <button
          onClick={() => {
            setIsDark(!isDark);
          }}
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </nav>
      <h1 className="text-purple-600 text-3xl text-center mb-6">
        Pokedex React
      </h1>

      <Routes>
        <Route path="/" element={<PokemonList pokemons={pokemons} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
