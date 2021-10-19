import urls from "@/constants/urls";
import { Profile } from "@/types";

export async function getProfile(userId: number | string): Promise<Profile> {
  // TODO: add route to routes.json.
  const responce = await fetch(`${urls.ROOT}/users/${userId}`);
  const json = await responce.text();
  return JSON.parse(json);
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
