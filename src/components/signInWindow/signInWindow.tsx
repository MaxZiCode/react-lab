import FormInput from "@/elements/formInput/formInput";
import FormWindow from "@/elements/formWindow/formWindow";
import { signIn } from "@/api/apiAuth";
import withModal from "@/elements/modal/modal";
import { useHistory } from "react-router";
import { parseToUserResponseInfo } from "@/utilities/responseParser";
import { signInUser } from "@/redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { closeSignInWindow } from "@/redux/authModal/authModalActions";
import { RootState } from "@/redux/store";
import useStateWithValidation from "@/hooks/useStateWithValidation";
import { validatePassword, validateUsername } from "@/utilities/validationHelper";
import validationMessages from "@/constants/validationMessages";

export interface SignInWindowProps {
  redirectRoute?: string;
  clearRedirectRoute: () => void;
}

function SignInWindowComp({ redirectRoute, clearRedirectRoute }: SignInWindowProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    value: username,
    setValue: setUsername,
    validationProblem: usernameProblem,
  } = useStateWithValidation("", validateUsername, validationMessages.username);

  const {
    value: password,
    setValue: setPassword,
    validationProblem: passwordProblem,
  } = useStateWithValidation("", validatePassword, validationMessages.password);

  const close = () => dispatch(closeSignInWindow());

  const onSubmit = async () => {
    if (usernameProblem || passwordProblem) return;
    await signIn(username, password).then(async (r) => {
      if (r.status === 200) {
        const user = await parseToUserResponseInfo(r);
        dispatch(signInUser(user.id, user.email, password));
        clearRedirectRoute();
        close();

        if (redirectRoute) history.push(redirectRoute);
      }
      //
      else if (r.status === 400) {
        alert("Invalid login or password.");
      }
      //
      else alert("Unknown error");
    });
  };

  const disabled = !(username && password);

  return (
    <FormWindow title="Authorization" onSubmit={onSubmit} close={close} disabled={disabled}>
      <FormInput
        id="signin-username"
        name="user-name"
        label="Login"
        type="text"
        value={username}
        onChange={setUsername}
        validationProblem={usernameProblem}
      />
      <FormInput
        id="signin-password"
        name="password"
        label="Password"
        type="password"
        value={password}
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
