import { AnyAction } from "redux";
import { ModalsConstants } from "../constants";
import { ModalsState } from "../states";

const initialState: ModalsState = {
  isSignInShowing: false,
  isSignUpShowing: false,
};

export default function modalsReducer(state: ModalsState = initialState, action: AnyAction): ModalsState {
  switch (action.type) {
    case ModalsConstants.SHOW_SIGN_IN:
      return {
        ...state,
        isSignInShowing: true,
      };

    case ModalsConstants.CLOSE_SIGN_IN:
      return {
        ...state,
        isSignInShowing: false,
      };

    case ModalsConstants.SHOW_SIGN_UP:
      return {
        ...state,
        isSignUpShowing: true,
      };

    case ModalsConstants.CLOSE_SIGN_UP:
      return {
        ...state,
        isSignUpShowing: false,
      };

    default:
      return state;
  }
}
