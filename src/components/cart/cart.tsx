import "@/styles/menu.scss";
import "./cart.scss";

import { useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import categoriesValues from "@/constants/categoriesValues";
import { ChangeProductAmount, ChangeProductPlatform, ClearCart, RemoveProducts } from "@/redux/cart/cartActions";
import { ReduceBalance } from "@/redux/user/userActions";
import ConfirmationWindow from "../confirmationWindow/confirmationWindow";

const Cart: VFC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((s: RootState) => s.cart);
  const balance = useSelector((s: RootState) => s.user.balance);
  const [isconfirmationWindowShowing, setIsconfirmationWindowShowing] = useState(false);
  const [idsToRemove, setIdsToRemove] = useState(new Set<number>());

  const { items } = cart;
  const cost = items.reduce((prev, i) => prev + i.product.price * i.amount, 0);

  const cancelWindow = () => setIsconfirmationWindowShowing(false);
  const buy = () => {
    dispatch(ReduceBalance(cost));
    dispatch(ClearCart());
    setIsconfirmationWindowShowing(false);
  };

  return (
    <div className="cart">
      <ConfirmationWindow
        isActive={isconfirmationWindowShowing}
        message={`You buy this wrong games for ${cost}$. Are you sure?`}
        actionText="Buy"
        action={buy}
        cancelText="Cancel"
        cancel={cancelWindow}
        title="Buying confirmation"
      />
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
                        if (e.target.checked) ids.add(i.product.id);
                        else ids.delete(i.product.id);
                        return ids;
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
            disabled={cost === 0 || cost > balance}
            onClick={() => setIsconfirmationWindowShowing(true)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
