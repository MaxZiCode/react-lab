import { changePassword } from "@/api/apiProfile";
import validationMessages from "@/constants/validationMessages";
import ChangePasswordField from "@/elements/changePasswordField/changePasswordField";
import FormWindow from "@/elements/formWindow/formWindow";
import withModal, { ModalProps } from "@/elements/modal/modal";
import useStateWithValidation from "@/hooks/useStateWithValidation";
import { RootState } from "@/redux/store";
import { Profile } from "@/types";
import { validatePassword, validatePasswordRepeat } from "@/utilities/validationHelper";
import { VFC } from "react";
import { useSelector } from "react-redux";

export interface ChangePasswordWindowProps {
  profile: Profile;
  close: () => void;
}

const ChangePasswordWindowFC: VFC<ChangePasswordWindowProps> = ({ close, profile }) => {
  const { id } = useSelector((s: RootState) => s.user);

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

  const onSubmit = async () => {
    if (passwordProblem || passwordRepeatProblem) return;
    await changePassword(id, profile, password);
    close();
  };

  const disabled = !(password && passwordRepeat);

  return (
    <FormWindow title="Change password" onSubmit={onSubmit} close={close} disabled={disabled}>
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
};

export default function ChangePasswordWindow({
  isActive,
  ...props
}: ChangePasswordWindowProps & ModalProps): JSX.Element {
  return withModal(<ChangePasswordWindowFC {...props} />, isActive);
}
