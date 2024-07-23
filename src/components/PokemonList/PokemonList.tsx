import { Link } from "react-router-dom";

import { IPokemon } from "../../@types/pokemon";

interface PokemonListProps {
  pokemons: IPokemon[];
}

function PokemonList({ pokemons }: PokemonListProps) {
  console.log(pokemons);

  return (
    <div className="flex flex-wrap gap-2 justify-around">
      {pokemons.map((pokemon) => (
        <Link
          to={`/pokemon/${pokemon.pokedex_id}`}
          className="bg-teal-400 p-4 rounded w-1/5"
          key={pokemon.pokedex_id}
        >
          <img src={pokemon.sprites.regular} />
          <h2>{pokemon.name.fr}</h2>
        </Link>
      ))}
    </div>
  );
}

export default PokemonList;
