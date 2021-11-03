import { Profile } from "@/types";

export interface UserState {
  id: number;
  username: string;
  password: string;
  isSignedIn: boolean;
}

export interface ProfileState {
  state: Profile;
}
