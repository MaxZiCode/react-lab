import "./app.scss";
import { Component, ErrorInfo } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import AuthRoute from "@/elements/authRoute/authRoute";
import relativeLinks from "../../constants/urls";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "../home/home";
import Products from "./products";
import About from "./about";
import Profile from "./profile";
import SignInWindow from "../signInWindow/signInWindow";
import SignUpModal from "../signUpWindow/signUpWindow";

interface AppState {
  signInRedirectPath?: string;
}

class App extends Component<RouteComponentProps, AppState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.signOutCallback = this.signOutCallback.bind(this);
    this.onSignedIn = this.onSignedIn.bind(this);
    this.onSignedUp = this.onSignedUp.bind(this);
    this.setSignInRedirectPath = this.setSignInRedirectPath.bind(this);
    this.onCloseSignIn = this.onCloseSignIn.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  redirect(path: string): void {
    this.props.history.push(path);
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.error(message);
    alert(message);
    this.redirect(relativeLinks.HOME);
  }

  signOutCallback() {
    this.redirect(relativeLinks.HOME);
  }

  onSignedIn() {
    if (this.state.signInRedirectPath) this.redirect(this.state.signInRedirectPath);
  }

  setSignInRedirectPath(path: string) {
    this.setState({ signInRedirectPath: path });
  }

  onSignedUp() {
    this.redirect(relativeLinks.USER);
  }

  onCloseSignIn() {
    this.setState({ signInRedirectPath: undefined });
  }

  render(): JSX.Element {
    const authRouteCommonProps = {
      defaultPath: relativeLinks.HOME,
      setSignInRedirectPath: this.setSignInRedirectPath,
    };

    return (
      <>
        <SignInWindow />
        <SignUpModal />
        <Header signOutCallback={this.signOutCallback} />
        <main>
          <Switch>
            <Route exact path={relativeLinks.HOME}>
              <Home />
            </Route>
            <AuthRoute path={`${relativeLinks.PRODUCTS}/:categoryId`} {...authRouteCommonProps}>
              <Products />
            </AuthRoute>
            <AuthRoute path={relativeLinks.ABOUT} {...authRouteCommonProps}>
              <About />
            </AuthRoute>
            <AuthRoute path={relativeLinks.USER} {...authRouteCommonProps}>
              <Profile />
            </AuthRoute>
            <Redirect to={relativeLinks.HOME} />
          </Switch>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
