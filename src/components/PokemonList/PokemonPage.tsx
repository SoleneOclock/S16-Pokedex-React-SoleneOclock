/* import des outils de react-router-dom
- hook useParams : pour recuperer les valeurs des params dynamiques de l'URL
- composant Navigate : pour changer l'URL dès qu'il sera rendu
*/
import { useParams, Navigate } from "react-router-dom";
import { IPokemon } from "../../@types/pokemon";
import PageBorder from "../PageBorder/PageBorder";

interface PokemonPageProps {
  allPokemons: IPokemon[];
}

// ce composant est affiché quand l'url est de type /pokemon/:pokedex_Id
// donc elle va etre affiché par exemple pour :
// - /pokemon/1 -> afficher les infos du pokemon 1
// - /pokemon/toto -> rediriger vers la page erreur

export default function PokemonPage({ allPokemons }: PokemonPageProps) {
  // avec useParams on récupère l'identifiant dans l'URL pour savoir quel pokemon afficher !!
  const params = useParams();
  const urlPodemonId = params.pokedex_id;

  // une fois qu'on a le numéro du pokemon : 2 option pour recuperer ses infos :
  // - soit on fetch vers l'API sur le endpoint : /api/v1/pokemon/<identifiant>
  // - soit on a deja toutes les données qu'on a fetch dans App donc on les recup en props et on trouve celle qu'il nous faut

  // on utilise la fonction find (qui est une méthode du prototype des tableaux en JS) pour trouver la ligne du pokemon dont l'id est celui recupéré dans l'URL
  const pokemonToDisplay = allPokemons.find((pokemon) => {
    // on renvoie vrai si on est sur la ligne du pokemon dont l'id vaut pokedex_id (de l'URL)
    return pokemon.pokedex_id === Number(urlPodemonId);
  });

  // on verifie qu'on a bien trouvé un pokemon ayant le numéro de l'url
  // si l'utilisateur a mis dans l'URL un numéro qui n'existe pas
  // il faut rediriger l'utilisateur vers la page Erreur
  if (!pokemonToDisplay) {
    // on return Navigate qui quand il sera rendu va changer l'url en /error
    return <Navigate to="/error" replace={true} />;
  }
  return (
    <PageBorder title={pokemonToDisplay.name.fr}>
      <img src={pokemonToDisplay.sprites.shiny} className="w-40" />
      liste des talents :
      {pokemonToDisplay.talents.map((talent) => (
        <span key={talent.name}>{talent.name}</span>
      ))}
    </PageBorder>
  );
}
