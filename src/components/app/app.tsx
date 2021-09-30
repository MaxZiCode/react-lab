import "./app.scss";
import { Component, ErrorInfo } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import relativeLinks from "../../constants/headerValues";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "../home/home";
import Products from "./products";
import About from "./about";
import SignModal from "../signModal/signModal";

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
            <Route path={`${relativeLinks.PRODUCTS}/:categoryId`}>
              <Products />
            </Route>
            <Route path={relativeLinks.ABOUT}>
              <About />
            </Route>
            <Redirect to={relativeLinks.HOME} />
          </Switch>
        </main>
        <Footer />
        <SignModal title="Authorization" />
      </>
    );
  }
}

export default withRouter(App);
