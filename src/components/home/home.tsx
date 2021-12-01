import "./home.scss";
import "@/styles/cardContainer.scss";

import { useEffect, useMemo, VFC } from "react";
import categoriesValues from "@/constants/categoriesValues";

import { Product } from "@/types";
import { getTop } from "@/api/apiProducts";
import Search from "../search/search";
import Category from "../../elements/category/category";
import ProductsMenu from "../productsMenu/productsMenu";

export interface HomeProps {
  topProducts: Product[];
  setTopProducts: (ps: Product[]) => void;
}

const Home: VFC<HomeProps> = ({ topProducts, setTopProducts }) => {
  const categoryInfos = useMemo(() => [...categoriesValues.values()], []);

  useEffect(() => {
    if (topProducts.length === 0) {
      getTop().then((ps) => setTopProducts(ps));
    }
  }, []);

  return (
    <div className="home">
      <Search />
      <div className="big-menu home-menu">
        <h2 className="big-menu-title">Categories</h2>
        <div className="card-container">
          {categoryInfos.map((c) => (
            <Category key={c.id} {...c} />
          ))}
        </div>
      </div>
      <ProductsMenu products={topProducts} />
    </div>
  );
};

export default Home;
