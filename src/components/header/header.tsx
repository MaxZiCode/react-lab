import "./header.scss";

import { Link, NavLink } from "react-router-dom";
import { Wrapper, Menu, MenuItem, Button } from "react-aria-menubutton";

import categoriesValues from "@/constants/categoriesValues";
import relativeLinks from "@/constants/headerValues";

function getNavLink(label: string, link: string, exact = false) {
  return {
    label,
    content: (
      <NavLink exact={exact} to={link} className="navbar-item background-highlight-on-hover" activeClassName="selected">
        {label}
      </NavLink>
    ),
  };
}

const menuName = "Products";
const menu = {
  label: menuName,
  content: (
    <Wrapper className="navbar-dropdown-wrapper">
      <NavLink
        to={relativeLinks.PRODUCTS}
        className="navbar-item stretch background-highlight-on-hover"
        activeClassName="selected"
        onClick={(e) => e.preventDefault()}
      >
        <Button tag="div" className="navbar-dropdown-button">
          {menuName}
        </Button>
      </NavLink>
      <Menu>
        <ul className="navbar-dropdown-row">
          {[categoriesValues.PC, categoriesValues.PS5, categoriesValues.XONE].map((c) => (
            <MenuItem tag="li" key={c.label}>
              <Link to={c.link} className="navbar-item">
                {c.label}
              </Link>
            </MenuItem>
          ))}
        </ul>
      </Menu>
    </Wrapper>
  ),
};

export default function header(): JSX.Element {
  const navbalItems = [
    getNavLink("Home", relativeLinks.HOME, true),
    menu,
    getNavLink("About", relativeLinks.ABOUT),
    getNavLink("Sign Up", relativeLinks.SIGNUP),
    getNavLink("Sign In", relativeLinks.SIGNIN),
  ];

  return (
    <header>
      <nav className="navbar">
        <h1 className="title">{document.title}</h1>
        <ul className="navbar-menu">
          {navbalItems.map((item) => (
            <li key={item.label}>{item.content}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
