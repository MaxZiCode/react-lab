import { AnyAction } from "redux";
import { UserConstants } from "../constants";
import { UserState } from "../states";

const initialState: UserState = {
  isSignedIn: false,
};

export default function userReducer(state: UserState = initialState, action: AnyAction): UserState {
  switch (action.type) {
    case UserConstants.SIGN_IN: {
      return {
        ...state,
        ...action.payload,
        isSignedIn: true,
      };
    }

    case UserConstants.SIGN_OUT:
      return initialState;

    default: {
      return state;
    }
  }
}
