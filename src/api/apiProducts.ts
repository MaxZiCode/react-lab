// List of video games: https://en.wikipedia.org/wiki/List_of_video_games_notable_for_negative_reception

import { CategoryName } from "@/constants/categoriesValues";

const url = "http://localhost:3000";

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  imagePath: string;
  description: string;
  age: string;
  date: Date;
  platforms: CategoryName[];
}

// Start json server: npx json-server --watch src/data/mock-data.json

export async function getProduct(id: number | string): Promise<Product> {
  const resp = await fetch(`${url}/products/${id}`);
  const result: Product = await resp.json();
  return result;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const resp = await fetch(`${url}/products?name_like=${query}`);
  await new Promise((r) => setTimeout(r, 1500));
  const result: Product[] = await resp.json();
  return result;
}

export async function getTop(number: number): Promise<Product[]> {
  const resp = await fetch(`${url}/products?_sort=date&_order=desc&_limit=${number}`);
  const result: Product[] = await resp.json();
  return result;
}
