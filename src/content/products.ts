import { defaultProducts as sharedDefaultProducts } from "../../shared/defaultProducts";

export interface Product {
  id: string;
  name: string;
  price: string | null;
  description: string | null;
  ingredients: string | null;
}

export const defaultProducts: Product[] = [...sharedDefaultProducts];
