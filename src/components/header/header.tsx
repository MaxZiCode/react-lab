import "./header.scss";
import { Link, NavLink } from "react-router-dom";
import { Wrapper, Menu, MenuItem, Button } from "react-aria-menubutton";
import relativeLinks from "../../constants/headerValues";

function getNavLink(label: string, link: string, exact = false) {
  return {
    label,
    content: (
      <NavLink exact={exact} to={link} className="navbar-item" activeClassName="selected">
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
        className="navbar-item stretch"
        activeClassName="selected"
        onClick={(e) => e.preventDefault()}
      >
        <Button tag="a" className="navbar-dropdown-button">
          {menuName}
        </Button>
      </NavLink>
      <Menu>
        <ul className="navbar-dropdown-row">
          <MenuItem tag="li" key="pc">
            <Link to={relativeLinks.PC} className="navbar-item">
              PC
            </Link>
          </MenuItem>
          <MenuItem tag="li" key="ps5">
            <Link to={relativeLinks.PS5} className="navbar-item">
              PlayStation 5
            </Link>
          </MenuItem>
          <MenuItem tag="li" key="xboxone">
            <Link to={relativeLinks.XONE} className="navbar-item">
              XBox One
            </Link>
          </MenuItem>
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
