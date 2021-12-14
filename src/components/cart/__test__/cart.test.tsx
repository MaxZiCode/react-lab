/* eslint-disable import/no-extraneous-dependencies */
import { ReactPortal } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { AddProduct } from "@/redux/cart/cartActions";
import ReactDOM from "react-dom";
import Cart from "../cart";

const renderElement = () => {
  ReactDOM.createPortal = (node): ReactPortal => node as ReactPortal;
  render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

beforeEach(renderElement);
afterEach(cleanup);

describe("empty cart", () => {
  it("remove button is disabled", () => {
    expect(screen.getByText(/remove/i)).toBeDisabled();
  });

  it("buy button is disabled", () => {
    expect(screen.getByText(/buy/i)).toBeDisabled();
  });

  it("game cost is 0$", () => {
    expect(screen.getByText(/games cost/i).textContent).toContain("0.00$");
  });
});

describe("cart with one product", () => {
  const price = 20;
  const name = "Product name";

  beforeEach(() => {
    store.dispatch(
      AddProduct({
        id: 0,
        name,
        price,
        rating: 0,
        imagePath: "",
        description: "",
        age: "",
        date: new Date(),
        platforms: ["PC"],
      })
    );
  });

  it("contains a product", () => {
    expect(screen.getByText(name)).not.toBeEmptyDOMElement();
  });

  it("remove button is enabled", () => {
    // ToBeDisabled not work because in DOM it is `disabled=""`.
    expect(screen.getByText(/remove/i).getAttribute("disabled")).toEqual("");
  });

  it("buy button is enabled", () => {
    expect(screen.getByText(/buy/i).getAttribute("disabled")).toEqual("");
  });

  it("game cost equal price value", () => {
    expect(screen.getByText(/games cost/i).textContent).toContain(`${price.toFixed(2).toString()}$`);
  });
});
