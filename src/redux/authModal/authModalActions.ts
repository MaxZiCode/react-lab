import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { AuthModalConstants } from "../constants";

export function showSignInWindow(): AnyAction {
  return action(AuthModalConstants.SHOW_SIGN_IN_WINDOW);
}

export function closeSignInWindow(): AnyAction {
  return action(AuthModalConstants.CLOSE_SIGN_IN_WINDOW);
}

export function showSignUpWindow(): AnyAction {
  return action(AuthModalConstants.SHOW_SIGN_UP_WINDOW);
}

export function closeSignUpWindow(): AnyAction {
  return action(AuthModalConstants.CLOSE_SIGN_UP_WINDOW);
}
