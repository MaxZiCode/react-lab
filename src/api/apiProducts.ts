// List of video games: https://en.wikipedia.org/wiki/List_of_video_games_notable_for_negative_reception

import urls from "@/constants/urls";
import { Product } from "@/types";

export async function getProduct(id: number | string): Promise<Product> {
  const resp = await fetch(`${urls.ROOT}/api/products/${id}`);
  const result: Product = await resp.json();
  return result;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const resp = await fetch(`${urls.ROOT}/api/search/${query}`);
  const result: Product[] = await resp.json();
  return result;
}

export async function getTop(): Promise<Product[]> {
  const resp = await fetch(`${urls.ROOT}/api/getTopProducts`);
  const result: Product[] = await resp.json();
  return result;
}
