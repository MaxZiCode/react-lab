import urls from "@/constants/urls";

function sign(name: string, password: string, path: string) {
  return fetch(`${urls.ROOT}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      email: name,
      password,
    }),
  });
}

export function signIn(name: string, password: string): Promise<Response> {
  return sign(name, password, "/api/auth/signin");
}

export function signUp(name: string, password: string): Promise<Response> {
  return sign(name, password, "/api/auth/signup");
}
