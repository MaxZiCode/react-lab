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
import SignInModal from "../signInModal/signInModal";
import SignUpModal from "../signUpModal/signUpModal";

interface AppState {
  username: string;
  shouldShowSignIn: boolean;
  shouldShowSignUp: boolean;
  signInRedirectPath?: string;
}

class App extends Component<RouteComponentProps, AppState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { username: "", shouldShowSignIn: false, shouldShowSignUp: false };
    this.redirect.bind(this);
    this.isSignedIn.bind(this);
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

  isSignedIn(): boolean {
    return this.state.username !== "";
  }

  render(): JSX.Element {
    const showSignInCallback = () => this.setState({ shouldShowSignIn: true });
    const authRouteCommonProps = {
      isSignedIn: this.isSignedIn(),
      defaultPath: relativeLinks.HOME,
      showSignInCallback,
      setSignInRedirectPath: (path: string) => this.setState({ signInRedirectPath: path }),
    };

    return (
      <>
        <SignInModal
          active={this.state.shouldShowSignIn}
          onClose={() => this.setState({ shouldShowSignIn: false, signInRedirectPath: undefined })}
          onSignedIn={(username) => {
            this.setState({ username });
            if (this.state.signInRedirectPath) this.redirect(this.state.signInRedirectPath);
          }}
        />
        <SignUpModal
          active={this.state.shouldShowSignUp}
          onClose={() => this.setState({ shouldShowSignUp: false })}
          onSignedUp={(username) => {
            this.setState({ username });
            this.redirect(relativeLinks.USER);
          }}
        />
        <Header
          userName={this.state.username}
          signInCallback={showSignInCallback}
          signUpCallback={() => this.setState({ shouldShowSignUp: true })}
          signOutCallback={() => {
            this.setState({ username: "" });
            this.redirect(relativeLinks.HOME);
          }}
        />
        <main>
          <Switch>
            <Route exact path={relativeLinks.HOME}>
              <Home />
            </Route>
            <AuthRoute route={<Products />} path={`${relativeLinks.PRODUCTS}/:categoryId`} {...authRouteCommonProps} />
            <AuthRoute route={<About />} path={relativeLinks.ABOUT} {...authRouteCommonProps} />
            <AuthRoute
              route={<Profile name={this.state.username} />}
              path={relativeLinks.USER}
              {...authRouteCommonProps}
            />
            <Redirect to={relativeLinks.HOME} />
          </Switch>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
