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
  const categories = categoryInfos.map((c) => <Category key={c.id} {...c} />);

  const [products, setProducts] = useState([] as Product[]);
  const [isProductsRequested, setIsProductsRequested] = useState(false);
  useEffect(() => {
    if (products.length === 0 && !isProductsRequested) {
      getTop(3).then((ps) => setProducts(ps));
      setIsProductsRequested(true);
    }
  });
  const gameCards = products.map((p) => <GameCard key={p.id} {...p} />);

  return (
    <div className="home">
      <Search />
      <HomeMenu title="Categories">{categories}</HomeMenu>
      <HomeMenu title="New games">{gameCards}</HomeMenu>
      <br />
    </div>
  );
}
