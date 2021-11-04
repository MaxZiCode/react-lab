import { CartItem } from "@/types";
import { AnyAction } from "redux";
import { CartConstants } from "../constants";
import { CartState } from "../states";

const initialState: CartState = {
  items: [],
};

export default function cartReducer(state = initialState, action: AnyAction): CartState {
  switch (action.type) {
    case CartConstants.ADD_PRODUCT: {
      const args = action.payload;
      const { id } = args;
      if (!state.items.some((i) => i.productId === id)) {
        const item: CartItem = {
          productId: args.id,
          selectedPlatform: args.platform ?? "PC",
          orderDate: args.date ?? Date.now(),
          amount: 1,
        };
        state.items.push(item);
      }
      return {
        ...state,
      };
    }

    case CartConstants.REMOVE_PRODUCT: {
      const removeIndex = state.items.findIndex((item) => item.productId === action.payload.id);
      state.items.splice(removeIndex, 1);
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
}
