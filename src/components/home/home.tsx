import "./home.scss";

import { useEffect, useState } from "react";
import { getTop, Product } from "@/api/apiProducts";
import categoriesValues from "@/constants/categoriesValues";

import HomeMenu from "../homeMenu/homeMenu";
import Search from "../search/search";
import Category from "../category/category";
import GameCard from "../gameCard/gameCard";

export default function Home(): JSX.Element {
  const [categoryInfos] = useState([...categoriesValues.values()]);

  const [products, setProducts] = useState([] as Product[]);
  const [isProductsRequested, setIsProductsRequested] = useState(false);
  useEffect(() => {
    if (products.length === 0 && !isProductsRequested) {
      getTop().then((ps) => setProducts(ps));
      setIsProductsRequested(true);
    }
  });

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
