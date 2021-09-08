import "./homeMenu.scss";
import { FC } from "react";

const HomeMenu: FC = () => (
  <div className="home-menu">
    <h2 className="menu-title">Home menu</h2>
    <div className="menu-collection">
      <div className="menu-item">Item 1</div>
      <div className="menu-item">Item 2</div>
      <div className="menu-item">Item 3</div>
    </div>
  </div>
);

export default HomeMenu;
