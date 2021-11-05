import { CategoryName, Product } from "@/types";
import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { CartConstants } from "../constants";

export function AddProduct(product: Product, platform?: CategoryName, date?: Date): AnyAction {
  return action(CartConstants.ADD_PRODUCT, { product, platform, date });
}

export function RemoveProduct(id: number): AnyAction {
  return action(CartConstants.REMOVE_PRODUCT, { id });
}

export function ClearCart(): AnyAction {
  return action(CartConstants.CLEAR_CART);
}
