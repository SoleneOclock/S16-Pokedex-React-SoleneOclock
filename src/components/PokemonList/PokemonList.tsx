import { IPokemon } from "../../@types/pokemon";

interface PokemonListProps {
  pokemons: IPokemon[];
}

function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-around">
      {pokemons.map((pokemon) => (
        <div className="bg-teal-400 p-4 rounded w-1/5">
          <img src={pokemon.sprites.regular} />
          <h2>{pokemon.name.fr}</h2>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
