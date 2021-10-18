import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { RoutesConstants } from "../constants";

// eslint-disable-next-line import/prefer-default-export
export function setRedirectSignIn(path?: string): AnyAction {
  return action(RoutesConstants.SET_REDIRECT_SIGN_IN, path);
}

export function clearRedirectSignIn(): AnyAction {
  return action(RoutesConstants.CLEAR_REDIRECT_SIGN_IN);
}
