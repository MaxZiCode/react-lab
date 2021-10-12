import ReactDOM from "react-dom";

export interface ModalProps {
  active: boolean;
}

const Modal: React.FC<ModalProps> = ({ active, children }) =>
  ReactDOM.createPortal(active ? children : null, document.getElementById("app") as Element);

export default Modal;
