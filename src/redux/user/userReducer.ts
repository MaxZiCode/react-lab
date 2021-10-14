import { AnyAction } from "redux";
import { UserConstants } from "./userConstants";
import { UserState } from "../types";

const initialState: UserState = {
  isSignedIn: false,
};

export default function userReducer(state: UserState = initialState, action: AnyAction): UserState {
  switch (action.type) {
    case UserConstants.SIGN_IN: {
      return {
        ...state,
        isSignedIn: true,
        username: action.payload,
      };
    }

    case UserConstants.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        username: undefined,
      };

    default: {
      return state;
    }
  }
}
