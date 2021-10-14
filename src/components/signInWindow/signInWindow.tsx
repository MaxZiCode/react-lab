import FormInput from "@/elements/formInput/formInput";
import FormWindow from "@/elements/formWindow/formWindow";
import { signIn } from "@/api/apiAuth";
import { useState } from "react";
import Modal, { ModalProps } from "@/elements/modal/modal";
import { useDispatch } from "react-redux";
import { signInUser } from "@/redux/user/userActions";

export interface SignInWindowProps {
  onClose: () => void;
}

function SignInWindow(props: SignInWindowProps): JSX.Element {
  const dispatch = useDispatch();

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

        dispatch(signInUser(login));

        props.onClose();
      } else if (r.status === 400) {
        setProblem("Invalid login or password.");
      } else alert("Unknown error");
    });

  return (
    <FormWindow title="Authorization" onClose={props.onClose} onSubmit={onSubmit}>
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
    </FormWindow>
  );
}

export default ({ active, ...props }: ModalProps & SignInWindowProps): JSX.Element => (
  <Modal active={active}>
    <SignInWindow {...props} />
  </Modal>
);
