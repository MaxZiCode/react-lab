import "./formWindow.scss";

import closeIcon from "@/assets/vectors/close.svg";
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react";

export interface FormWindowProps {
  title: string;
  onSubmit: () => Promise<void>;
  onClose: () => void;
}

const FormWindow: React.FC<FormWindowProps> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => () => setIsMounted(false), []);

  return (
    <div className="modal">
      <div className="modal-window">
        <form>
          <button className="modal-close-button" type="button" onClick={() => props.onClose()}>
            <img src={closeIcon} alt="close icon" />
          </button>
          <div className="modal-title">{props.title}</div>
          <div className="modal-fields">{props.children}</div>
          <button
            disabled={isSubmitting}
            className="modal-submit-button menu-button"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (isSubmitting) return;

              setIsSubmitting(true);
              props.onSubmit().finally(() => {
                if (isMounted) setIsSubmitting(false);
              });
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormWindow;
