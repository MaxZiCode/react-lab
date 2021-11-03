import "@/styles/menu.scss";
import "./cart.scss";

import { VFC } from "react";

const Cart: VFC = () => (
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
          <tr>
            <td>Counter Strike: Global Offensive</td>
            <td>
              <select name="select-platform" id="cart-select-platform1" defaultValue="pc">
                <option value="pc">PC</option>
              </select>
            </td>
            <td>05/21/2021</td>
            <td>
              <input type="number" name="amount" id="cart-amount1" defaultValue={1} />
            </td>
            <td>10.00</td>
            <td>
              <input type="checkbox" name="remove" id="cart-remove1" />
            </td>
          </tr>
          <tr>
            <td>Minecraft</td>
            <td>
              <select name="select-platform" id="cart-select-platform2" defaultValue="pc">
                <option value="pc">PC</option>
              </select>
            </td>
            <td>05/21/2021</td>
            <td>
              <input type="number" name="amount" id="cart-amount2" defaultValue={1} />
            </td>
            <td>25.99</td>
            <td>
              <input type="checkbox" name="remove" id="cart-remove2" />
            </td>
          </tr>
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
        <span>Games cost: 35.99$</span>
        <span>Your balance: 32.98$</span>
        <button type="button" className="menu-button">
          Buy
        </button>
      </div>
    </div>
  </div>
);

export default Cart;
