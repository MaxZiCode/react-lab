import ReactDOM from "react-dom";

const Modal: React.FC<{ active: boolean }> = ({ active, children }) =>
  ReactDOM.createPortal(active ? children : null, document.getElementById("app") as Element);

export default Modal;
