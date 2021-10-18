import { AnyAction } from "redux";
import { RoutesConstants } from "../constants";
import { RoutesState } from "../states";

const initialState: RoutesState = {};

export default function routesReducer(state: RoutesState = initialState, action: AnyAction): RoutesState {
  switch (action.type) {
    case RoutesConstants.SET_REDIRECT_SIGN_IN:
      return {
        ...state,
        redirectSignIn: action.payload,
      };

    case RoutesConstants.CLEAR_REDIRECT_SIGN_IN:
      return { ...state, redirectSignIn: undefined };

    default:
      return state;
  }
}
