import headerValues from "./headerValues";

import windowsLogo from "../assets/vectors/Vector_windows.svg";
import psLogo from "../assets/vectors/Vector_playstation.svg";
import xboxLogo from "../assets/vectors/Vector_xbox.svg";

interface CategoryInfo {
  id: number;
  label: string;
  link: string;
  logo: string;
}

const products = headerValues.PRODUCTS;
const categoriesValues: { [key: string]: CategoryInfo } = {
  PC: {
    id: 1,
    label: "PC",
    link: `${products}/pc`,
    logo: windowsLogo,
  },
  PS5: {
    id: 2,
    label: "Playstation 5",
    link: `${products}/ps5`,
    logo: psLogo,
  },
  XONE: {
    id: 3,
    label: "XBox One",
    link: `${products}/xone`,
    logo: xboxLogo,
  },
};

export default categoriesValues;
