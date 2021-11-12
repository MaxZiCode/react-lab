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
      console.log(initialState);
      const args = action.payload;
      const { id } = args.product;
      const items = [...state.items];
      if (!items.some((i) => i.product.id === id)) {
        const item: CartItem = {
          product: args.product,
          selectedPlatform: args.platform,
          orderDate: args.date ?? new Date(),
          amount: 1,
        };
        items.push(item);
      }
      return { ...state, items };
    }

    case CartConstants.REMOVE_PRODUCTS: {
      const idsToRemove: number[] = action.payload.ids;
      const items = state.items.filter((i) => !idsToRemove.some((id) => i.product.id === id));
      return {
        ...state,
        items,
      };
    }

    case CartConstants.CLEAR_CART:
      return initialState;

    case CartConstants.CHANGE_PRODUCT_PLATFORM: {
      const newState = { ...state };
      newState.items[action.payload.index].selectedPlatform = action.payload.platform;
      return newState;
    }

    case CartConstants.CHANGE_PRODUCT_AMOUNT: {
      const newState = { ...state };
      newState.items[action.payload.index].amount = action.payload.amount;
      return newState;
    }

    default: {
      return state;
    }
  }
}
