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

// import de nos interfaces
import { IPokemon } from "../@types/pokemon";
import { IType } from "../@types/type";

// import des sous composants
import PokemonList from "./PokemonList/PokemonList";
import logo from "../assets/logo.png";
import AboutPage from "./AboutPage/AboutPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import PokemonPage from "./PokemonList/PokemonPage";
import TypePage from "./TypePage/TypePage";

function App() {
  // STATE pour stocker un tableau d'objet Pokemon
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  // STATE pour stocker les types
  const [types, setTypes] = useState<IType[]>([]);

  // STATE pour stocker l'état du mode couleur
  const [isDark, setIsDark] = useState(false);

  // STATE pour stocker l'etat de loading :
  // il est à true tant que les state pokemon et types contiennent des tableaux vides
  // on le passe à false dès que les données sont enregistrées en state
  // on s'en sert pour conditionner l'affichage des routes
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://tyradex.tech/api/v1/types");

        // il faut loguer la response absoluement pour voir ce qu'on reçoit et trouver ou sont les données qui nous interessent
        //console.log(response);

        // les types sont dans response.data on enregistre le tableau des types dans le state
        setTypes(response.data);
      } catch (e) {
        console.log("erreur");
      }
    };

    // on lance en parallèle les 2 fetchs et quand ils sont terminés tous les 2 on passe le loader à false
    Promise.all([fetchPokemons(), fetchTypes()]).then(() => {
      setIsLoading(false);
    });
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

      <div className="flex flex-wrap gap-4 m-4">
        {types.map((type) => (
          <NavLink
            to={`/type/${type.id}`}
            key={type.id}
            className="bg-rose-400 rounded p-1 hover:bg-teal-500"
          >
            {type.name.fr}
          </NavLink>
        ))}
      </div>

      <h1 className="text-purple-600 text-3xl text-center mb-6">
        Pokedex React
      </h1>

      {
        // on créé les routes QUE si on est pas en train de loader
        // sinon au premier rendu sur l'URL /pokemon/215
        // la PokemonPage ne trouvera pas le pokemon 215 dans le state
        // (puisqu'on aura pas encore rempli le state, au premier rendu c'est un tableau vide)
        // donc il ne faut pas match cette URL tant qu'on a pas les données (tant que isLoading est true)
        isLoading ? (
          <p>loading...</p>
        ) : (
          <Routes>
            <Route path="/" element={<PokemonList pokemons={pokemons} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/pokemon/:pokedex_id"
              element={<PokemonPage allPokemons={pokemons} />}
            />
            <Route
              path="/type/:type_id"
              element={<TypePage types={types} pokemons={pokemons} />}
            />
            <Route path="/error" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;
