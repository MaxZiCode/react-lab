// eslint-disable-next-line no-use-before-define
import React from "react";
import "./homeMenu.scss";

interface HomeMenuProps extends React.DOMAttributes<HTMLDivElement> {
  title: string;
}

export default function HomeMenu(props: HomeMenuProps): JSX.Element {
  return (
    <div className="home-menu">
      <h2 className="home-menu-title">{props.title}</h2>
      <div className="home-menu-items">
        <div className="home-menu-items-container">{props.children}</div>
      </div>
    </div>
  );
}
