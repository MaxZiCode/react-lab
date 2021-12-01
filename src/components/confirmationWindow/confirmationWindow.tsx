import { VFC } from "react";
import Window from "@/elements/window/window";
import withModal from "@/elements/modal/modal";
import "./confirmationWindow.scss";

export interface ConfirmationWindowProps {
  isActive: boolean;
  title: string;
  message: string;
  actionText: string;
  action: () => void;
  cancelText: string;
  cancel: () => void;
}

const ConfirmationWindow: VFC<ConfirmationWindowProps> = ({
  isActive,
  title,
  message,
  cancel,
  cancelText,
  action,
  actionText,
}) =>
  withModal(
    <Window>
      <div className="confirmation-window">
        <header className="modal-title">{title}</header>
        <div className="message">{message}</div>
        <div className="buttons">
          <button type="button" className="menu-button" onClick={action}>
            {actionText}
          </button>
          <button type="button" className="menu-button" onClick={cancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </Window>,
    isActive
  );

export default ConfirmationWindow;
