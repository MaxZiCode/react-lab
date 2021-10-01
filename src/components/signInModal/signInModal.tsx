import FormInput from "@/elements/formInput/formInput";
import SignModal from "@/elements/signModal/signModal";

export interface SignInModalProps {
  active?: boolean;
  onClose: () => void;
}

export default function SignInModal(props: SignInModalProps): JSX.Element {
  return (
    <SignModal active={props.active} title="Authorization" onClose={props.onClose}>
      <FormInput id="signin-username" name="user-name" label="Login" />
      <FormInput id="signin-password" name="password" label="Password" isPassword />
    </SignModal>
  );
}
