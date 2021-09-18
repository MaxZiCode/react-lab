import windowsLogo from "../assets/vectors/Vector_windows.svg";
import psLogo from "../assets/vectors/Vector_playstation.svg";
import xboxLogo from "../assets/vectors/Vector_xbox.svg";

export type CategoryName = "PC" | "PS5" | "XONE";

export class CategoryInfo {
  readonly id: CategoryName;

  readonly label: string;

  readonly logo: string;

  readonly link: string;

  constructor(id: CategoryName, label: string, logo: string) {
    this.id = id;
    this.label = label;
    this.logo = logo;
    this.link = `/${id.toLowerCase()}`;
  }
}

const pc = new CategoryInfo("PC", "PC", windowsLogo);
const ps5 = new CategoryInfo("PS5", "PlayStation 5", psLogo);
const xone = new CategoryInfo("XONE", "XBox One", xboxLogo);

const categoriesValues = new Map<CategoryName, CategoryInfo>([
  [pc.id, pc],
  [ps5.id, ps5],
  [xone.id, xone],
]);

export default categoriesValues;
