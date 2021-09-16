import "./home.scss";

import categoriesValues from "@/constants/categoriesValues";
import { getTop } from "@/api/apiProducts";

import { Fragment, useState } from "react";
import HomeMenu from "../homeMenu/homeMenu";
import Search from "../search/search";
import category from "../category/category";
import gameCard from "../gameCard/gameCard";

export default function home(): JSX.Element {
  const categories = [categoriesValues.PC, categoriesValues.PS5, categoriesValues.XONE].map((c) => (
    <Fragment key={c.label}>{category(c)}</Fragment>
  ));
  const [newGames, setNewGames] = useState<JSX.Element[]>();
  if (!newGames)
    getTop(3).then((products) => setNewGames(products.map((p) => <Fragment key={p.id}>{gameCard(p)}</Fragment>)));

  return (
    <div className="home">
      <Search />
      <HomeMenu title="Categories">{categories}</HomeMenu>
      <HomeMenu title="New games">{newGames}</HomeMenu>
      <br />
    </div>
  );
}
