import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { UserConstants } from "../constants";

export function signInUser(id: number, username: string, password: string): AnyAction {
  return action(UserConstants.SIGN_IN, { id, username, password });
}

export function signOutUser(): AnyAction {
  return action(UserConstants.SIGN_OUT);
}
