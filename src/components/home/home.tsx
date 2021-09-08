import CategoriesMenu from "./categoriesMenu";
import NewGamesMenu from "./newGamesMenu";
import Search from "./search";

export default function home(): JSX.Element {
  return (
    <>
      <Search />
      <CategoriesMenu />
      <NewGamesMenu />
    </>
  );
}
