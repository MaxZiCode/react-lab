import "./signModal.scss";

import closeIcon from "@/assets/vectors/close.svg";
// eslint-disable-next-line no-use-before-define
import React from "react";

export interface SignModalProps {
  active?: boolean;
  title: string;
  onClose: () => void;
  validate?: () => boolean;
  inputs: {
    id: string;
    name: string;
    label: string;
    isPassword?: boolean;
    onChange?: (value: string) => void;
    validationProblem?: string;
  }[];
}

export default function SignModal(props: SignModalProps): JSX.Element {
  return (
    <div className={`modal${props.active ? "" : " disabled"}`}>
      <div className="modal-window">
        <form action="" method="post">
          <button className="modal-close-button" type="button" onClick={() => props.onClose()}>
            <img src={closeIcon} alt="close icon" />
          </button>
          <div className="modal-title">{props.title}</div>
          <div className="modal-fields">
            {props.inputs.map((i) => (
              <React.Fragment key={i.id}>
                <div className="modal-field">
                  <label className="modal-input-label" htmlFor={i.id}>
                    {i.label}
                  </label>
                  <input
                    className={i.validationProblem ? "modal-input-invalid" : "modal-input"}
                    type={i.isPassword ? "password" : "text"}
                    name={i.name}
                    id={i.id}
                    onChange={(e) => {
                      if (i.onChange) i.onChange(e.currentTarget.value);
                    }}
                  />
                </div>
                <div className="modal-field-validation-problem">
                  {i.validationProblem ? `*${i.validationProblem}` : ""}
                </div>
              </React.Fragment>
            ))}
          </div>
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
}
