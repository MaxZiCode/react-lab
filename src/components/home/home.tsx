import "./home.scss";
import "@/styles/cardContainer.scss";

import { useEffect, useState } from "react";
import { getTop, Product } from "@/api/apiProducts";
import categoriesValues from "@/constants/categoriesValues";

import Search from "../search/search";
import Category from "../../elements/category/category";
import ProductsMenu from "../productsMenu/productsMenu";

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
      <div className="big-menu home-menu">
        <h2 className="big-menu-title">Categories</h2>
        <div className="card-container">
          {categoryInfos.map((c) => (
            <Category key={c.id} {...c} />
          ))}
        </div>
      </div>
      <ProductsMenu products={products} />
    </div>
  );
}
