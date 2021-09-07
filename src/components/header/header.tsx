import "./header.scss";
import { NavLink } from "react-router-dom";
import relativeLinks from "../../constants/headerValues";

export default function header(): JSX.Element {
  const navbalItems = [
    { label: "Home", link: relativeLinks.HOME },
    { label: "Products", link: relativeLinks.PRODUCTS },
    { label: "About", link: relativeLinks.ABOUT },
    { label: "Sign In", link: relativeLinks.SIGNIN },
    { label: "Sign Up", link: relativeLinks.SIGNUP },
  ];

  return (
    <header>
      <nav className="navbar">
        <h1 className="title">Worst games ever</h1>
        <ul className="navbar-menu">
          {navbalItems.map((item) => (
            <li>
              <NavLink exact to={item.link} key={item.label} className="navbar-item" activeClassName="selected">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
