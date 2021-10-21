import urls from "@/constants/urls";
import { Profile } from "@/types";

export function getProfile(userId: number | string): Promise<Response> {
  return fetch(`${urls.ROOT}/api/getProfile/${userId}`);
}

export function saveProfile(userId: number | string, password: string, user: Profile): Promise<Response> {
  return fetch(`${urls.ROOT}/api/saveProfile/${userId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      ...user,
      password,
    }),
  });
}

export function changePassword(userId: number | string, profile: Profile, newPassword: string): Promise<Response> {
  // It deletes all info if put a password without a profile.

  return fetch(`${urls.ROOT}/api/changePassword/${userId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ ...profile, password: newPassword }),
  });
}
