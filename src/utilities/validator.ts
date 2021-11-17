type setProblem = (problem: string) => void;

function validate(condition: boolean, setProblem: setProblem, problem: string) {
  if (condition) {
    setProblem("");
    return true;
  }

  setProblem(problem);
  return false;
}

export function validateUsername(username: string, setProblem: setProblem): boolean {
  // Pattern source: https://ihateregex.io/expr/email/
  const userPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  const match = username.match(userPattern);

  return validate(match !== null && match.length > 0, setProblem, "Invalid email.");
}

export function validatePassword(password: string, setProblem: setProblem): boolean {
  // Pattern source: https://ihateregex.io/expr/password/
  const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const match = password.match(passwordPattern);

  const problem =
    "Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character.";
  return validate(match !== null && match.length > 0, setProblem, problem);
}

export function validatePasswordRepeat(password: string, repeatPassword: string, setProblem: setProblem): boolean {
  const isEqual = password === repeatPassword;
  return validate(isEqual, setProblem, "Password and repeat password must be equal.");
}
