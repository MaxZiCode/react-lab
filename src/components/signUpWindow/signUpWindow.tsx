import { signUp } from "@/api/apiAuth";
import FormInput from "@/elements/formInput/formInput";
import FormWindow from "@/elements/formWindow/formWindow";
import { useState } from "react";

export interface SignUpWindowProps {
  active: boolean;
  onClose: () => void;
  onSignedUp: (username: string) => void;
}

export default function SignUpModal(props: SignUpWindowProps): JSX.Element {
  const [username, setUserName] = useState("");
  const [usernameProblem, setUsernameProblem] = useState<string>();

  const [password, setPassword] = useState("");
  const [passwordProblem, setPasswordProblem] = useState<string>();

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordProblem, setRepeatPasswordProblem] = useState<string>();

  const validate = () => {
    // Pattern source: https://ihateregex.io/expr/email/
    const userPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const userNameMessage = username.match(userPattern) ? undefined : "Invalid email.";
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

  const onSubmit = async () => {
    if (validate())
      await signUp(username, password).then((r) => {
        if (r.status === 201) {
          props.onSignedUp(username);
          props.onClose();
        } else alert("Unknown error");
      });
  };

  return (
    <FormWindow active={props.active} title="Registration" onClose={props.onClose} onSubmit={onSubmit}>
      <FormInput
        id="signup-username"
        name="user-name"
        label="Login"
        onChange={setUserName}
        validationProblem={usernameProblem}
      />
      <FormInput
        id="signup-password"
        name="password"
        label="Password"
        onChange={setPassword}
        validationProblem={passwordProblem}
        isPassword
      />
      <FormInput
        id="signup-repeat-password"
        name="repeat-password"
        label="Repeat password"
        onChange={setRepeatPassword}
        validationProblem={repeatPasswordProblem}
        isPassword
      />
    </FormWindow>
  );
}
