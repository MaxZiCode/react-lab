import "./productsMenu.scss";

import GameCard from "@/elements/gameCard/gameCard";
import LoadingSpinner from "@/elements/loadingSpinner/loadingSpinner";
import "@/styles/cardContainer.scss";
import { Product } from "@/types";

import { VFC } from "react";

export interface ProductsMenuProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductsMenu: VFC<ProductsMenuProps> = ({ products, isLoading }) => {
  const getGameCards = () => products?.map((p) => <GameCard key={p.id} {...p} />);

  const content = isLoading ? (
    <div className="products-menu-loading-wrapper">
      <LoadingSpinner />
    </div>
  ) : (
    getGameCards()
  );

  return (
    <div className="big-menu home-menu">
      <h2 className="big-menu-title">Products</h2>
      <div className="card-container">{content}</div>
    </div>
  );
};

export default ProductsMenu;
