import { defaultProducts as sharedDefaultProducts } from "../../shared/defaultProducts";

export interface Product {
  id: string;
  name: string;
  price: string | null;
  glutenFreePrice: string | null;
  servingInfo: string | null;
  description: string | null;
}

export const defaultProducts: Product[] = [...sharedDefaultProducts];
