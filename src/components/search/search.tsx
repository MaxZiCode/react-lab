import "./search.scss";
import "@/styles/panels.scss";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Product } from "@/types";
import LoadingSpinner from "@/elements/loadingSpinner/loadingSpinner";
import { searchProducts } from "../../api/apiProducts";

const initialSearchStyle = "search";

export default function Search(): JSX.Element {
  const [currentValue, setCurrentValue] = useState("");
  const [products, setProducts] = useState([] as Product[]);
  const [isSearching, setIsSearching] = useState(false);
  const [shouldShowResults, setShouldShowResults] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);

  const [searchStyle, setSearchStyle] = useState(initialSearchStyle);
  const hasResults = products.length > 0;

  useEffect(() => {
    if (!currentValue) {
      setProducts([]);
      return;
    }
    setIsSearching(true);
    searchProducts(currentValue).then((ps) => setProducts(ps));
  }, [currentValue]);

  useEffect(() => {
    setIsSearching(false);
    setShouldShowResults(hasFocused && (hasResults || currentValue.length > 0));
  }, [hasFocused, products]);

  useEffect(() => {
    const styles = [initialSearchStyle];
    if (hasFocused) {
      styles.push("focused");
      if (shouldShowResults) styles.push("show-results");
    }
    setSearchStyle(styles.join(" "));
  }, [hasFocused, shouldShowResults]);

  const debouncedCallBack = useDebouncedCallback((value) => {
    setCurrentValue(value);
  }, 300);

  return (
    <div id="search" className={searchStyle} onFocus={() => setHasFocused(true)} onBlur={() => setHasFocused(false)}>
      <div className="search-input">
        {isSearching ? <LoadingSpinner /> : <div className="search-input-icon" />}
        <input type="text" onChange={(e) => debouncedCallBack(e.currentTarget.value)} className="search-input-text" />
      </div>
      {shouldShowResults ? (
        <div className="search-results">
          <ul className="search-results-list">
            {hasResults ? (
              products.map((p) => (
                <li key={p.id}>
                  <input
                    type="button"
                    className="search-results-item panel-link-hover-focus"
                    tabIndex={0}
                    value={p.name}
                    onMouseDown={() => alert(JSON.stringify(p))}
                  />
                </li>
              ))
            ) : (
              <input type="button" className="search-results-item" value="Not found" />
            )}
          </ul>
        </div>
      ) : undefined}
    </div>
  );
}
