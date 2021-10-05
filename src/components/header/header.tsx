import "./header.scss";
import userIcon from "@/assets/vectors/user.svg";
import cartIcon from "@/assets/vectors/shopping-cart.svg";
import logoutIcon from "@/assets/vectors/logout.svg";

import { Link, NavLink } from "react-router-dom";
import { Wrapper, Menu, MenuItem, Button } from "react-aria-menubutton";

import categoriesValues from "@/constants/categoriesValues";
import relativeLinks from "@/constants/urls";
import { useEffect, useState } from "react";
import SignInModal from "../signInModal/signInModal";
import SignUpModal from "../signUpModal/signUpModal";

const linkClassName = "navbar-item";
const activeClassName = "selected";

interface ButtonContentParams {
  icon?: {
    imagePath: string;
    alt: string;
  };
  label?: string;
}

function ButtonContent(params: ButtonContentParams) {
  return (
    <>
      {params.icon ? <img src={params.icon.imagePath} alt={params.icon.alt} className="navbar-item-icon" /> : undefined}
      {params.label}
    </>
  );
}

export interface HeaderProps {
  isSignedIn: boolean;
  userName: string;
  signInCallback: (userName: string) => void;
  signOutCallback: () => void;
}

export default function Header(props: HeaderProps): JSX.Element {
  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  const [navBarStyle, setNavBarStyle] = useState("navbar");
  const [shouldShowSignIn, setShouldShowSignIn] = useState(false);
  const [shouldShowSignUp, setShouldShowSignUp] = useState(false);

  useEffect(() => {
    const style = shouldShowMenu ? "navbar responsive" : "navbar";
    setNavBarStyle(style);
  }, [shouldShowMenu]);

  const commonItems = [
    {
      id: "home",
      node: (
        <NavLink exact to={relativeLinks.HOME} className={linkClassName} activeClassName={activeClassName}>
          <ButtonContent label="Home" />
        </NavLink>
      ),
    },
    {
      id: "products",
      node: (
        <Wrapper className="navbar-dropdown-wrapper">
          <NavLink
            to={relativeLinks.PRODUCTS}
            className="navbar-dropdown-navlink"
            activeClassName={activeClassName}
            onClick={(e) => e.preventDefault()}
            tabIndex={-1}
          >
            <Button tag="div" className={`${linkClassName} navbar-dropdown-button`}>
              Products
            </Button>
          </NavLink>
          <Menu>
            <ul className="navbar-dropdown-row">
              {[...categoriesValues.values()].map((c) => (
                <MenuItem tag="li" key={c.id}>
                  <Link to={c.link} className={`${linkClassName} navbar-dropdown-item`}>
                    {c.label}
                  </Link>
                </MenuItem>
              ))}
            </ul>
          </Menu>
        </Wrapper>
      ),
    },
    {
      id: "about",
      node: (
        <NavLink to={relativeLinks.ABOUT} className={linkClassName} activeClassName={activeClassName}>
          <ButtonContent label="About" />
        </NavLink>
      ),
    },
  ];

  const anonItems = [
    ...commonItems,
    {
      id: "sign in",
      node: (
        <button type="button" className={linkClassName} onClick={() => setShouldShowSignIn(true)}>
          <ButtonContent label="Sign In" />
          <SignInModal
            active={shouldShowSignIn}
            onClose={() => setShouldShowSignIn(false)}
            onSignedIn={props.signInCallback}
          />
        </button>
      ),
    },
    {
      id: "sign up",
      node: (
        <button type="button" className={linkClassName} onClick={() => setShouldShowSignUp(true)}>
          <ButtonContent label="Sign Up" />
          <SignUpModal
            active={shouldShowSignUp}
            onClose={() => setShouldShowSignUp(false)}
            onSignedUp={props.signInCallback}
          />
        </button>
      ),
    },
  ];

  const signedInItems = [
    ...commonItems,
    {
      id: "user",
      node: (
        <NavLink to={relativeLinks.USER} className={linkClassName} activeClassName={activeClassName}>
          <ButtonContent label={props.userName} icon={{ imagePath: userIcon, alt: "user icon" }} />
        </NavLink>
      ),
    },
    {
      id: "cart",
      node: (
        <NavLink to={relativeLinks.CART} className={linkClassName} activeClassName={activeClassName}>
          <ButtonContent label="0" icon={{ imagePath: cartIcon, alt: "cart icon" }} />
        </NavLink>
      ),
    },
    {
      id: "logout",
      node: (
        <button type="button" className={linkClassName} onClick={props.signOutCallback}>
          <ButtonContent icon={{ imagePath: logoutIcon, alt: "logout icon" }} />
        </button>
      ),
    },
  ];

  const items = props.isSignedIn ? signedInItems : anonItems;

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
          {items.map((item) => (
            <li key={item.id}>{item.node}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
