import "./header.css";

import { Link } from "react-router-dom";
import values from "./headerValues";

export default function header(): JSX.Element {
  return (
    <header>
      <nav className="navbar">
        <h1 className="title">Worst games ever</h1>
        <ul className="navbar-menu">
          <li className="navbar-item selected">
            <Link to={values.home}>Home</Link>
          </li>
          <li className="navbar-item">
            <Link to={values.products}>Products</Link>
          </li>
          <li className="navbar-item">
            <Link to={values.about}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
