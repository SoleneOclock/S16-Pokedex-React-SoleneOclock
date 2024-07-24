export interface IType {
  id: number;
  name: Name;
  sprites: string;
  resistances: Resistance[];
}

export interface Name {
  fr: string;
  en: string;
  jp: string;
}

export interface Resistance {
  name: string;
  multiplier: number;
}
