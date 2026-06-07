export interface Product {
  id: string;
  name: string;
  price: string | null;
  description: string | null;
  ingredients: string | null;
}

export const defaultProducts: Product[] = [
  {
    id: "chocolate-cake",
    name: "10-inch chocolate cake with whipped chocolate frosting",
    price: "$44",
    description:
      "Rich chocolate layers with whipped chocolate frosting — the original Love, Ky Cakes favorite.",
    ingredients: null,
  },
  {
    id: "vanilla-bean-cake",
    name: "10-inch vanilla bean cake with buttercream frosting",
    price: "$42",
    description:
      "Classic vanilla bean cake with smooth buttercream — light, simple, and crowd-pleasing.",
    ingredients: null,
  },
  {
    id: "red-velvet-cake",
    name: "10-inch red velvet cake with cream cheese frosting",
    price: "$48",
    description:
      "Velvety red layers with tangy cream cheese frosting — a celebration classic.",
    ingredients: null,
  },
];
