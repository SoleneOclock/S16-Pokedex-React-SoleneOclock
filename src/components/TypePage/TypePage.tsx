import { Navigate, useParams } from "react-router-dom";
import PageBorder from "../PageBorder/PageBorder";
import { IType } from "../../@types/type";
import { IPokemon } from "../../@types/pokemon";
import PokemonList from "../PokemonList/PokemonList";

interface TypePageProps {
  types: IType[];
  pokemons: IPokemon[];
}

function TypePage({ types, pokemons }: TypePageProps) {
  const { type_id } = useParams();

  // chercher le type dans le tableau
  const typeToDisplay = types.find((type) => type.id === Number(type_id));

  // chercher tous les pokemons de ce type là
  const pokemonOfThisType = pokemons.filter((pokemon) =>
    pokemon.types.some((type) => type.name === typeToDisplay?.name.fr)
  );

  if (!typeToDisplay) {
    return <Navigate to="/error" />;
  }
  return (
    <PageBorder title={`Type : ${typeToDisplay.name.fr}`}>
      <img src={typeToDisplay.sprites} />

      <h3>Pokemon of his type :</h3>
      <PokemonList pokemons={pokemonOfThisType} />
    </PageBorder>
  );
}

export default TypePage;
