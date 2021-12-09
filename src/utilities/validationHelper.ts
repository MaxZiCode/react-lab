export function validateUsername(username: string): boolean {
  // Pattern source: https://ihateregex.io/expr/email/
  const userPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  const match = username.match(userPattern);
  return match !== null && match.length > 0;
}

export function validatePassword(password: string): boolean {
  // Pattern source: https://ihateregex.io/expr/password/
  const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const match = password.match(passwordPattern);
  return match !== null && match.length > 0;
}

export function validatePasswordRepeat(password: string, repeatPassword: string): boolean {
  return password === repeatPassword;
}
