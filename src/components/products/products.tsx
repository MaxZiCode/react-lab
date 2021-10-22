import "./products.scss";

// import categoriesValues, { CategoryName } from "@/constants/categoriesValues";
import ProductsControlMenu from "@/components/productsControlMenu/productsControlMenu";
// import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/apiProducts";
import { CategoryName, Product } from "@/types";
import { useParams } from "react-router";
import categoriesValues from "@/constants/categoriesValues";
import Search from "../search/search";
import ProductsMenu from "../productsMenu/productsMenu";

export default function Products(): JSX.Element {
  const [products, setProducts] = useState([] as Product[]);

  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryValue = categoriesValues.get(categoryId.toUpperCase() as CategoryName);

  useEffect(() => {
    if (categoryValue) getProducts(categoryValue.id).then((ps) => setProducts(ps));
  }, [categoryId]);

  return (
    <div className="products">
      <div className="products-left-area">
        <ProductsControlMenu title={categoryValue?.label ?? ""} />
      </div>
      <div className="products-center-area">
        <Search />
        <ProductsMenu products={products} />
      </div>
    </div>
  );
}
