// List of video games: https://en.wikipedia.org/wiki/List_of_video_games_notable_for_negative_reception

import categoriesValues from "@/constants/categoriesValues";

const url = "http://localhost:3000";

export type Platform = keyof typeof categoriesValues;

export interface ProductName {
  id: number;
  name: string;
}

export interface Product extends ProductName {
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  imagePath: string;
  description: string;
  age: "3+" | "6+" | "10+" | "12+" | "13+" | "18+";
  date: Date;
  platforms: Platform[];
}

// Start json server: npx json-server --watch src/data/mock-data.json

export async function getProduct(id: number | string): Promise<Product> {
  const resp = await fetch(`${url}/products/${id}`);
  const result: Product = await resp.json();
  return result;
}

export async function searchProductNames(query: string): Promise<ProductName[]> {
  const resp = await fetch(`${url}/products?name_like=${query}`);
  await new Promise((r) => setTimeout(r, 1500));
  const result: ProductName[] = await resp.json();
  return result;
}

export async function getTop(number: number): Promise<Product[]> {
  const resp = await fetch(`${url}/products?_sort=date&_order=desc&_limit=${number}`);
  const result: Product[] = await resp.json();
  return result;
}
