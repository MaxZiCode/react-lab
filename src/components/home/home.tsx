import "./home.scss";
import HomeMenu from "./homeMenu";
import Search from "../search/search";

export default function home(): JSX.Element {
  return (
    <div className="home">
      <br />
      <Search />
      <br />
      <HomeMenu />
      <br />
      <HomeMenu />
      <br />
    </div>
  );
}
