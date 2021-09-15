import headerValues from "./headerValues";

import windowsLogo from "../assets/vectors/Vector_windows.svg";
import psLogo from "../assets/vectors/Vector_playstation.svg";
import xboxLogo from "../assets/vectors/Vector_xbox.svg";

const products = headerValues.PRODUCTS;
const categoriesValues = {
  PC: {
    label: "PC",
    link: `${products}/pc`,
    logo: windowsLogo,
  },
  PS5: {
    label: "Playstation 5",
    link: `${products}/ps5`,
    logo: psLogo,
  },
  XONE: {
    label: "XBox One",
    link: `${products}/xone`,
    logo: xboxLogo,
  },
};

export default categoriesValues;
