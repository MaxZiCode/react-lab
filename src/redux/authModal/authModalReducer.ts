import { AnyAction } from "redux";
import { AuthModalConstants } from "../constants";
import { AuthModalState } from "../states";

const initialState: AuthModalState = {
  isSignInWindowShowing: false,
  isSignUpWindowShowing: false,
};

export default function cartReducer(state = initialState, action: AnyAction): AuthModalState {
  switch (action.type) {
    case AuthModalConstants.SHOW_SIGN_IN_WINDOW:
      return { ...state, isSignInWindowShowing: true };

    case AuthModalConstants.CLOSE_SIGN_IN_WINDOW:
      return { ...state, isSignInWindowShowing: false };

    case AuthModalConstants.SHOW_SIGN_UP_WINDOW:
      return { ...state, isSignUpWindowShowing: true };

    case AuthModalConstants.CLOSE_SIGN_UP_WINDOW:
      return { ...state, isSignUpWindowShowing: false };

    default: {
      return state;
    }
  }
}
