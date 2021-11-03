import "./styles/main.css";
import "./styles/main.scss";
import "./styles/menu.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/app/app";
import store from "./redux/store";

class AppContainer extends Component {
  render() {
    return (
      <StrictMode>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
