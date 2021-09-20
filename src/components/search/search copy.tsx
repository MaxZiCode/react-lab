import "./search copy.scss";
import "@/styles/panels.scss";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Product, searchProducts } from "../../api/apiProducts";

export default function Search(): JSX.Element {
  const [products, setProducts] = useState([] as Product[]);
  const [currentValue, setCurrentValue] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  function search(searchValue: string) {
    setRequestCount(requestCount + 1);
    searchProducts(searchValue)
      .then((ps) => {
        if (searchValue === currentValue) setProducts(ps);
      })
      .finally(() => setRequestCount(requestCount - 1));
  }
  useEffect(() => {
    if (!currentValue) {
      setProducts([]);
      return;
    }
    search(currentValue);
  }, [currentValue]);

  const initialSearchStyle = "search";
  const [hasFocused, setHasFocused] = useState(false);
  const [searchStyle, setSearchStyle] = useState(initialSearchStyle);
  const hasResults = products.length > 0;
  const shouldShowEmptyMessage = currentValue.length > 0 && !hasResults;
  useEffect(() => {
    const styles = [initialSearchStyle];
    if (hasFocused) styles.push("focused");
    if (hasResults || shouldShowEmptyMessage) styles.push("show-results");
    setSearchStyle(styles.join(" "));
  }, [hasFocused, products]);

  function getIconStyle() {
    const styles = ["search-input-icon"];
    if (requestCount > 0) styles.push("searching");
    return styles.join(" ");
  }

  const debouncedCallBack = useDebouncedCallback((value) => {
    setCurrentValue(value);
  }, 300);

  return (
    <div className={searchStyle} onFocus={() => setHasFocused(true)} onBlur={() => setHasFocused(false)}>
      <div className="search-input">
        <div className={getIconStyle()} />
        <input type="text" onChange={(e) => debouncedCallBack(e.currentTarget.value)} className="search-input-text" />
      </div>
      {(() => {
        if (hasResults)
          return (
            <div className="search-results">
              <ul className="search-results-list">
                {products.map((p) => (
                  <li key={p.id}>
                    <input
                      type="button"
                      className="search-results-item panel-link-hover-focus"
                      tabIndex={0}
                      value={p.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        if (shouldShowEmptyMessage)
          return (
            <div className="search-results">
              <div className="search-results-item">Not Found</div>
            </div>
          );
        return undefined;
      })()}
    </div>
  );
}
