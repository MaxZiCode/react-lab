import "./productsMenu.scss";

import GameCard from "@/elements/gameCard/gameCard";
import LoadingSpinner from "@/elements/loadingSpinner/loadingSpinner";
import "@/styles/cardContainer.scss";
import { Product } from "@/types";

import { useCallback, useEffect, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setProducts } from "@/redux/products/productsActions";

export interface ProductsMenuProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductsMenu: VFC<ProductsMenuProps> = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const storedProducts = useSelector((s: RootState) => s.products);
  const getGameCards = useCallback(() => storedProducts?.map((p) => <GameCard key={p.id} {...p} />), [storedProducts]);

  const content = isLoading ? (
    <div className="products-menu-loading-wrapper">
      <LoadingSpinner />
    </div>
  ) : (
    getGameCards()
  );

  useEffect(() => {
    dispatch(setProducts(products));
  }, [products]);

  return (
    <div className="big-menu home-menu">
      <h2 className="big-menu-title">Products</h2>
      <div className="card-container">{content}</div>
    </div>
  );
};

export default ProductsMenu;
