import "@/styles/menu.scss";
import "./cart.scss";

import { useState, VFC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import categoriesValues from "@/constants/categoriesValues";

const Cart: VFC = () => {
  const items = useSelector((s: RootState) => s.cart.items);
  const balance = useSelector((s: RootState) => s.user.balance);

  const calculateAndSetCost = () => items.reduce((prev, i) => prev + i.product.price * i.amount, 0);
  const [cost, setCost] = useState(calculateAndSetCost);

  return (
    <div className="cart">
      <div className="big-menu cart-menu">
        <h2 className="big-menu-title">Cart page</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Platform</th>
              <th>Order date</th>
              <th>Amount</th>
              <th>Price($)</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr key={i.product.id}>
                <td>{i.product.name}</td>
                <td>
                  <select
                    name="select-platform"
                    id={`cart-select-platform${i.product.id}`}
                    defaultValue={i.selectedPlatform ?? i.product.platforms[0]}
                    onChange={(e) => {
                      items[index].selectedPlatform = e.currentTarget.value;
                    }}
                  >
                    {i.product.platforms.map((id) => (
                      <option key={id} value={id}>
                        {categoriesValues.get(id)?.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{i.orderDate.toLocaleDateString()}</td>
                <td>
                  <input
                    type="number"
                    name="amount"
                    min={1}
                    id={`cart-amount${i.product.id}`}
                    value={i.amount}
                    onChange={(e) => {
                      const value = e.currentTarget.valueAsNumber;
                      if (!value) return;
                      items[index].amount = value;
                      setCost(calculateAndSetCost);
                    }}
                  />
                </td>
                <td>{i.product.price.toFixed(2)}</td>
                <td>
                  <input type="checkbox" name="remove" id="cart-remove1" />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} />
              <td>
                <button type="button" className="menu-button">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="cart-summary">
          <span>{`Games cost: ${cost.toFixed(2)}$`}</span>
          <span>{`Your balance: ${balance.toFixed(2)}$`}</span>
          <button type="button" className="menu-button">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
