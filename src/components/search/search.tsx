import SelectSearch, { fuzzySearch, SelectSearchOption } from "react-select-search";
import "./search.scss";

function classNameSelector(key: string): string {
  switch (key) {
    case "container":
      return "search";
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

function getOptions(query: string) {
  return new Promise<SelectSearchOption[]>((resolve, reject) => {
    if (query) {
      resolve([
        { name: "sv", value: "s" },
        { name: "en", value: "e" },
      ]);
    }
    reject();
  });
}

export default function search(): JSX.Element {
  return (
    <SelectSearch
      search
      options={[]}
      getOptions={getOptions}
      filterOptions={fuzzySearch}
      placeholder="Search"
      className={classNameSelector}
      debounce={300}
    />
  );
}
