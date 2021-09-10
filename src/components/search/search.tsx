import "./search.scss";
import SelectSearch, { SelectedOption, SelectSearchOption } from "react-select-search";
import { getProduct, searchProductNames } from "../../api/apiProducts";

function classNameSelector(key: string, isSearching: boolean, hasResults: boolean): string {
  switch (key) {
    case "container": {
      const styles = ["search"];
      if (isSearching) styles.push("searching");
      if (hasResults) styles.push("has-results");
      return styles.join(" ");
    }
    case "input":
      return "search-input";
    case "select":
      return "search-select";
    case "options":
      return "search-options";
    case "option":
      return "search-option";
    case "has-focus":
      return "focused";
    default:
      return "";
  }
}

function selectProduct(selectedOption: SelectedOption) {
  getProduct(selectedOption.value).then((response) => {
    const message = `Product:\n${JSON.stringify(response)}`;
    alert(message);
  });
}

export default function search(): JSX.Element {
  let isSearching = false;
  let options: SelectSearchOption[] = [];

  async function getOptions(input: string) {
    if (!input) {
      options = [];
    } else {
      isSearching = true;
      const productNames = await searchProductNames(input);
      options = productNames.map<SelectSearchOption>((n) => ({ name: n.name, value: n.id } as SelectSearchOption));
      isSearching = false;
    }
    return options;
  }

  return (
    <SelectSearch
      search
      options={options}
      getOptions={getOptions}
      onChange={(_sov, so) => selectProduct(so as SelectedOption)}
      placeholder="Search"
      className={(key) => classNameSelector(key, isSearching, options.length > 0)}
      debounce={300}
      closeOnSelect={false}
    />
  );
}
