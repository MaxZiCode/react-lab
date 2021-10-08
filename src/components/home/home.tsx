import "./home.scss";

import { useState } from "react";
import { Product } from "@/api/apiProducts";
import categoriesValues from "@/constants/categoriesValues";

import HomeMenu from "../../elements/homeMenu/homeMenu";
import Search from "../search/search";
import Category from "../../elements/category/category";
import GameCard from "../../elements/gameCard/gameCard";

export default function Home({ products }: { products: Product[] }): JSX.Element {
  const [categoryInfos] = useState([...categoriesValues.values()]);

  return (
    <div className="home">
      <Search />
      <HomeMenu title="Categories">
        {categoryInfos.map((c) => (
          <Category key={c.id} {...c} />
        ))}
      </HomeMenu>
      <HomeMenu title="New games">
        {products.map((p) => (
          <GameCard key={p.id} {...p} />
        ))}
      </HomeMenu>
      <br />
    </div>
  );
}
