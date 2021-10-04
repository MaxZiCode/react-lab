import "./signModal.scss";

import closeIcon from "@/assets/vectors/close.svg";
// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";

export interface SignModalProps {
  active?: boolean;
  title: string;
  onSubmit: () => Promise<void>;
  onClose: () => void;
}

const SignModal: React.FC<SignModalProps> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className={`modal${props.active ? "" : " disabled"}`}>
      <div className="modal-window">
        <form>
          <button className="modal-close-button" type="button" onClick={() => props.onClose()}>
            <img src={closeIcon} alt="close icon" />
          </button>
          <div className="modal-title">{props.title}</div>
          <div className="modal-fields">{props.children}</div>
          <button
            disabled={isSubmitting}
            className="modal-submit-button"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (isSubmitting) return;

              setIsSubmitting(true);
              props.onSubmit().then(() => setIsSubmitting(false));
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignModal;
