import { FC } from "react";
import "./bigMenu.scss";

export interface BigMenuProps {
  title: string;
}

const BigMenu: FC<BigMenuProps> = ({ title, children }) => (
  <div className="big-menu">
    <h2 className="big-menu-title">{title}</h2>
    {children}
  </div>
);
export default BigMenu;
