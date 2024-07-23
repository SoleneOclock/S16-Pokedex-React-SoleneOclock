import axios from "axios";
import { useEffect, useState } from "react";

// import de notre interface
import { IPokemon } from "../@types/pokemon";

function App() {
  // STATE pour stocker un tableau d'objet Pokemon
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

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
    <div>
      <h1 className="text-purple-600 text-3xl text-center mb-2">
        Pokedex React
      </h1>
      <div className="flex flex-wrap gap-2 justify-around">
        {pokemons.map((pokemon) => (
          <div className="bg-teal-400 p-4 rounded w-1/5">
            <img src={pokemon.sprites.regular} />
            <h2>{pokemon.name.fr}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
