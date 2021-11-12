import { CategoryName } from "@/types";
import { AnyAction } from "redux";
import { action } from "typesafe-actions";
import { CartConstants } from "../constants";

export function AddProduct(id: number, platform?: CategoryName, date?: number): AnyAction {
  return action(CartConstants.ADD_PRODUCT, { id, platform, date });
}

export function RemoveProduct(id: number): AnyAction {
  return action(CartConstants.REMOVE_PRODUCT, { id });
}
