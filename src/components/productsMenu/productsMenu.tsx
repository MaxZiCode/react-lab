import "@/styles/cardContainer.scss";

import { Product } from "@/types";
import GameCard from "@/elements/gameCard/gameCard";
import { VFC } from "react";

const ProductsMenu: VFC<{ products: Product[] }> = ({ products }) => (
  <div className="big-menu home-menu">
    <h2 className="big-menu-title">Products</h2>
    <div className="card-container">
      {products.map((p) => (
        <GameCard key={p.id} {...p} />
      ))}
    </div>
  </div>
);

export default ProductsMenu;
