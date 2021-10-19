import FormInput from "@/elements/formInput/formInput";
import FormWindow from "@/elements/formWindow/formWindow";
import { signIn } from "@/api/apiAuth";
import { useState } from "react";
import Modal from "@/elements/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "@/redux/user/userActions";
import { RootState } from "@/redux/store";
import { closeSignIn } from "@/redux/modals/modalsActions";
import { useHistory } from "react-router";
import { clearRedirectSignIn } from "@/redux/routes/routesActions";
import { parseToUserResponseInfo } from "@/api/apiResponse";

function SignInWindow(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [loginProblem, setLoginProblem] = useState<string>();
  const [password, setPassword] = useState("");
  const [passwordProblem, setPasswordProblem] = useState<string>();

  const redirectRoute = useSelector((s: RootState) => s.routes.redirectSignIn);

  const setProblem = (problem: string) => {
    setLoginProblem("");
    setPasswordProblem(problem);
  };

  const resetProblems = () => {
    setLoginProblem(undefined);
    setPasswordProblem(undefined);
  };

  const close = () => dispatch(closeSignIn());

  const onSubmit = () =>
    signIn(login, password).then(async (r) => {
      if (r.status === 200) {
        resetProblems();

        const user = await parseToUserResponseInfo(r);
        dispatch(signInUser(user.id, user.email));
        dispatch(clearRedirectSignIn());
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

export default (): JSX.Element => (
  <Modal active={useSelector((s: RootState) => s.modals.isSignInShowing)}>
    <SignInWindow />
  </Modal>
);
