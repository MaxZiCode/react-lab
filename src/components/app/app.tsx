import "./app.scss";
import { Component, ErrorInfo } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { HOME, PRODUCTS, ABOUT, SIGNIN, SIGNUP } from "../../constants/headerValues";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "./home";
import Products from "./products";
import About from "./about";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default class App extends Component {
  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.log(message);
    alert(message);
    window.location.replace(HOME);
  }

  render(): JSX.Element {
    return (
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path={HOME}>
              <Home />
            </Route>
            <Route path={PRODUCTS}>
              <Products />
            </Route>
            <Route path={ABOUT}>
              <About />
            </Route>
            <Route path={SIGNIN}>
              <SignIn />
            </Route>
            <Route path={SIGNUP}>
              <SignUp />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    );
  }
}
