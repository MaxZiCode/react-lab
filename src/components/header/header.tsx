import "./header.scss";

import { Link, NavLink } from "react-router-dom";
import { Wrapper, Menu, MenuItem, Button } from "react-aria-menubutton";

import categoriesValues from "@/constants/categoriesValues";
import relativeLinks from "@/constants/headerValues";
import { useEffect, useState } from "react";

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
        className="navbar-dropdown-navlink"
        activeClassName="selected"
        onClick={(e) => e.preventDefault()}
        tabIndex={-1}
      >
        <Button tag="div" className="navbar-dropdown-button navbar-item panel-link-hover-focus">
          Products
        </Button>
      </NavLink>
      <Menu>
        <ul className="navbar-dropdown-row">
          {[...categoriesValues.values()].map((c) => (
            <MenuItem tag="li" key={c.id}>
              <Link to={c.link} className="navbar-item navbar-dropdown-item panel-link-hover-focus">
                {c.label}
              </Link>
            </MenuItem>
          ))}
        </ul>
      </Menu>
    </Wrapper>
  );
}

const navbarItems = [
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
  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  const [navBarStyle, setNavBarStyle] = useState("navbar");
  useEffect(() => {
    const style = shouldShowMenu ? "navbar responsive" : "navbar";
    setNavBarStyle(style);
  }, [shouldShowMenu]);

  return (
    <header>
      <nav className={navBarStyle}>
        <h1 className="navbar-title">{document.title}</h1>
        <button
          type="button"
          className="navbar-icon panel-link-hover-focus"
          onClick={() => setShouldShowMenu(!shouldShowMenu)}
        >
          <div />
          <div />
          <div />
        </button>
        <ul className="navbar-menu">
          {navbarItems.map((item) => (
            <li key={item.id}>{item.node}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
