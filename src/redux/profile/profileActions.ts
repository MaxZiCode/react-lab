import { Profile } from "@/types";
import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { ProfileConstants } from "../constants";

// eslint-disable-next-line import/prefer-default-export
export function setProfile(profile: Profile): AnyAction {
  return action(ProfileConstants.SET_PROFILE, { profile });
}

export function clearProfile(): AnyAction {
  return action(ProfileConstants.CLEAR_PROFILE);
}
