import { AnyAction } from "redux";
import { ProductsConstants } from "../constants";
import { ProductsState } from "../states";

const initialState: ProductsState = {
  topProducts: [],
};

export default function productsReducer(state: ProductsState = initialState, action: AnyAction): ProductsState {
  switch (action.type) {
    case ProductsConstants.SET_TOP_PRODUCTS:
      return {
        ...state,
        topProducts: action.payload,
      };

    default:
      return state;
  }
}
