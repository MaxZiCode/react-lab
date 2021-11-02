import { FC } from "react";
import "@/styles/menu.scss";
import "./cardMenu.scss";

const CardMenu: FC<{ title: string }> = ({ children, title }) => (
  <div className="big-menu">
    <h2 className="big-menu-title">{title}</h2>
    <div className="card-container">{children}</div>
  </div>
);

export default CardMenu;
