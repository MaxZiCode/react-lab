import "./home.scss";

import { useEffect, useState, VFC } from "react";
import categoriesValues from "@/constants/categoriesValues";

import { getTop } from "@/api/apiProducts";
import CardMenu from "@/elements/cardMenu/cardMenu";
import { Product } from "@/types";
import Search from "../search/search";
import Category from "../../elements/category/category";
import GameCard from "../../elements/gameCard/gameCard";

export interface HomeProps {
  topProducts: Product[];
  setTopProducts: (ps: Product[]) => void;
}

const Home: VFC<HomeProps> = ({ topProducts, setTopProducts }) => {
  const [categoryInfos] = useState([...categoriesValues.values()]);
  const [hasProductsRequested, setHasProductsRequested] = useState(false);

  useEffect(() => {
    if (!hasProductsRequested && topProducts.length === 0) {
      getTop().then((ps) => setTopProducts(ps));
      setHasProductsRequested(true);
    }
  });

  return (
    <div className="home">
      <Search />
      <CardMenu title="Categories">
        {categoryInfos.map((c) => (
          <Category key={c.id} {...c} />
        ))}
      </CardMenu>
      <CardMenu title="New games">
        {topProducts.map((p) => (
          <GameCard key={p.id} {...p} />
        ))}
      </CardMenu>
      <br />
    </div>
  );
};

export default Home;
