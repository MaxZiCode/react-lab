import { Product } from "@/types";

export interface UserState {
  id?: number;
  username?: string;
  isSignedIn: boolean;
}

export interface ProductsState {
  topProducts: Product[];
}

export interface ModalsState {
  isSignInShowing: boolean;
  isSignUpShowing: boolean;
}

export interface RoutesState {
  redirectSignIn?: string;
}
