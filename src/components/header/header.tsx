import "./header.scss";

import { Link, NavLink } from "react-router-dom";
import { Wrapper, Menu, MenuItem, Button } from "react-aria-menubutton";

import categoriesValues from "@/constants/categoriesValues";
import relativeLinks from "@/constants/headerValues";

function GetNavLink(label: string, link: string, exact = false) {
  return (
    <NavLink exact={exact} to={link} className="navbar-item panel-link-hover-focus" activeClassName="selected">
      {label}
    </NavLink>
  );
}

function getProductsElement() {
  return (
    <Wrapper className="navbar-dropdown-wrapper">
      <NavLink
        to={relativeLinks.PRODUCTS}
        className="navbar-item stretch panel-link-hover-focus"
        activeClassName="selected"
        onClick={(e) => e.preventDefault()}
      >
        <Button tag="div" className="navbar-dropdown-button" tabIndex={undefined}>
          Products
        </Button>
      </NavLink>
      <Menu>
        <ul className="navbar-dropdown-row">
          {[...categoriesValues.values()].map((c) => (
            <MenuItem tag="li" key={c.id}>
              <Link to={c.link} className="navbar-item">
                {c.label}
              </Link>
            </MenuItem>
          ))}
        </ul>
      </Menu>
    </Wrapper>
  );
}

const navbalItems = [
  {
    id: 1,
    node: GetNavLink("Home", relativeLinks.HOME, true),
  },
  {
    id: 2,
    node: getProductsElement(),
  },
  {
    id: 3,
    node: GetNavLink("About", relativeLinks.ABOUT),
  },
  {
    id: 4,
    node: GetNavLink("Sign In", relativeLinks.SIGNIN),
  },
  {
    id: 5,
    node: GetNavLink("Sign Up", relativeLinks.SIGNUP),
  },
];

export default function Header(): JSX.Element {
  return (
    <header>
      <nav className="navbar">
        <h1 className="title">{document.title}</h1>
        <ul className="navbar-menu">
          {navbalItems.map((item) => (
            <li key={item.id}>{item.node}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
