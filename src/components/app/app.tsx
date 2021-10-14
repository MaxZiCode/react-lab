import "./app.scss";
import { Component, ErrorInfo } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import AuthRoute from "@/elements/authRoute/authRoute";
import { getTop, Product } from "@/api/apiProducts";
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
  topProducts: Product[];
  shouldShowSignIn: boolean;
  shouldShowSignUp: boolean;
  signInRedirectPath?: string;
}

class App extends Component<RouteComponentProps, AppState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { shouldShowSignIn: false, shouldShowSignUp: false, topProducts: [] };
    this.redirect = this.redirect.bind(this);
    this.showSignInCallback = this.showSignInCallback.bind(this);
    this.showSignUpnCallback = this.showSignUpnCallback.bind(this);
    this.signOutCallback = this.signOutCallback.bind(this);
    this.onSignedIn = this.onSignedIn.bind(this);
    this.onSignedUp = this.onSignedUp.bind(this);
    this.setSignInRedirectPath = this.setSignInRedirectPath.bind(this);
    this.onCloseSignIn = this.onCloseSignIn.bind(this);
    this.onCloseSignUp = this.onCloseSignUp.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  redirect(path: string): void {
    this.props.history.push(path);
  }

  componentDidMount() {
    getTop().then((ps) => this.setState({ topProducts: ps }));
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.error(message);
    alert(message);
    this.redirect(relativeLinks.HOME);
  }

  showSignInCallback() {
    this.setState({ shouldShowSignIn: true });
  }

  showSignUpnCallback() {
    this.setState({ shouldShowSignUp: true });
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
    this.setState({ shouldShowSignIn: false, signInRedirectPath: undefined });
  }

  onCloseSignUp() {
    this.setState({ shouldShowSignUp: false });
  }

  render(): JSX.Element {
    const authRouteCommonProps = {
      defaultPath: relativeLinks.HOME,
      showSignInCallback: this.showSignInCallback,
      setSignInRedirectPath: this.setSignInRedirectPath,
    };

    return (
      <>
        <SignInWindow active={this.state.shouldShowSignIn} onClose={this.onCloseSignIn} />
        <SignUpModal active={this.state.shouldShowSignUp} onClose={this.onCloseSignUp} onSignedUp={this.onSignedUp} />
        <Header
          signInCallback={this.showSignInCallback}
          signUpCallback={this.showSignUpnCallback}
          signOutCallback={this.signOutCallback}
        />
        <main>
          <Switch>
            <Route exact path={relativeLinks.HOME}>
              <Home products={this.state.topProducts} />
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
