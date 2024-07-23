/* import des composants de react-router-dom
- LINK va remplacer dans le JSX tous les <a>
  ça va faire des liens qui quand on clique dessus ne changent pas de page (pas de nouvelle requette HTTP) mais l'url change quand même (pushState de l'API history html5)
- NAVLINK : tout comme Link mais ajoute une classe "active" sur le lien si l'url correspond à la valeur de sa prop "to"
- ROUTES qui emglobe toutes les Route (sans S)
- ROUTE est un mapping entre une URL et un element JSX
*/
import { Link, NavLink, Route, Routes } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { Moon, Sun } from "feather-icons-react";

// import de notre interface
import { IPokemon } from "../@types/pokemon";
import PokemonList from "./PokemonList/PokemonList";
import logo from "../assets/logo.png";
import AboutPage from "./AboutPage/AboutPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import PokemonPage from "./PokemonList/PokemonPage";

function App() {
  // STATE pour stocker un tableau d'objet Pokemon
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  // STATE pour stocker l'état du mode couleur
  const [isDark, setIsDark] = useState(false);

  // après le premier chargement de la page on va fetch les données et on les placent dans le state
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // on fetch l'API
        const response = await axios.get(
          "https://tyradex.vercel.app/api/v1/pokemon"
        );

        // on recupère les pokemons
        const pokemonArray = response.data;

        // on vire le premier pke c'est le bug avec tout à null
        pokemonArray.shift();

        // on enregistre les pokemons dans le state
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
        <NavLink
          to="/about"
          className={({ isActive }) => {
            // la callback prend en param un objet qu'on destructure pour ne garder que isActive et on return la classe qu'on veut appliquer au lien en fonction de isActive
            return isActive ? "underline" : "";
          }}
        >
          About us
        </NavLink>
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
        <Route
          path="/pokemon/:pokedex_id"
          element={<PokemonPage allPokemons={pokemons} />}
        />
        <Route path="/error" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
