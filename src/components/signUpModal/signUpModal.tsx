import SignModal from "@/elements/signModal/signModal";
import { useState } from "react";

export interface SignUpModalProps {
  active?: boolean;
  onClose: () => void;
}

export default function SignUpModal(props: SignUpModalProps): JSX.Element {
  const [username, setUserName] = useState("");
  const [usernameProblem, setUsernameProblem] = useState<string>();

  const [password, setPassword] = useState("");
  const [passwordProblem, setPasswordProblem] = useState<string>();

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordProblem, setRepeatPasswordProblem] = useState<string>();

  const validate = () => {
    // Pattern source: https://ihateregex.io/expr/username/
    const userPattern = /^[a-zA-Z0-9_-]{3,15}$/;
    const userNameMessage = username.match(userPattern)
      ? undefined
      : "Login must be an alphanumeric string that may include _ and - having a length of 3 to 16 characters.";
    setUsernameProblem(userNameMessage);

    // Pattern source: https://ihateregex.io/expr/password/
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const passwordMessage = password.match(passwordPattern)
      ? undefined
      : "Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character.";
    setPasswordProblem(passwordMessage);

    const repeatPasswordMessage =
      password === repeatPassword ? undefined : "Password and repeat password must be equal.";
    setRepeatPasswordProblem(repeatPasswordMessage);

    return !(userNameMessage || passwordMessage || repeatPasswordMessage);
  };

  return (
    <SignModal
      active={props.active}
      title="Registration"
      onClose={props.onClose}
      validate={validate}
      inputs={[
        {
          id: "signup-username",
          name: "user-name",
          label: "Login",
          onChange: setUserName,
          validationProblem: usernameProblem,
        },
        {
          id: "signup-password",
          name: "password",
          label: "Password",
          isPassword: true,
          onChange: setPassword,
          validationProblem: passwordProblem,
        },
        {
          id: "signup-repeat-password",
          name: "repeat-password",
          label: "Repeat password",
          isPassword: true,
          onChange: setRepeatPassword,
          validationProblem: repeatPasswordProblem,
        },
      ]}
    />
  );
}
