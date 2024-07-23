// pour écrire notre interface qui defini le type de notre objet Pokemon
// soit on le fait à la main
// soit on demande à chatGPT soit on fait la traduction sur un site comme celui ci :
// https://transform.tools/json-to-typescript

export interface IPokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: Name;
  sprites: Sprites;
  types: Type[];
  talents: Talent[];
  stats: Stats;
  resistances: Resistance[];
  evolution: Evolution;
  height: string;
  weight: string;
  egg_groups: string[];
  sexe: Sexe;
  catch_rate: number;
  level_100: number;
  formes: Forme[];
}

export interface Name {
  fr: string;
  en: string;
  jp: string;
}

export interface Sprites {
  regular: string;
  shiny: string;
  gmax: null | {
    regular: string;
    shiny: string;
  };
}

export interface Type {
  name: string;
  image: string;
}

export interface Talent {
  name: string;
  tc: boolean;
}

export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
}

export interface Resistance {
  name: string;
  multiplier: number;
}

export interface Evolution {
  pre: Pre[];
  next: null | Pre[];
  mega: null | Pre[];
}

export interface Pre {
  pokedex_id: number;
  name: string;
  condition: string;
}

export interface Sexe {
  male: number;
  female: number;
}

export interface Forme {
  region: string;
  name: Name2;
}

export interface Name2 {
  fr: string;
  en: string;
  jp: string;
}
