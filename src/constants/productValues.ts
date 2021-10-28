import { Product } from "@/types";

const productValues = {
  sortTypes: ["asc", "desc"],
  sortCriterias: ["name", "rating", "price"] as (keyof Product)[],
  filterGenres: ["all", "platform", "shooter", "simulation", "strategy"],
  filterAges: ["all", "3+", "6+", "10+", "13+", "16+", "18+"],
};

export default productValues;
