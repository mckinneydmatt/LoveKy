import type { Product } from "../../content/products";
import type { SanityProductDoc } from "./types";

export function mapProduct(doc: SanityProductDoc): Product {
  return {
    id: doc.slug?.current ?? doc._id ?? "",
    name: doc.name ?? "",
    price: doc.price ?? null,
    description: doc.description ?? null,
    ingredients: doc.ingredients ?? null,
  };
}
