import { ValidationState } from "@/types";

const succeedState: Readonly<ValidationState> = {
  isSucceed: true,
  errorMessage: "",
};

const generateErrorState = (error: string) => ({
  isSucceed: false,
  errorMessage: error,
});

export function validateUsername(username: string): ValidationState {
  // Pattern source: https://ihateregex.io/expr/email/
  const userPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  if (username.match(userPattern)) return succeedState;

  return generateErrorState("Invalid email.");
}

export function validatePassword(password: string): ValidationState {
  // Pattern source: https://ihateregex.io/expr/password/
  const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (password.match(passwordPattern)) return succeedState;

  return generateErrorState(
    "Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character."
  );
}

export function validatePasswordRepeat(password: string, repeatPassword: string): ValidationState {
  if (password === repeatPassword) return succeedState;

  return generateErrorState("Password and repeat password must be equal.");
}
