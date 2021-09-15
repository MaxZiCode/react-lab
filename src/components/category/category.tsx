import "./category.scss";
import { Link } from "react-router-dom";
import PlatformIcon from "../platformIcon/platformIcon";

interface CategoryProps {
  label: string;
  link: string;
  logo: string;
}

export default function category(props: CategoryProps): JSX.Element {
  return (
    <Link to={props.link} className="category">
      <PlatformIcon className="category-image" logo={props.logo} label={props.label} />
      <div className="category-label">{props.label}</div>
    </Link>
  );
}
