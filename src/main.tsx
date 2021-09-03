import "./styles/main.css";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  render() {
    return (
      <StrictMode>
        <Router>
          <Header />
          <Body />
          <Footer />
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
