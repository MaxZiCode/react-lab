import SignModal from "@/elements/signModal/signModal";

export interface SignInModalProps {
  active?: boolean;
  onClose: () => void;
}

export default function SignInModal(props: SignInModalProps): JSX.Element {
  return (
    <SignModal
      active={props.active}
      title="Authorization"
      onClose={props.onClose}
      inputs={[
        {
          id: "signin-username",
          name: "user-name",
          label: "Login",
        },
        {
          id: "signin-password",
          name: "password",
          label: "Password",
        },
      ]}
    />
  );
}
