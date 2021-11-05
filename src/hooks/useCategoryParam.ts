import categoriesValues from "@/constants/categoriesValues";
import { CategoryInfo, CategoryName } from "@/types";
import { useParams } from "react-router";

export default function useCategoryParam(): CategoryInfo | undefined {
  const { categoryId } = useParams<{ categoryId: string }>();
  return categoriesValues.get(categoryId?.toUpperCase() as CategoryName);
}
