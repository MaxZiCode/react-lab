import headerValues from "./headerValues";

import windowsLogo from "../assets/vectors/Vector_windows.svg";
import psLogo from "../assets/vectors/Vector_playstation.svg";
import xboxLogo from "../assets/vectors/Vector_xbox.svg";

export interface CategoryInfo {
  id: number;
  label: string;
  link: string;
  logo: string;
}

export type CategoryName = "PC" | "PS5" | "XONE";

const products = headerValues.PRODUCTS;
const categoriesValues = new Map<CategoryName, CategoryInfo>();
categoriesValues
  .set("PC", {
    id: 1,
    label: "PC",
    link: `${products}/pc`,
    logo: windowsLogo,
  })
  .set("PS5", {
    id: 2,
    label: "Playstation 5",
    link: `${products}/ps5`,
    logo: psLogo,
  })
  .set("XONE", {
    id: 3,
    label: "XBox One",
    link: `${products}/xone`,
    logo: xboxLogo,
  });

export default categoriesValues;
