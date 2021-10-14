import { Product } from "@/api/apiProducts";

export interface UserState {
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

export interface RouteState {
  signInRedirectPath?: string;
}
