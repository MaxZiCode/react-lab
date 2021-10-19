import urls from "@/constants/urls";
import { Profile } from "@/types";

export function getProfile(userId: number | string): Promise<Response> {
  // TODO: add route to routes.json.
  return fetch(`${urls.ROOT}/users/${userId}`);
}

export function saveProfile(userId: number | string, user: Profile): Promise<Response> {
  return fetch(`${urls.ROOT}/users/${userId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(user),
  });
}

export function changePassword(userId: number | string, password: string): Promise<Response> {
  return fetch(`${urls.ROOT}/users/${userId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ password }),
  });
}
