import "./header.css";
import { Link } from "react-router-dom";
import { HOME, PRODUCTS, ABOUT } from "../../constants/headerValues";

export default function header(): JSX.Element {
  return (
    <header>
      <nav className="navbar">
        <h1 className="title">Worst games ever</h1>
        <ul className="navbar-menu">
          <li className="navbar-item selected">
            <Link to={HOME}>Home</Link>
          </li>
          <li className="navbar-item">
            <Link to={PRODUCTS}>Products</Link>
          </li>
          <li className="navbar-item">
            <Link to={ABOUT}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
