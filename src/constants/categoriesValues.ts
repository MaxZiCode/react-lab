import headerValues from "./headerValues";

const products = headerValues.PRODUCTS;
const categoriesValues = {
  PC: {
    label: "PC",
    link: `${products}/pc`,
  },
  PS5: {
    label: "Playstation 5",
    link: `${products}/ps5`,
  },
  XONE: {
    label: "XBox One",
    link: `${products}/xone`,
  },
};

export default categoriesValues;
