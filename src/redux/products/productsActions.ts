import { Product } from "@/types";
import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { ProductsContstants } from "../constants";

// eslint-disable-next-line import/prefer-default-export
export function setProducts(products: Product[]): AnyAction {
  return action(ProductsContstants.SET_PRODUCTS, { products });
}

export function addProduct(product: Product): AnyAction {
  return action(ProductsContstants.ADD_PRODUCT, { product });
}

export function changeProduct(product: Product): AnyAction {
  return action(ProductsContstants.CHANGE_PRODUCT, { product });
}

export function deleteProduct(productId: number): AnyAction {
  return action(ProductsContstants.DELETE_PRODUCT, { productId });
}
