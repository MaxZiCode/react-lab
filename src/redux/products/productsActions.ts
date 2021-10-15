import { Product } from "@/types";
import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { ProductsConstants } from "../constants";

// eslint-disable-next-line import/prefer-default-export
export function setTopProducts(products: Product[]): AnyAction {
  return action(ProductsConstants.SET_TOP_PRODUCTS, products);
}
