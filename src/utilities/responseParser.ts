import { UserResponseInfo } from "@/types";

// eslint-disable-next-line import/prefer-default-export
export async function parseBody<TBody, T = TBody>(
  response: Response,
  selector: (body: TBody) => T = (b) => b as unknown as T
): Promise<T> {
  const json = await response.text();
  return selector(JSON.parse(json));
}

export async function parseToUserResponseInfo(response: Response): Promise<UserResponseInfo> {
  const result = await parseBody<{ user: UserResponseInfo }, UserResponseInfo>(response, (body) => body.user);
  return result;
}
