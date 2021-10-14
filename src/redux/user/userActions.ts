import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { UserConstants } from "./userConstants";

export function signInUser(name: string): AnyAction {
  return action(UserConstants.SIGN_IN, name);
}

export function signOutUser(): AnyAction {
  return action(UserConstants.SIGN_OUT);
}
