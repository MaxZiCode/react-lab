import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import values from "../header/headerValues";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "./home";
import Products from "./products";
import About from "./about";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default function app(): JSX.Element {
  return (
    <main>
      <Router>
        <Header />
        <Switch>
          <Route exact path={values.home}>
            <Home />
          </Route>
          <Route path={values.products}>
            <Products />
          </Route>
          <Route path={values.about}>
            <About />
          </Route>
          <Route path={values.signIn}>
            <SignIn />
          </Route>
          <Route path={values.signUp}>
            <SignUp />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </main>
  );
}
