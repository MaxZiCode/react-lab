import { Product } from "@/types";

const productValues = {
  sortTypes: ["asc", "desc"],
  sortCriterias: ["name", "rating", "price"] as (keyof Product)[],
};

export default productValues;
