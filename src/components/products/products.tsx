import "./products.scss";

import ProductsControlMenu from "@/components/productsControlMenu/productsControlMenu";
import { useState } from "react";
import { getProducts } from "@/api/apiProducts";
import { Product } from "@/types";
import { useParams } from "react-router";
import pv from "@/constants/productValues";
import useAdmin from "@/hooks/useAdmin";
import useLoadingPromise from "@/hooks/useLoadingPromise";
import useCategoryParam from "@/hooks/useCategoryParam";
import CardEditWindow from "@/elements/cardEditWindow/cardEditWindow";
import Search from "../search/search";
import ProductsMenu from "../productsMenu/productsMenu";

export default function Products(): JSX.Element {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryValue = useCategoryParam();
  const isAdmin = useAdmin();

  const [isCardEditWindowShowing, setIsCardEditWindowShowing] = useState(false);
  const [sortBy, setSortBy] = useState<keyof Product>(pv.sortCriterias[0]);
  const [sortType, setSortType] = useState<string>(pv.sortTypes[0]);
  const [filterGenres, setFilterGenres] = useState<string>("all");
  const [filterAge, setFilterAge] = useState<string>("all");
  const [products, isLoading] = useLoadingPromise(() => {
    const genre = filterGenres === "all" ? undefined : filterGenres;
    const age = filterAge === "all" ? undefined : filterAge;

    return getProducts(categoryValue?.id, genre, age, sortBy, sortType);
  }, [categoryId, sortBy, sortType, filterGenres, filterAge]);

  return (
    <div className="products">
      <CardEditWindow isActive={isCardEditWindowShowing} close={() => setIsCardEditWindowShowing(false)} />
      <div className="products-left-area">
        <ProductsControlMenu
          title={categoryValue?.label ?? ""}
          {...{ sortBy, setSortBy, sortType, setSortType, filterAge, setFilterAge, filterGenres, setFilterGenres }}
        />
      </div>
      <div className="products-center-area">
        <div className="products-center-top-area">
          <Search />
          {isAdmin && (
            <button type="button" className="menu-button" onClick={() => setIsCardEditWindowShowing(true)}>
              Create card
            </button>
          )}
        </div>
        <ProductsMenu products={products ?? []} isLoading={isLoading} />
      </div>
    </div>
  );
}
