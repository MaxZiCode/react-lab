import SignModal from "@/elements/signModal/signModal";

export interface SignUpModalProps {
  active?: boolean;
  onClose: () => void;
}

export default function SignUpModal(props: SignUpModalProps): JSX.Element {
  return (
    <SignModal
      active={props.active}
      title="Registration"
      onClose={props.onClose}
      inputs={[
        {
          id: "signup-username",
          name: "user-name",
          label: "Login",
        },
        {
          id: "signup-password",
          name: "password",
          label: "Password",
        },
        {
          id: "signup-repeat-password",
          name: "repeat-password",
          label: "Repeat password",
        },
      ]}
    />
  );
}
