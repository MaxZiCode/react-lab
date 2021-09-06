import "./header.scss";
import { Link } from "react-router-dom";
import { HOME, PRODUCTS, ABOUT, SIGNIN, SIGNUP } from "../../constants/headerValues";

export default function header(): JSX.Element {
  const navbalItems = [
    { label: "Home", link: HOME },
    { label: "Products", link: PRODUCTS },
    { label: "About", link: ABOUT },
    { label: "Sign In", link: SIGNIN },
    { label: "Sign Up", link: SIGNUP },
  ];

  return (
    <header>
      <nav className="navbar">
        <h1 className="title">Worst games ever</h1>
        <ul className="navbar-menu">
          {navbalItems.map((item) => (
            <Link to={item.link} key={item.label}>
              <li className="navbar-item">{item.label}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
