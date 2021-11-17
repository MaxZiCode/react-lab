import "./app.scss";
import { Component, ErrorInfo } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import AuthRoute from "@/elements/authRoute/authRoute";
import CardEditWindow from "@/elements/cardEditWindow/cardEditWindow";
import Profile from "@/components/profile/profile";
import { Product } from "@/types";
import relativeLinks from "../../constants/urls";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "../home/home";
import About from "./about";
import SignInWindow from "../signInWindow/signInWindow";
import SignUpModal from "../signUpWindow/signUpWindow";
import Products from "../products/products";
import Cart from "../cart/cart";

interface AppState {
  isSignInShowing: boolean;
  isSignUpShowing: boolean;
  topProducts: Product[];
  redirectRouteAfterSignIn?: string;
}

const initialState: AppState = {
  isSignInShowing: false,
  isSignUpShowing: false,
  topProducts: [],
};

class App extends Component<RouteComponentProps, AppState> {
  _authRouteProps;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = initialState;

    this.setRedirectRoute = this.setRedirectRoute.bind(this);
    this.setTopProducts = this.setTopProducts.bind(this);
    this.showSignInWindow = this.showSignInWindow.bind(this);
    this.showSignUpWindow = this.showSignUpWindow.bind(this);
    this.closeSignInWindow = this.closeSignInWindow.bind(this);
    this.closeSignUpWindow = this.closeSignUpWindow.bind(this);
    this.clearRedirectRoute = this.clearRedirectRoute.bind(this);

    this._authRouteProps = {
      showSignIn: this.showSignInWindow,
      setRedirectSignIn: this.setRedirectRoute,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.error(message);
    alert(message);
    this.props.history.push(relativeLinks.HOME);
  }

  setRedirectRoute(path: string) {
    this.setState({ redirectRouteAfterSignIn: path });
  }

  setTopProducts(products: Product[]) {
    this.setState({ topProducts: products });
  }

  showSignInWindow() {
    this.setState({ isSignInShowing: true });
  }

  showSignUpWindow() {
    this.setState({ isSignUpShowing: true });
  }

  closeSignInWindow() {
    this.setState({ isSignInShowing: false });
  }

  closeSignUpWindow() {
    this.setState({ isSignUpShowing: false });
  }

  clearRedirectRoute() {
    this.setState({ redirectRouteAfterSignIn: undefined });
  }

  render(): JSX.Element {
    return (
      <>
        <SignInWindow
          isActive={this.state.isSignInShowing}
          close={this.closeSignInWindow}
          redirectRoute={this.state.redirectRouteAfterSignIn}
          clearRedirectRoute={this.clearRedirectRoute}
        />
        <SignUpModal isActive={this.state.isSignUpShowing} close={this.closeSignUpWindow} />
        <Header showSignIn={this.showSignInWindow} showSignUp={this.showSignUpWindow} />
        <main>
          <Switch>
            <Route path="/card">
              <CardEditWindow />
            </Route>
            <Route exact path={relativeLinks.HOME}>
              <Home topProducts={this.state.topProducts} setTopProducts={this.setTopProducts} />
            </Route>
            <AuthRoute path={`${relativeLinks.PRODUCTS}/:categoryId`} {...this._authRouteProps}>
              <Products />
            </AuthRoute>
            <AuthRoute path={relativeLinks.ABOUT} {...this._authRouteProps}>
              <About />
            </AuthRoute>
            <AuthRoute path={relativeLinks.USER} {...this._authRouteProps}>
              <Profile />
            </AuthRoute>
            <AuthRoute path={relativeLinks.CART} {...this._authRouteProps}>
              <Cart />
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
