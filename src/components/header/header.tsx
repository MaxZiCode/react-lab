import "./header.scss";
import userIcon from "@/assets/vectors/user.svg";
import cartIcon from "@/assets/vectors/shopping-cart.svg";
import logoutIcon from "@/assets/vectors/logout.svg";

import { Link, NavLink } from "react-router-dom";
import { Wrapper, Menu, MenuItem, Button } from "react-aria-menubutton";

import categoriesValues from "@/constants/categoriesValues";
import relativeLinks from "@/constants/urls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signOutUser } from "@/redux/user/userActions";
import { showSignIn, showSignUp } from "@/redux/modals/modalsActions";
import { useHistory } from "react-router";

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

export default function Header(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  const [navBarStyle, setNavBarStyle] = useState("navbar");

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
        <button type="button" className={linkClassName} onClick={() => dispatch(showSignIn())}>
          <ButtonContent label="Sign In" />
        </button>
      ),
    },
    {
      id: "sign up",
      node: (
        <button type="button" className={linkClassName} onClick={() => dispatch(showSignUp())}>
          <ButtonContent label="Sign Up" />
        </button>
      ),
    },
  ];

  const { username } = useSelector((s: RootState) => s.user);
  const onSignOut = () => {
    dispatch(signOutUser());
    history.push(relativeLinks.HOME);
  };

  const signedInItems = [
    ...commonItems,
    {
      id: "user",
      node: (
        <NavLink to={relativeLinks.USER} className={linkClassName} activeClassName={activeClassName}>
          <ButtonContent label={username} icon={{ imagePath: userIcon, alt: "user icon" }} />
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
        <button type="button" className={linkClassName} onClick={onSignOut}>
          <ButtonContent icon={{ imagePath: logoutIcon, alt: "logout icon" }} />
        </button>
      ),
    },
  ];

  const { isSignedIn } = useSelector((s: RootState) => s.user);
  const items = isSignedIn ? signedInItems : anonItems;

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
