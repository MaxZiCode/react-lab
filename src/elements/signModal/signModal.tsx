import "./signModal.scss";

import closeIcon from "@/assets/vectors/close.svg";
// eslint-disable-next-line no-use-before-define
import React from "react";

export interface SignModalProps {
  active?: boolean;
  title: string;
  onClose: () => void;
  inputs: {
    id: string;
    name: string;
    label: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }[];
}

export default function SignModal(props: SignModalProps): JSX.Element {
  return (
    <div className={`modal${props.active ? "" : " disabled"}`}>
      <div className="modal-window">
        <form action="" method="get">
          <button className="modal-close-button" type="button" onClick={() => props.onClose()}>
            <img src={closeIcon} alt="close icon" />
          </button>
          <div className="modal-title">{props.title}</div>
          <div className="modal-fields">
            {props.inputs.map((i) => (
              <div className="modal-field" key={i.id}>
                <label className="modal-input-label" htmlFor={i.id}>
                  {i.label}
                </label>
                <input className="modal-input" type="text" name={i.name} id={i.id} onChange={i.onChange} />
              </div>
            ))}
          </div>
          <button className="modal-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
