import "./category.scss";
import { Link } from "react-router-dom";

interface CategoryProps {
  label: string;
  link: string;
  image: {
    path: string;
    description: string;
  };
}

export default function category(props: CategoryProps): JSX.Element {
  return (
    <Link to={props.link} className="category">
      <img src={props.image.path} alt={props.image.description} className="category-image" />
      <div className="category-label">{props.label}</div>
    </Link>
  );
}
