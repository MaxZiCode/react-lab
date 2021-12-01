import urls from "@/constants/urls";

// Admin
// login:    admin@gmail.com
// password: Xo|=@Q,B~1Cq#Hn5

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
