import { defaultProducts, type Product } from "../content/products";
import { getSanityClient, isSanityConfigured } from "./sanity/client";
import { mapProduct } from "./sanity/mapProduct";
import { PRODUCTS_QUERY } from "./sanity/queries";

let productsPromise: Promise<Product[]> | null = null;

async function loadProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) {
    return defaultProducts;
  }

  try {
    const docs = await getSanityClient().fetch(PRODUCTS_QUERY);
    if (!docs?.length) {
      return defaultProducts;
    }
    return docs.map(mapProduct);
  } catch {
    return defaultProducts;
  }
}

export function getProducts(): Promise<Product[]> {
  if (!productsPromise) {
    productsPromise = loadProducts();
  }
  return productsPromise;
}
