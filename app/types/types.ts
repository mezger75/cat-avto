export interface ICar {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string | null;
  tarif: string[];
}

export interface ICarImage {
  id: string;
  image: string;
}

export interface ICarDetails {
  id: number;
  brand: string;
  model: string;
  price: number;
  images: ICarImage[];
  tarif: string[];
}
