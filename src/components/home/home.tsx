import "./home.scss";

import { useEffect, useState, VFC } from "react";
import categoriesValues from "@/constants/categoriesValues";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getTop } from "@/api/apiProducts";
import { setTopProducts } from "@/redux/products/productsActions";
import HomeMenu from "../../elements/homeMenu/homeMenu";
import Search from "../search/search";
import Category from "../../elements/category/category";
import GameCard from "../../elements/gameCard/gameCard";

const Home: VFC = () => {
  const dispatch = useDispatch();
  const { topProducts } = useSelector((s: RootState) => s.products);

  const [categoryInfos] = useState([...categoriesValues.values()]);
  const [hasProductsRequested, setHasProductsRequested] = useState(false);

  useEffect(() => {
    if (!hasProductsRequested && topProducts.length === 0) {
      getTop().then((ps) => dispatch(setTopProducts(ps)));
      setHasProductsRequested(true);
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
        {topProducts.map((p) => (
          <GameCard key={p.id} {...p} />
        ))}
      </HomeMenu>
      <br />
    </div>
  );
};

export default Home;
