import { validatePassword, validatePasswordRepeat } from "@/utilities/validator";
import { useEffect, useState, VFC } from "react";
import FormInput from "../formInput/formInput";

export interface ChangePasswordFieldProps {
  password: string;
  onChangePassword: (password: string) => void;
  setValidationFn: (fn: () => () => boolean) => void;
}

const ChangePasswordField: VFC<ChangePasswordFieldProps> = ({ setValidationFn, password, onChangePassword }) => {
  const [passwordProblem, setPasswordProblem] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordProblem, setRepeatPasswordProblem] = useState("");

  function validate() {
    const isPasswordValid = validatePassword(password, setPasswordProblem);
    const isRepeatPasswordValid = validatePasswordRepeat(password, repeatPassword, setRepeatPasswordProblem);
    return isPasswordValid && isRepeatPasswordValid;
  }

  useEffect(() => setValidationFn(() => validate), [password, repeatPassword]);

  return (
    <>
      <FormInput
        id="password"
        name="password"
        label="Password"
        type="password"
        onChange={onChangePassword}
        validationProblem={passwordProblem}
        value={password}
      />
      <FormInput
        id="repeat-password"
        name="repeat-password"
        label="Repeat password"
        type="password"
        onChange={setRepeatPassword}
        validationProblem={repeatPasswordProblem}
        value={repeatPassword}
      />
    </>
  );
};

export default ChangePasswordField;
