import FormInput from "@/elements/formInput/formInput";
import FormWindow from "@/elements/formWindow/formWindow";
import { signIn } from "@/api/apiAuth";
import { useState } from "react";
import Modal, { ModalProps } from "@/elements/modal/modal";
import { useHistory } from "react-router";
import { parseToUserResponseInfo } from "@/utilities/responseParser";
import { signInUser } from "@/redux/user/userActions";
import { useDispatch } from "react-redux";

export interface SignInWindowProps {
  close: () => void;
  redirectRoute?: string;
  clearRedirectRoute: () => void;
}

function SignInWindow({ close, redirectRoute, clearRedirectRoute }: SignInWindowProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

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
    signIn(login, password).then(async (r) => {
      if (r.status === 200) {
        resetProblems();

        const user = await parseToUserResponseInfo(r);
        dispatch(signInUser(user.id, user.email, password));
        clearRedirectRoute();
        close();

        if (redirectRoute) history.push(redirectRoute);
      }
      //
      else if (r.status === 400) {
        setProblem("Invalid login or password.");
      }
      //
      else alert("Unknown error");
    });

  return (
    <FormWindow title="Authorization" onClose={close} onSubmit={onSubmit}>
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
    </FormWindow>
  );
}

export default (props: SignInWindowProps & ModalProps): JSX.Element => (
  <Modal active={props.active}>
    <SignInWindow {...props} />
  </Modal>
);
