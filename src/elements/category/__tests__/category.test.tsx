import testLogo from "@/assets/vectors/user.svg";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Category from "../category";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Category label="test" link="/" logo={testLogo} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
