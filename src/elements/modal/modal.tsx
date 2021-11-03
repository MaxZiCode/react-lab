import { FC } from "react";
import ReactDOM from "react-dom";

export interface ModalProps {
  isActive: boolean;
}

const Modal: FC<ModalProps> = ({ isActive, children }) =>
  ReactDOM.createPortal(isActive ? children : null, document.getElementById("app") as Element);

export default function withModal(element: JSX.Element, isActive: boolean): JSX.Element {
  return <Modal isActive={isActive}>{element}</Modal>;
}
