import { Link } from "react-router-dom";

import { IPokemon } from "../../@types/pokemon";

interface PokemonListProps {
  pokemons: IPokemon[];
}

function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-between">
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
