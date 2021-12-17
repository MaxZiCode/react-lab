/* eslint-disable import/no-extraneous-dependencies */
import { ReactPortal } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import GameCard from "../gameCard";

beforeAll(() => {
  ReactDOM.createPortal = (node): ReactPortal => node as ReactPortal;
});

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <GameCard
            id={0}
            name="name"
            price={0}
            rating={0}
            imagePath=""
            description="description"
            age="18+"
            date={new Date()}
            platforms={[]}
          />
        </Provider>
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
