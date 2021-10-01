import "./signModal.scss";

import closeIcon from "@/assets/vectors/close.svg";
// eslint-disable-next-line no-use-before-define
import React from "react";

export interface SignModalProps {
  active?: boolean;
  title: string;
  onClose: () => void;
  validate?: () => boolean;
}

const SignModal: React.FC<SignModalProps> = (props) => (
  <div className={`modal${props.active ? "" : " disabled"}`}>
    <div className="modal-window">
      <form action="" method="post">
        <button className="modal-close-button" type="button" onClick={() => props.onClose()}>
          <img src={closeIcon} alt="close icon" />
        </button>
        <div className="modal-title">{props.title}</div>
        <div className="modal-fields">{props.children}</div>
        <button
          className="modal-submit-button"
          type="button"
          onClick={(e) => {
            if (props.validate && !props.validate()) e.preventDefault();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
);

export default SignModal;
