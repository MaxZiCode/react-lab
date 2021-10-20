export type CategoryName = "PC" | "PS5" | "XONE";

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
}

export interface UserResponseInfo {
  id: number;
  email: string;
}

export interface Profile {
  username: string;
  description?: string;
  picture?: string;
}

export interface ValidationState {
  isSucceed: boolean;
  errorMessage: string;
}
