/* eslint-disable import/no-extraneous-dependencies */
import { ReactPortal } from "react";
import { render, screen } from "@testing-library/react/pure";
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

beforeAll(renderElement);

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

  beforeAll(() => {
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
    expect(screen.getByText(/remove/i)).toHaveAttribute("disabled", "");
  });

  it("buy button is enabled", () => {
    expect(screen.getByText(/buy/i)).toHaveAttribute("disabled", "");
  });

  it("game cost equal price value", () => {
    expect(screen.getByText(/games cost/i).textContent).toContain(`${price.toFixed(2).toString()}$`);
  });
});
