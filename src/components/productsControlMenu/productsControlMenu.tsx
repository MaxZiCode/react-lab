import { Product } from "@/types";
import productValues from "@/constants/productValues";
import "./productsControlMenu.scss";
import { capitalize } from "@/utilities/stringHelper";

const sortCriteriaMap = new Map(productValues.sortCriterias.map((sc) => [sc, capitalize(sc)]));

const sortTypeMap = new Map([
  ["asc", "Ascending"],
  ["desc", "Descending"],
]);

const allGenres = ["all", ...productValues.genres];
const filterGenresMap = new Map(allGenres.map((fg) => [fg, capitalize(fg)]));
filterGenresMap.set("all", "All genres");

const allAges = ["all", ...productValues.ages];
const filterAgeMap = new Map(
  allAges.map((a) => {
    const value = Number.isNaN(a) ? a : `${a}+`;
    return [a, value];
  })
);
filterAgeMap.set("all", "All ages");

export interface ProductsControlMenuProps {
  title: string;

  sortBy: keyof Product;
  setSortBy: (sortBy: keyof Product) => void;

  sortType: string;
  setSortType: (sortType: string) => void;

  filterGenres: string;
  setFilterGenres: (genre: string) => void;

  filterAge: string;
  setFilterAge: (age: string) => void;
}

const ProductsControlMenu: React.VFC<ProductsControlMenuProps> = ({
  title,

  sortBy,
  setSortBy,

  sortType,
  setSortType,

  filterGenres,
  setFilterGenres,

  filterAge,
  setFilterAge,
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
      {[...filterGenresMap.keys()].map((fg) => {
        const id = `ps-filter-genres-${fg}`;
        return (
          <div className="ps-filter-field" key={fg}>
            <label htmlFor={id}>
              <input
                className="menu-radio"
                type="radio"
                name="filter-genres"
                id={id}
                value={fg}
                checked={fg === filterGenres}
                onChange={() => setFilterGenres(fg)}
              />
              {filterGenresMap.get(fg)}
            </label>
          </div>
        );
      })}
    </div>
    <div className="products-control-menu-section">
      <h3 className="big-menu-title ps-title">Age</h3>
      {[...filterAgeMap.keys()].map((fa) => {
        const id = `ps-filter-age-${fa}`;
        return (
          <div className="ps-filter-field" key={fa}>
            <label htmlFor={id}>
              <input
                className="menu-radio"
                type="radio"
                name="filter-age"
                id={id}
                value={fa}
                checked={fa === filterAge}
                onChange={() => setFilterAge(fa)}
              />
              {filterAgeMap.get(fa)}
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

export default ProductsControlMenu;
