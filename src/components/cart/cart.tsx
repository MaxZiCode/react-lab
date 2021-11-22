import "@/styles/menu.scss";
import "./cart.scss";

import { useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import categoriesValues from "@/constants/categoriesValues";
import { ChangeProductAmount, ChangeProductPlatform, ClearCart, RemoveProducts } from "@/redux/cart/cartActions";
import { ReduceBalance } from "@/redux/user/userActions";
import BuyWindow from "../buyWindow/buyWindow";

const Cart: VFC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((s: RootState) => s.cart);
  const balance = useSelector((s: RootState) => s.user.balance);
  const [isBuyWindowShowing, setIsBuyWindowShowing] = useState(false);
  const [idsToRemove, setIdsToRemove] = useState([] as number[]);
  const cost = items.reduce((prev, i) => prev + i.product.price * i.amount, 0);

  const cancelWindow = () => setIsBuyWindowShowing(false);
  const buy = () => {
    dispatch(ReduceBalance(cost));
    dispatch(ClearCart());
    setIsBuyWindowShowing(false);
  };

  return (
    <div className="cart">
      <BuyWindow isActive={isBuyWindowShowing} cancel={cancelWindow} cost={cost} buy={buy} />
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
                    id={`cart-select-platform${index}`}
                    value={i.selectedPlatform ?? i.product.platforms[0]}
                    onChange={(e) => dispatch(ChangeProductPlatform(index, e.target.value))}
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
                    id={`cart-amount${index}`}
                    value={i.amount}
                    onChange={(e) => {
                      const value = e.target.valueAsNumber;
                      if (!value) return;

                      dispatch(ChangeProductAmount(index, value));
                    }}
                  />
                </td>
                <td>{i.product.price.toFixed(2)}</td>
                <td>
                  <input
                    type="checkbox"
                    name="remove"
                    id={`cart-remove${i.product.id}`}
                    onChange={(e) => {
                      setIdsToRemove((ids) => {
                        if (e.target.checked) return [...ids, i.product.id];
                        return ids.filter((id) => id !== i.product.id);
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} />
              <td>
                <button
                  type="button"
                  className="menu-button"
                  disabled={[...idsToRemove].length === 0}
                  onClick={() => {
                    dispatch(RemoveProducts([...idsToRemove]));
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="cart-summary">
          <span>{`Games cost: ${cost.toFixed(2)}$`}</span>
          <span>{`Your balance: ${balance.toFixed(2)}$`}</span>
          <button
            type="button"
            className="menu-button"
            disabled={items.length === 0}
            onClick={() => setIsBuyWindowShowing(true)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
