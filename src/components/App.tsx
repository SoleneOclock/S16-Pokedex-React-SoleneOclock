import axios from "axios";
import { useEffect, useState } from "react";
import { Moon, Sun } from "feather-icons-react";

// import de notre interface
import { IPokemon } from "../@types/pokemon";
import PokemonList from "./PokemonList/PokemonList";
import logo from "../assets/logo.png";

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
    <div className={isDark ? "bg-slate-800 text-zinc-50" : "bg-slate-100"}>
      <nav className="flex items-center justify-around p-2">
        <a href="/" className="w-3/4">
          <img src={logo} className="w-32" />
        </a>
        <a
          href="/about"
          className="w-32"
          onClick={(e) => {
            // ce serait bien que tous nos liens ne fasse pas de requette HTTP vers le serveur : on est en SPA
            e.preventDefault();

            // on va pas changer de page MAIS on va modifier l'URL (un faux changement)
            history.pushState({}, "", "/about");
          }}
        >
          About us
        </a>
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
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;
