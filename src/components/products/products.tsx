import "./products.scss";

import ProductsControlMenu from "@/components/productsControlMenu/productsControlMenu";
import { useState } from "react";
import { getProducts } from "@/api/apiProducts";
import { CategoryName, Product } from "@/types";
import { useParams } from "react-router";
import categoriesValues from "@/constants/categoriesValues";
import pv from "@/constants/productValues";
import useLoadingPromise from "@/hooks/useLoadingPromise";
import Search from "../search/search";
import ProductsMenu from "../productsMenu/productsMenu";

export default function Products(): JSX.Element {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryValue = categoriesValues.get(categoryId.toUpperCase() as CategoryName);

  const [sortBy, setSortBy] = useState<keyof Product>(pv.sortCriterias[0]);
  const [sortType, setSortType] = useState<string>(pv.sortTypes[0]);
  const [filterGenres, setFilterGenres] = useState<string>(pv.filterGenres[0]);
  const [filterAge, setFilterAge] = useState<string>(pv.filterAge[0]);
  const [products, isLoading] = useLoadingPromise(() => {
    const genre = filterGenres === "all" ? undefined : filterGenres;
    const age = filterAge === "all" ? undefined : filterAge;

    return getProducts(categoryValue?.id, genre, age, sortBy, sortType);
  }, [categoryId, sortBy, sortType, filterGenres, filterAge]);

  return (
    <div className="products">
      <div className="products-left-area">
        <ProductsControlMenu
          title={categoryValue?.label ?? ""}
          {...{ sortBy, setSortBy, sortType, setSortType, filterAge, setFilterAge, filterGenres, setFilterGenres }}
        />
      </div>
      <div className="products-center-area">
        <Search />
        <ProductsMenu products={products ?? []} isLoading={isLoading} />
      </div>
    </div>
  );
}
