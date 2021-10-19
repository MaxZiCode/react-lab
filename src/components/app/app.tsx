import "./app.scss";
import { Component, ErrorInfo } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import AuthRoute from "@/elements/authRoute/authRoute";
import Profile from "@/components/profile/profile";
import relativeLinks from "../../constants/urls";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "../home/home";
import Products from "./products";
import About from "./about";
import SignInWindow from "../signInWindow/signInWindow";
import SignUpModal from "../signUpWindow/signUpWindow";

class App extends Component<RouteComponentProps> {
  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.error(message);
    alert(message);
    this.props.history.push(relativeLinks.HOME);
  }

  render(): JSX.Element {
    return (
      <>
        <SignInWindow />
        <SignUpModal />
        <Header />
        <main>
          <Switch>
            <Route exact path={relativeLinks.HOME}>
              <Home />
            </Route>
            <AuthRoute path={`${relativeLinks.PRODUCTS}/:categoryId`}>
              <Products />
            </AuthRoute>
            <AuthRoute path={relativeLinks.ABOUT}>
              <About />
            </AuthRoute>
            <AuthRoute path={relativeLinks.USER}>
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
