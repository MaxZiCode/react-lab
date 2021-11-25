import { Product } from "@/types";
import { AnyAction } from "redux";
import { ProductsContstants } from "../constants";

const initialState: Product[] = [];

export default function productsReducer(state = initialState, action: AnyAction): Product[] {
  switch (action.type) {
    case ProductsContstants.SET_PRODUCTS: {
      return action.payload.products;
    }

    case ProductsContstants.ADD_PRODUCT: {
      const newState = [...state];
      newState.unshift(action.payload.product);
      return newState;
    }

    case ProductsContstants.CHANGE_PRODUCT: {
      const changedProduct: Product = action.payload.product;
      const newState = [...state];
      const index = newState.findIndex((p) => p.id === changedProduct.id);
      newState[index] = changedProduct;
      return newState;
    }

    case ProductsContstants.DELETE_PRODUCT: {
      const newState = [...state];
      const index = newState.findIndex((p) => p.id === action.payload.productId);
      newState.splice(index, 1);
      return newState;
    }

    default: {
      return state;
    }
  }
}
