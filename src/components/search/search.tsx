import "./search.scss";
import SelectSearch, { SelectedOption, SelectSearchOption } from "react-select-search";
import { useState } from "react";
import { getProduct, searchProductNames } from "../../api/apiProducts";

const classes: { [key: string]: string } = {
  input: "search-input",
  select: "search-select",
  options: "search-options",
  option: "search-option",
  "has-focus": "focused",
};

function getClassName(key: string, hasResults: boolean) {
  if (key === "container") {
    const result = ["search-container"];
    if (hasResults) result.push("has-results");
    return result.join(" ");
  }
  return classes[key];
}

function selectProduct(selectedOption: SelectedOption) {
  getProduct(selectedOption.value).then((response) => {
    const message = `Product:\n${JSON.stringify(response)}`;
    alert(message);
  });
}

function getSearchIconClasses(isSearching: boolean) {
  const result = ["search-icon"];
  if (isSearching) result.push("searching");
  return result.join(" ");
}

export default function search(): JSX.Element {
  const [isSearching, setIsSearching] = useState(false);
  let options: SelectSearchOption[] = [];

  async function getOptions(input: string) {
    if (!input) {
      options = [];
    } else {
      setIsSearching(true);
      const productNames = await searchProductNames(input);
      options = productNames.map<SelectSearchOption>((n) => ({ name: n.name, value: n.id } as SelectSearchOption));
      setIsSearching(false);
    }
    return options;
  }

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
        <div className={getSearchIconClasses(isSearching)} />
      </div>
      {selectSearch}
    </div>
  );
}
