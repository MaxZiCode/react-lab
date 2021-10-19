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

export interface SignUpWindowProps {
  close: () => void;
}

function SignUpWindow({ close }: SignUpWindowProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [usernameProblem, setUsernameProblem] = useState<string>();

  const [password, setPassword] = useState("");
  const [passwordProblem, setPasswordProblem] = useState<string>();

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordProblem, setRepeatPasswordProblem] = useState<string>();

  const validate = () => {
    // Pattern source: https://ihateregex.io/expr/email/
    const userPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const userNameMessage = username.match(userPattern) ? undefined : "Invalid email.";
    setUsernameProblem(userNameMessage);

    // Pattern source: https://ihateregex.io/expr/password/
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const passwordMessage = password.match(passwordPattern)
      ? undefined
      : "Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character.";
    setPasswordProblem(passwordMessage);

    const repeatPasswordMessage =
      password === repeatPassword ? undefined : "Password and repeat password must be equal.";
    setRepeatPasswordProblem(repeatPasswordMessage);

    return !(userNameMessage || passwordMessage || repeatPasswordMessage);
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
