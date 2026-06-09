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
    description: null,
    ingredients:
      "Sugar, flour, cocoa powder, baking powder, baking soda, salt, eggs, milk, vegetable oil, vanilla extract, powdered sugar, heavy cream",
  },
];
