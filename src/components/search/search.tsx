import "./search.scss";
import "@/styles/panels.scss";
import SelectSearch, { SelectedOption, SelectSearchOption } from "react-select-search";
import { useEffect, useState } from "react";
import { Product, searchProducts } from "../../api/apiProducts";

const classes: { [key: string]: string } = {
  input: "search-input",
  select: "search-select",
  options: "search-options",
  option: "search-option panel-link-hover-focus",
  "has-focus": "focused",
};

function getClassName(key: string, showResults: boolean) {
  if (key === "container") {
    const result = ["search-container"];
    if (showResults) result.push("show-results");
    return result.join(" ");
  }
  return classes[key];
}

function selectProduct(selectedOption: SelectedOption) {
  const message = `Product:\n${JSON.stringify(selectedOption)}`;
  alert(message);
}

function getSearchIconClasses(isSearching: boolean) {
  const result = ["search-icon"];
  if (isSearching) result.push("searching");
  return result.join(" ");
}

export default function Search(): JSX.Element {
  const [isSearchNeeded, setIsSearchNeeded] = useState(false);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([] as SelectSearchOption[]);
  const [lastSearchRequest, setLastSearchRequest] = useState<Promise<Product[]> | null>(null);

  function getOptions(query: string) {
    setIsSearchNeeded(query !== input);
    setInput(query);
    return new Promise<SelectSearchOption[]>(() => options);
  }

  useEffect(() => {
    if (!isSearchNeeded) return;

    if (input) {
      const searchRequest = searchProducts(input).then<Product[]>((products) => {
        setOptions(products.map<SelectSearchOption>((n) => ({ name: n.name, value: n.id } as SelectSearchOption)));
        setLastSearchRequest(null);
        return products;
      });
      setLastSearchRequest(searchRequest);
    } else if (lastSearchRequest) lastSearchRequest.then(() => setOptions([]));
    else setOptions([]);

    setIsSearchNeeded(false);
  });

  const [selectSearch] = useState(
    <SelectSearch
      search
      options={options}
      getOptions={getOptions}
      onChange={(_sov, so) => selectProduct(so as SelectedOption)}
      placeholder="Search"
      className={(key) => getClassName(key, options.length > 0)}
      debounce={300}
      closeOnSelect={false}
    />
  );

  return (
    <div className="search">
      <div className="search-icon-box">
        <div className={getSearchIconClasses(lastSearchRequest !== null)} />
      </div>
      {selectSearch}
    </div>
  );
}
