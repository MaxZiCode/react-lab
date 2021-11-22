import FormInput from "@/elements/formInput/formInput";
import FormWindow from "@/elements/formWindow/formWindow";
import { signIn } from "@/api/apiAuth";
import { useState } from "react";
import withModal from "@/elements/modal/modal";
import { useHistory } from "react-router";
import { parseToUserResponseInfo } from "@/utilities/responseParser";
import { signInUser } from "@/redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { closeSignInWindow } from "@/redux/authModal/authModalActions";
import { RootState } from "@/redux/store";

export interface SignInWindowProps {
  redirectRoute?: string;
  clearRedirectRoute: () => void;
}

function SignInWindowComp({ redirectRoute, clearRedirectRoute }: SignInWindowProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [loginProblem, setLoginProblem] = useState("");
  const [password, setPassword] = useState("");
  const [passwordProblem, setPasswordProblem] = useState("");

  const setProblem = (problem: string) => {
    setLoginProblem(problem);
    setPasswordProblem(problem);
  };

  const resetProblems = () => {
    setLoginProblem("");
    setPasswordProblem("");
  };

  const close = () => dispatch(closeSignInWindow());

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
    <FormWindow title="Authorization" onSubmit={onSubmit} close={close}>
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

export default function SignInWindow({ ...props }: SignInWindowProps): JSX.Element {
  const { isSignInWindowShowing } = useSelector((s: RootState) => s.authModal);

  return withModal(<SignInWindowComp {...props} />, isSignInWindowShowing);
}
