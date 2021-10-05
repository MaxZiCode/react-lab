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

interface AppState {
  isSignedIn: boolean;
  userName: string;
}

class App extends Component<RouteComponentProps, AppState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { isSignedIn: false, userName: "User Name" };
    this.goToPage.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  goToPage(path: string): void {
    this.props.history.push(path);
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const message = `Error: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}\nInfo: ${info.componentStack}`;
    console.error(message);
    alert(message);
    this.goToPage("/");
  }

  render(): JSX.Element {
    return (
      <>
        <Header
          isSignedIn={this.state.isSignedIn}
          userName={this.state.userName}
          signInCallback={(userName) => {
            this.setState({ isSignedIn: true, userName });
            this.goToPage(relativeLinks.USER);
          }}
          signOutCallback={() => {
            this.setState({ isSignedIn: false });
            this.goToPage(relativeLinks.HOME);
          }}
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
            <AuthRoute
              isSignedIn={this.state.isSignedIn}
              path={relativeLinks.USER}
              defaultPage={relativeLinks.HOME}
              onSignedIn={() => this.setState({ isSignedIn: true })}
            >
              <Profile name={this.state.userName} />
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
