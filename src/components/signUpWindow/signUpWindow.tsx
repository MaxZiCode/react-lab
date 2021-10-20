import { signUp } from "@/api/apiAuth";
import { parseToUserResponseInfo } from "@/utilities/responseParser";
import urls from "@/constants/urls";
import FormInput from "@/elements/formInput/formInput";
import FormWindow from "@/elements/formWindow/formWindow";
import Modal, { ModalProps } from "@/elements/modal/modal";
import { signInUser } from "@/redux/user/userActions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { validatePassword, validatePasswordRepeat, validateUsername } from "@/utilities/validator";

export interface SignUpWindowProps {
  close: () => void;
}

function SignUpWindow({ close }: SignUpWindowProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [usernameProblem, setUsernameProblem] = useState("");

  const [password, setPassword] = useState("");
  const [passwordProblem, setPasswordProblem] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordProblem, setRepeatPasswordProblem] = useState("");

  const validate = () => {
    const usernameState = validateUsername(username);
    setUsernameProblem(usernameState.errorMessage);

    const passwordState = validatePassword(password);
    setPasswordProblem(passwordState.errorMessage);

    const passwordRepeatState = validatePasswordRepeat(password, repeatPassword);
    setRepeatPasswordProblem(passwordRepeatState.errorMessage);

    return [usernameState, passwordState, passwordRepeatState].every((s) => s.isSucceed);
  };

  const onSubmit = async () => {
    if (validate())
      await signUp(username, password).then(async (r) => {
        if (r.status === 201) {
          const userResponseInfo = await parseToUserResponseInfo(r);
          dispatch(signInUser(userResponseInfo.id, userResponseInfo.email));
          close();
          history.push(urls.USER);
        } else alert("Unknown error");
      });
  };

  return (
    <FormWindow title="Registration" onClose={close} onSubmit={onSubmit}>
      <FormInput
        id="signup-username"
        name="user-name"
        label="Login"
        type="text"
        onChange={setUserName}
        validationProblem={usernameProblem}
      />
      <FormInput
        id="signup-password"
        name="password"
        label="Password"
        type="password"
        onChange={setPassword}
        validationProblem={passwordProblem}
      />
      <FormInput
        id="signup-repeat-password"
        name="repeat-password"
        label="Repeat password"
        type="password"
        onChange={setRepeatPassword}
        validationProblem={repeatPasswordProblem}
      />
    </FormWindow>
  );
}

export default (props: SignUpWindowProps & ModalProps): JSX.Element => (
  <Modal active={props.active}>
    <SignUpWindow {...props} />
  </Modal>
);
