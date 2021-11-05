export type CategoryName = string;

export interface CategoryInfo {
  readonly id: CategoryName;

  readonly label: string;

  readonly logo: string;

  readonly link: string;
}

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
  genre?: string;
}

export interface UserResponseInfo {
  id: number;
  email: string;
}

export interface Profile {
  email: string;
  description?: string;
  picture?: string;
}

export interface CartItem {
  product: Product;
  selectedPlatform: CategoryName;
  orderDate: Date;
  amount: number;
}
