import headerValues from "./headerValues";
import windowsLogo from "../assets/vectors/Vector_windows.svg";
import psLogo from "../assets/vectors/Vector_playstation.svg";
import xboxLogo from "../assets/vectors/Vector_xbox.svg";

export type CategoryName = "PC" | "PS5" | "XONE";

export interface CategoryInfo {
  readonly id: CategoryName;

  readonly label: string;

  readonly logo: string;

  readonly link: string;
}

function createCategoryInfo(id: CategoryName, label: string, logo: string) {
  return {
    id,
    label,
    logo,
    link: `${headerValues.PRODUCTS}/${id.toLowerCase()}`,
  };
}

const pc = createCategoryInfo("PC", "PC", windowsLogo);
const ps5 = createCategoryInfo("PS5", "PlayStation 5", psLogo);
const xone = createCategoryInfo("XONE", "XBox One", xboxLogo);

const categoriesValues = new Map<CategoryName, CategoryInfo>([
  [pc.id, pc],
  [ps5.id, ps5],
  [xone.id, xone],
]);

export default categoriesValues;
