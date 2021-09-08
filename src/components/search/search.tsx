import "./search.scss";
import { FC } from "react";

const Search: FC = () => (
  <div className="search">
    <input type="text" placeholder="Search" className="search-input" />
  </div>
);

export default Search;
