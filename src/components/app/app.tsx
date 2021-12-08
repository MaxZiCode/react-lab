import "./app.scss";
import { Component, ErrorInfo, lazy, Suspense } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import AuthRoute from "@/elements/authRoute/authRoute";
import { Product } from "@/types";
import relativeLinks from "../../constants/urls";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "../home/home";
import SignInWindow from "../signInWindow/signInWindow";
import SignUpModal from "../signUpWindow/signUpWindow";

const Profile = lazy(() => import("../profile/profile"));
const About = lazy(() => import("./about"));
const Products = lazy(() => import("../products/products"));
const Cart = lazy(() => import("../cart/cart"));

interface AppState {
  topProducts: Product[];
  redirectRouteAfterSignIn?: string;
}

const initialState: AppState = {
  topProducts: [],
};

class App extends Component<RouteComponentProps, AppState> {
  _authRouteProps;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = initialState;

    this.setRedirectRoute = this.setRedirectRoute.bind(this);
    this.setTopProducts = this.setTopProducts.bind(this);
    this.clearRedirectRoute = this.clearRedirectRoute.bind(this);

    this._authRouteProps = {
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

  clearRedirectRoute() {
    this.setState({ redirectRouteAfterSignIn: undefined });
  }

  render(): JSX.Element {
    return (
      <>
        <SignInWindow
          redirectRoute={this.state.redirectRouteAfterSignIn}
          clearRedirectRoute={this.clearRedirectRoute}
        />
        <SignUpModal />
        <Header />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
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
          </Suspense>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
