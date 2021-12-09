import { signUp } from "@/api/apiAuth";
import { parseToUserResponseInfo } from "@/utilities/responseParser";
import urls from "@/constants/urls";
import FormWindow from "@/elements/formWindow/formWindow";
import withModal from "@/elements/modal/modal";
import { signInUser } from "@/redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChangePasswordField from "@/elements/changePasswordField/changePasswordField";
import ChangeUsernameField from "@/elements/changeUsernameField/changeUsernameField";
import { closeSignUpWindow } from "@/redux/authModal/authModalActions";
import { RootState } from "@/redux/store";
import { validatePassword, validatePasswordRepeat, validateUsername } from "@/utilities/validationHelper";
import validationMessages from "@/constants/validationMessages";
import useStateWithValidation from "@/hooks/useStateWithValidation";

function SignUpWindow(): JSX.Element {
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

  const {
    value: passwordRepeat,
    setValue: setPasswordRepeat,
    validationProblem: passwordRepeatProblem,
  } = useStateWithValidation(
    "",
    (value: string) => validatePasswordRepeat(password, value),
    validationMessages.repeatPassword
  );

  const close = () => dispatch(closeSignUpWindow());

  const onSubmit = async () => {
    if (usernameProblem || passwordProblem || passwordRepeatProblem) return;

    await signUp(username, password).then(async (r) => {
      if (r.status === 201) {
        const userResponseInfo = await parseToUserResponseInfo(r);
        dispatch(signInUser(userResponseInfo.id, userResponseInfo.email, password));
        close();
        history.push(urls.USER);
      } else alert("Unknown error");
    });
  };

  const disabled = !(username && password && passwordRepeat);

  return (
    <FormWindow title="Registration" onSubmit={onSubmit} close={close} disabled={disabled}>
      <ChangeUsernameField username={username} onChangeUsername={setUsername} usernameProblem={usernameProblem} />
      <ChangePasswordField
        password={password}
        onChangePassword={setPassword}
        passwordProblem={passwordProblem}
        passwordRepeat={passwordRepeat}
        onChangePasswordRepeat={setPasswordRepeat}
        passwordRepeatProblem={passwordRepeatProblem}
      />
    </FormWindow>
  );
}

export default (): JSX.Element =>
  withModal(
    <SignUpWindow />,
    useSelector((s: RootState) => s.authModal.isSignUpWindowShowing)
  );
