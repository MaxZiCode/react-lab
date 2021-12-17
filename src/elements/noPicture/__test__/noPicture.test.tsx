/* eslint-disable import/no-extraneous-dependencies */
import renderer from "react-test-renderer";
import NoPicture from "../noPicture";

it("renders correctly", () => {
  const tree = renderer.create(<NoPicture />).toJSON();
  expect(tree).toMatchSnapshot();
});
