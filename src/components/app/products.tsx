import categoriesValues, { CategoryName } from "@/constants/categoriesValues";
import { useParams } from "react-router";

export default function Products(): JSX.Element {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryValue = categoryId ? categoriesValues.get(categoryId.toUpperCase() as CategoryName) : undefined;

  const categoryMessage = categoryValue ? `for ${categoryValue.label}` : "";
  return (
    <div>
      <h2>{`Products ${categoryMessage}`}</h2>
    </div>
  );
}
