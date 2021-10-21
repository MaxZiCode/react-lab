import urls from "@/constants/urls";
import { Profile } from "@/types";

export function getProfile(userId: number | string): Promise<Response> {
  // TODO: add route to routes.json.
  return fetch(`${urls.ROOT}/users/${userId}`);
}

export function saveProfile(userId: number | string, password: string, user: Profile): Promise<Response> {
  const data = {
    ...user,
    password,
  };

  return fetch(`${urls.ROOT}/users/${userId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  });
}

export function changePassword(userId: number | string, email: string, newPassword: string): Promise<Response> {
  return fetch(`${urls.ROOT}/users/${userId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ email, password: newPassword }),
  });
}
