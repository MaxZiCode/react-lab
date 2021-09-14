import "./home.scss";

import categoriesValues from "@/constants/categoriesValues";

import windowsLogo from "../../assets/vectors/Vector_windows.svg";
import psLogo from "../../assets/vectors/Vector_playstation.svg";
import xboxLogo from "../../assets/vectors/Vector_xbox.svg";

import HomeMenu from "../homeMenu/homeMenu";
import Search from "../search/search";
import category from "../category/category";

const categories = [
  {
    label: categoriesValues.PC.label,
    link: categoriesValues.PC.link,
    image: {
      path: windowsLogo,
      description: "pc logo",
    },
  },
  {
    label: categoriesValues.PS5.label,
    link: categoriesValues.PS5.link,
    image: {
      path: psLogo,
      description: "playstation 5 logo",
    },
  },
  {
    label: categoriesValues.XONE.label,
    link: categoriesValues.XONE.link,
    image: {
      path: xboxLogo,
      description: "xbox one logo",
    },
  },
];

export default function home(): JSX.Element {
  return (
    <div className="home">
      <br />
      <Search />
      <br />
      <HomeMenu title="Categories">{categories.map((c) => category(c))}</HomeMenu>
      <br />
      <HomeMenu title="New games" />
      <br />
    </div>
  );
}
