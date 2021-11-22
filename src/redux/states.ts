import { CartItem, Profile } from "@/types";

export interface UserState {
  id: number;
  username: string;
  password: string;
  balance: number;
  isSignedIn: boolean;
}

export interface ProfileState {
  state: Profile;
}

export interface CartState {
  items: CartItem[];
}

export interface AuthModalState {
  isSignInWindowShowing: boolean;
  isSignUpWindowShowing: boolean;
}
