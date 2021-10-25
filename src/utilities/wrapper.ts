import { Profile } from "@/types";
import { parseBody } from "./responseParser";

// eslint-disable-next-line import/prefer-default-export
export function wrapProfilePromise(promise: Promise<Response>): { read: () => Profile } {
  type Status = "pending" | "success" | "error";
  let status: Status = "pending";
  let result: Profile;
  let error: string;
  const suspender = promise.then((r) => {
    if (r.ok) {
      parseBody<Profile>(r).then(
        (p) => {
          result = p;
          status = "success";
        },
        (e) => {
          error = e;
          status = "error";
        }
      );
    } else {
      r.text()
        .then(
          (t) => {
            error = t;
          },
          (e) => {
            error = e;
          }
        )
        .finally(() => {
          status = "error";
        });
    }
  });

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw error;
      }

      return result;
    },
  };
}
