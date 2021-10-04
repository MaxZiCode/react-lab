import FormInput from "@/elements/formInput/formInput";
import SignModal from "@/elements/signModal/signModal";
import { signIn } from "@/api/apiAuth";
import { useState } from "react";

export interface SignInModalProps {
  active?: boolean;
  onClose: () => void;
}

export default function SignInModal(props: SignInModalProps): JSX.Element {
  const [login, setLogin] = useState("");
  const [loginProblem, setLoginProblem] = useState<string>();
  const [password, setPassword] = useState("");
  const [passwordProblem, setPasswordProblem] = useState<string>();

  const setProblem = (problem: string) => {
    setLoginProblem("");
    setPasswordProblem(problem);
  };

  const resetProblems = () => {
    setLoginProblem(undefined);
    setPasswordProblem(undefined);
  };

  const onSubmit = () =>
    signIn(login, password).then((r) => {
      if (r.ok) {
        resetProblems();
        props.onClose();
      } else if (r.status === 400) {
        setProblem("Invalid login or password.");
      } else setProblem("Unknown error.");
    });

  return (
    <SignModal active={props.active} title="Authorization" onClose={props.onClose} onSubmit={onSubmit}>
      <FormInput
        id="signin-username"
        name="user-name"
        label="Login"
        onChange={setLogin}
        validationProblem={loginProblem}
      />
      <FormInput
        id="signin-password"
        name="password"
        label="Password"
        isPassword
        onChange={setPassword}
        validationProblem={passwordProblem}
      />
    </SignModal>
  );
}
