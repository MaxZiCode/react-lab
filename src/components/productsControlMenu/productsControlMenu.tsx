import { Product } from "@/types";
import productValues from "@/constants/productValues";
import "./productsControlMenu.scss";
import { capitalize } from "@/utilities/stringHelper";

const sortCriteriaMap = new Map(productValues.sortCriterias.map((sc) => [sc, capitalize(sc)]));
const sortTypeMap = new Map([
  ["asc", "Ascending"],
  ["desc", "Descending"],
]);

export interface ProductsControlMenuProps {
  title: string;

  sortBy: keyof Product;
  setSortBy: (sortBy: keyof Product) => void;

  sortType: string;
  setSortType: (sortType: string) => void;
}

const ProductsControlMenu: React.VFC<ProductsControlMenuProps> = ({
  title,
  sortBy,
  setSortBy,
  sortType,
  setSortType,
}) => (
  <div id="products-control-menu" className="big-menu">
    <h2 className="big-menu-title-centered">{title}</h2>
    <div className="products-control-menu-section">
      <h3 className="big-menu-title ps-title">Sort</h3>
      <div className="ps-sort-field">
        Criteria
        <select
          name="sort-criteria"
          id="ps-sort-criteria"
          value={sortBy}
          onChange={(e) => setSortBy(e.currentTarget.value as keyof Product)}
        >
          {productValues.sortCriterias.map((sc) => (
            <option value={sc} key={sc}>
              {sortCriteriaMap.get(sc)}
            </option>
          ))}
        </select>
      </div>
      <div className="ps-sort-field">
        Type
        <select
          name="sort-type"
          id="ps-sort-type"
          value={sortType}
          onChange={(e) => setSortType(e.currentTarget.value)}
        >
          {productValues.sortTypes.map((st) => (
            <option value={st} key={st}>
              {sortTypeMap.get(st)}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="products-control-menu-section">
      <h3 className="big-menu-title ps-title">Genres</h3>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-all-genres">
          <input
            className="menu-radio"
            type="radio"
            name="filter-genres"
            id="ps-filter-all-genres"
            value="all-genres"
            defaultChecked
          />
          All genres
        </label>
      </div>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-shooter">
          <input className="menu-radio" type="radio" name="filter-genres" id="ps-filter-shooter" value="shooter" />
          Shooter
        </label>
      </div>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-arcade">
          <input className="menu-radio" type="radio" name="filter-genres" id="ps-filter-arcade" value="arcade" />
          Arcade
        </label>
      </div>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-survive">
          <input className="menu-radio" type="radio" name="filter-genres" id="ps-filter-survive" value="survive" />
          Survive
        </label>
      </div>
    </div>
    <div className="products-control-menu-section">
      <h3 className="big-menu-title ps-title">Age</h3>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-age3">
          <input className="menu-radio" type="radio" name="filter-age" id="ps-filter-age3" value="3" defaultChecked />
          3+
        </label>
      </div>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-age6">
          <input className="menu-radio" type="radio" name="filter-age" id="ps-filter-age6" value="6" />
          6+
        </label>
      </div>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-age12">
          <input className="menu-radio" type="radio" name="filter-age" id="ps-filter-age12" value="12" />
          12+
        </label>
      </div>
      <div className="ps-filter-field">
        <label htmlFor="ps-filter-age18">
          <input className="menu-radio" type="radio" name="filter-age" id="ps-filter-age18" value="18" />
          18+
        </label>
      </div>
    </div>
  </div>
);

export default ProductsControlMenu;
