import "./products.scss";

import ProductsControlMenu from "@/components/productsControlMenu/productsControlMenu";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/apiProducts";
import { CategoryName, Product } from "@/types";
import { useParams } from "react-router";
import categoriesValues from "@/constants/categoriesValues";
import productValues from "@/constants/productValues";
import Search from "../search/search";
import ProductsMenu from "../productsMenu/productsMenu";

export default function Products(): JSX.Element {
  const [products, setProducts] = useState([] as Product[]);

  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryValue = categoriesValues.get(categoryId.toUpperCase() as CategoryName);

  const [sortBy, setSortBy] = useState<keyof Product>(productValues.sortCriterias[0]);
  const [sortType, setSortType] = useState<string>(productValues.sortTypes[0]);

  useEffect(() => {
    if (categoryValue)
      getProducts(categoryValue.id, undefined, undefined, sortBy, sortType).then((ps) => setProducts(ps));
  }, [categoryId, sortBy, sortType]);

  return (
    <div className="products">
      <div className="products-left-area">
        <ProductsControlMenu title={categoryValue?.label ?? ""} {...{ sortBy, setSortBy, sortType, setSortType }} />
      </div>
      <div className="products-center-area">
        <Search />
        <ProductsMenu products={products} />
      </div>
    </div>
  );
}
