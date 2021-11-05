import { AnyAction } from "redux";
import { UserConstants } from "../constants";
import { UserState } from "../states";

const initialState: UserState = {
  id: 0,
  username: "",
  password: "",
  balance: 0,
  isSignedIn: false,
};

export default function userReducer(state: UserState = initialState, action: AnyAction): UserState {
  switch (action.type) {
    case UserConstants.SIGN_IN: {
      return {
        ...state,
        ...action.payload,
        balance: 100,
        isSignedIn: true,
      };
    }

    case UserConstants.SIGN_OUT:
      return initialState;

    case UserConstants.CHANGE_EMAIL:
      return {
        ...state,
        ...action.payload,
      };

    default: {
      return state;
    }
  }
}
