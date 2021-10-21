import { changePassword } from "@/api/apiProfile";
import defaultValues from "@/constants/defaultValues";
import ChangePasswordField from "@/elements/changePasswordField/changePasswordField";
import FormWindow from "@/elements/formWindow/formWindow";
import withModal, { ModalProps } from "@/elements/modal/modal";
import { RootState } from "@/redux/store";
import { Profile } from "@/types";
import { useState, VFC } from "react";
import { useSelector } from "react-redux";

export interface ChangePasswordWindowProps {
  profile: Profile;
  close: () => void;
}

const ChangePasswordWindowFC: VFC<ChangePasswordWindowProps> = ({ close, profile }) => {
  const { id } = useSelector((s: RootState) => s.user);

  const [password, setPassword] = useState("");
  const [passwordValidationFn, setPasswordValidationFn] = useState(defaultValues.notImplementedValidationFn);

  const validate = () => passwordValidationFn();

  const onSubmit = async () => {
    if (validate()) {
      await changePassword(id, profile, password);
      close();
    }
  };

  return (
    <FormWindow title="Change password" onSubmit={onSubmit} close={close}>
      <ChangePasswordField
        password={password}
        onChangePassword={setPassword}
        setValidationFn={setPasswordValidationFn}
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
