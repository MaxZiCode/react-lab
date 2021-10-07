import FormInput from "@/elements/formInput/formInput";
import SignModal from "@/elements/signModal/signModal";
import { signIn } from "@/api/apiAuth";
import { useState } from "react";

export interface SignInModalProps {
  active: boolean;
  onClose: () => void;
  onSignedIn: (username: string) => void;
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
        props.onSignedIn(login);
        props.onClose();
      } else if (r.status === 400) {
        setProblem("Invalid login or password.");
      } else alert("Unknown error");
    });

  return (
    <SignModal active={props.active} title="Authorization" onClose={props.onClose} onSubmit={onSubmit}>
      <FormInput
        id="signin-username"
        name="user-name"
        label="Login"
        type="text"
        onChange={setLogin}
        validationProblem={loginProblem}
      />
      <FormInput
        id="signin-password"
        name="password"
        label="Password"
        type="password"
        onChange={setPassword}
        validationProblem={passwordProblem}
      />
    </SignModal>
  );
}
