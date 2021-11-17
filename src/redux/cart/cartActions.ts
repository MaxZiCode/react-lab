import { CategoryName, Product } from "@/types";
import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { CartConstants } from "../constants";

export function AddProduct(product: Product, platform?: CategoryName, date?: Date): AnyAction {
  return action(CartConstants.ADD_PRODUCT, { product, platform, date });
}

export function RemoveProducts(ids: number[]): AnyAction {
  return action(CartConstants.REMOVE_PRODUCTS, { ids });
}

export function ClearCart(): AnyAction {
  return action(CartConstants.CLEAR_CART);
}

export function ChangeProductPlatform(index: number, platform: CategoryName): AnyAction {
  return action(CartConstants.CHANGE_PRODUCT_PLATFORM, { index, platform });
}

export function ChangeProductAmount(index: number, amount: number): AnyAction {
  return action(CartConstants.CHANGE_PRODUCT_AMOUNT, { index, amount });
}
