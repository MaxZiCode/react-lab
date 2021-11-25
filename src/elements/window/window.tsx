import { FC } from "react";
import "./window.scss";

const Window: FC = ({ children }) => (
  <div className="modal">
    <div className="modal-window">{children}</div>
  </div>
);

export default Window;
