import { signUp } from "@/api/apiAuth";
import { parseToUserResponseInfo } from "@/utilities/responseParser";
import urls from "@/constants/urls";
import FormWindow from "@/elements/formWindow/formWindow";
import withModal from "@/elements/modal/modal";
import { signInUser } from "@/redux/user/userActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChangePasswordField from "@/elements/changePasswordField/changePasswordField";
import ChangeUsernameField from "@/elements/changeUsernameField/changeUsernameField";
import defaultValues from "@/constants/defaultValues";
import { closeSignUpWindow } from "@/redux/authModal/authModalActions";
import { RootState } from "@/redux/store";

function SignUpWindow(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [usernameValidationFn, setUsernameValidationFn] = useState(() => defaultValues.notImplementedValidationFn);

  const [password, setPassword] = useState("");
  const [passwordValidatonFn, setPasswordValidationFn] = useState(() => defaultValues.notImplementedValidationFn);

  const validate = () => usernameValidationFn() && passwordValidatonFn();
  const close = () => dispatch(closeSignUpWindow());

  const onSubmit = async () => {
    if (validate())
      await signUp(username, password).then(async (r) => {
        if (r.status === 201) {
          const userResponseInfo = await parseToUserResponseInfo(r);
          dispatch(signInUser(userResponseInfo.id, userResponseInfo.email, password));
          close();
          history.push(urls.USER);
        } else alert("Unknown error");
      });
  };

  return (
    <FormWindow title="Registration" onSubmit={onSubmit} close={close}>
      <ChangeUsernameField
        username={username}
        onChangeUsername={setUserName}
        setValidationFn={setUsernameValidationFn}
      />
      <ChangePasswordField
        password={password}
        onChangePassword={setPassword}
        setValidationFn={setPasswordValidationFn}
      />
    </FormWindow>
  );
}

export default (): JSX.Element =>
  withModal(
    <SignUpWindow />,
    useSelector((s: RootState) => s.authModal.isSignUpWindowShowing)
  );
