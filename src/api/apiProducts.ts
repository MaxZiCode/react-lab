const url = "http://localhost:3000";

export interface ProductName {
  id: number;
  name: string;
}

export interface Product extends ProductName {
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  imagePath: string;
  description: string;
  age: "3+" | "6+" | "12+" | "18+";
}

export async function getProduct(id: number | string): Promise<Product> {
  const resp = await fetch(`${url}/products/${id}`);
  const result: Product = await resp.json();
  return result;
}

export async function searchProductNames(query: string): Promise<ProductName[]> {
  const resp = await fetch(`${url}/products?name_like=${query}`);
  const result: ProductName[] = await resp.json();
  return result;
}
