import { VFC } from "react";
import Window from "@/elements/window/window";
import withModal from "@/elements/modal/modal";
import "./buyWindow.scss";

export interface BuyWindowProps {
  isActive: boolean;
  cancel: () => void;
  buy: () => void;
  cost: number;
}

// eslint-disable-next-line arrow-body-style
const BuyWindow: VFC<BuyWindowProps> = ({ isActive, cost, cancel, buy }) => {
  return withModal(
    <Window>
      <div className="modal-title buy-title">Buying confirmation</div>
      <div className="buy-message">
        {`You buy this wrong games for ${cost}$.`}
        <br />
        Are you sure?
      </div>
      <div className="buy-buttons">
        <button type="button" className="menu-button" onClick={cancel}>
          Cancel
        </button>
        <button type="button" className="menu-button" onClick={buy}>
          Buy
        </button>
      </div>
    </Window>,
    isActive
  );
};

export default BuyWindow;
