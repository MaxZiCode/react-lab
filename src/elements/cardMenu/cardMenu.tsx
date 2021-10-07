import { FC } from "react";
import BigMenu, { BigMenuProps } from "../bigMenu/bigMenu";
import "./cardMenu.scss";

const CardMenu: FC<BigMenuProps> = ({ children, ...props }) => (
  <BigMenu {...props}>
    <div className="card-container">{children}</div>
  </BigMenu>
);

export default CardMenu;
