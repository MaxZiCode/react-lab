import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { ModalsConstants } from "../constants";

export function showSignUp(): AnyAction {
  return action(ModalsConstants.SHOW_SIGN_UP);
}

export function closeSignUp(): AnyAction {
  return action(ModalsConstants.CLOSE_SIGN_UP);
}

export function showSignIn(): AnyAction {
  return action(ModalsConstants.SHOW_SIGN_IN);
}

export function closeSignIn(): AnyAction {
  return action(ModalsConstants.CLOSE_SIGN_IN);
}
