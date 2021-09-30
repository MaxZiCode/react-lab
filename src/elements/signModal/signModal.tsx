import "./signModal.scss";
import closeIcon from "@/assets/vectors/close.svg";

export interface SignModalProps extends React.DOMAttributes<HTMLElement> {
  title: string;
}

export default function SignModal(props: SignModalProps): JSX.Element {
  return (
    <div className="modal">
      <div className="modal-window">
        <form action="" method="get">
          <button className="modal-close-button" type="button">
            <img src={closeIcon} alt="close icon" />
          </button>
          <div className="modal-title">{props.title}</div>
          <div className="modal-fields">{props.children}</div>
          <button className="modal-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
