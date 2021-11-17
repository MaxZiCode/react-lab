import { AnyAction } from "redux";
import { ProfileConstants } from "../constants";
import { ProfileState } from "../states";

const initialState: ProfileState = {
  state: { email: "" },
};

export default function profileReducer(state: ProfileState = initialState, action: AnyAction): ProfileState {
  switch (action.type) {
    case ProfileConstants.SET_PROFILE: {
      return { ...state, state: action.payload.profile };
    }

    case ProfileConstants.CLEAR_PROFILE:
      return initialState;

    default: {
      return state;
    }
  }
}
