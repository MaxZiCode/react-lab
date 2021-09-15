import "./homeMenu.scss";

interface HomeMenuProps extends React.DOMAttributes<HTMLElement> {
  title: string;
}

export default function homeMenu(props: HomeMenuProps): JSX.Element {
  return (
    <div className="home-menu">
      <h2 className="home-menu-title">{props.title}</h2>
      <div className="home-menu-items">{props.children}</div>
    </div>
  );
}
