import "./products.scss";

// import categoriesValues, { CategoryName } from "@/constants/categoriesValues";
import ProductsControlMenu from "@/components/productsControlMenu/productsControlMenu";
// import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTop, Product } from "@/api/apiProducts";
import Search from "../search/search";
import ProductsMenu from "../productsMenu/productsMenu";

export default function Products(): JSX.Element {
  // const { categoryId } = useParams<{ categoryId: string }>();
  // const categoryValue = categoryId ? categoriesValues.get(categoryId.toUpperCase() as CategoryName) : undefined;

  const [products, setProducts] = useState([] as Product[]);
  const [isProductsRequested, setIsProductsRequested] = useState(false);
  useEffect(() => {
    if (products.length === 0 && !isProductsRequested) {
      getTop().then((ps) => setProducts(ps));
      setIsProductsRequested(true);
    }
  });

  return (
    <div className="products">
      <div className="products-left-area">
        <ProductsControlMenu />
      </div>
      <div className="products-center-area">
        <Search />
        <ProductsMenu products={products} />
      </div>
    </div>
  );
}
