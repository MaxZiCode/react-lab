// List of video games: https://en.wikipedia.org/wiki/List_of_video_games_notable_for_negative_reception

import urls from "@/constants/urls";
import { CategoryName, Product, ProductData } from "@/types";

export async function getProduct(id: number | string): Promise<Product> {
  const resp = await fetch(`${urls.ROOT}/api/products/${id}`);
  const result: Product = await resp.json();
  return result;
}

export async function getProducts(
  category?: CategoryName,
  genre?: string,
  age?: string,
  sort?: string,
  order?: string
): Promise<Product[]> {
  const baseUrl = `${urls.ROOT}/api/products`;

  const query: string[] = [];
  if (category) query.push(`platforms_like=${category}`);
  if (genre) query.push(`genre=${genre}`);
  if (age) query.push(`age=${age}`);
  if (sort) query.push(`_sort=${sort}`);
  if (order) query.push(`_order=${order}`);

  const fullUrl = [baseUrl, query.join("&")].join("?");

  const resp = await fetch(fullUrl);
  const result: Product[] = await resp.json();
  return result;
}

export async function searchProducts(value: string): Promise<Product[]> {
  const resp = await fetch(`${urls.ROOT}/api/search/${value}`);
  const result: Product[] = await resp.json();
  return result;
}

const productsPath = "/api/products";

export async function getTop(): Promise<Product[]> {
  const resp = await fetch(`${urls.ROOT}/api/getTopProducts`);
  const result: Product[] = await resp.json();
  return result;
}

export async function addProduct(productData: ProductData): Promise<Product> {
  const resp = await fetch(`${urls.ROOT}${productsPath}`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(productData),
  });
  const result: Product = await resp.json();
  return result;
}

export async function changeProduct(product: Product): Promise<Product> {
  const resp = await fetch(`${urls.ROOT}${productsPath}/${product.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(product),
  });
  const result: Product = await resp.json();
  return result;
}

export async function deleteProduct(productId: number): Promise<void> {
  await fetch(`${urls.ROOT}${productsPath}/${productId}`, {
    method: "DELETE",
  });
}
