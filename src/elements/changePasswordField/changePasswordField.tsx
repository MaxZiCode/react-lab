import { VFC } from "react";
import FormInput from "../formInput/formInput";

export interface ChangePasswordFieldProps {
  password: string;
  onChangePassword: (password: string) => void;
  passwordProblem: string;

  passwordRepeat: string;
  onChangePasswordRepeat: (value: string) => void;
  passwordRepeatProblem: string;
}

const ChangePasswordField: VFC<ChangePasswordFieldProps> = ({
  password,
  onChangePassword,
  passwordProblem,

  passwordRepeat,
  onChangePasswordRepeat,
  passwordRepeatProblem,
}) => (
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
      onChange={onChangePasswordRepeat}
      validationProblem={passwordRepeatProblem}
      value={passwordRepeat}
    />
  </>
);

export default ChangePasswordField;
