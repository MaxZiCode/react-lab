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

interface AppState {
  isSignedIn: boolean;
  userName: string;
}

class App extends Component<RouteComponentProps, AppState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { isSignedIn: false, userName: "User Name" };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.error(message);
    alert(message);
    this.props.history.push("/");
  }

  render(): JSX.Element {
    return (
      <>
        <Header
          isSignedIn={this.state.isSignedIn}
          userName={this.state.userName}
          signInCallback={() => this.setState({ isSignedIn: true })}
          signOutCallback={() => this.setState({ isSignedIn: false })}
        />
        <main>
          <Switch>
            <Route exact path={relativeLinks.HOME}>
              <Home />
            </Route>
            <AuthRoute
              isSignedIn={this.state.isSignedIn}
              path={`${relativeLinks.PRODUCTS}/:categoryId`}
              defaultPage={relativeLinks.HOME}
              onSignedIn={() => this.setState({ isSignedIn: true })}
            >
              <Products />
            </AuthRoute>
            <AuthRoute
              isSignedIn={this.state.isSignedIn}
              path={relativeLinks.ABOUT}
              defaultPage={relativeLinks.HOME}
              onSignedIn={() => this.setState({ isSignedIn: true })}
            >
              <About />
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
