import "./app.scss";
import { Component, ErrorInfo } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import relativeLinks from "../../constants/headerValues";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "../home/home";
import Products from "./products";
import About from "./about";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default class App extends Component {
  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.log(message);
    alert(message);
    window.location.replace(relativeLinks.HOME);
  }

  render(): JSX.Element {
    return (
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path={relativeLinks.HOME}>
              <Home />
            </Route>
            <Route path={relativeLinks.PRODUCTS}>
              <Products />
            </Route>
            <Route path={relativeLinks.ABOUT}>
              <About />
            </Route>
            <Route path={relativeLinks.SIGNIN}>
              <SignIn />
            </Route>
            <Route path={relativeLinks.SIGNUP}>
              <SignUp />
            </Route>
            <Route>
              <Redirect to={relativeLinks.HOME} />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    );
  }
}
