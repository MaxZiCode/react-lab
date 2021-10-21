import "./gameCard.scss";
import { RatingView } from "react-simple-star-rating";

import { Product, CategoryName } from "@/types";
import categoriesValues from "@/constants/categoriesValues";
import PlatformIcon from "../platformIcon/platformIcon";

export default function GameCard(product: Product): JSX.Element {
  const platformImages = product.platforms.sort().map((p) => {
    const category = categoriesValues.get(p as CategoryName);
    return category ? (
      <PlatformIcon key={category.id} label={category.label} logo={category.logo} className="card-platform" />
    ) : undefined;
  });

  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <div className="card-platforms">{platformImages}</div>
          <div className="card-image-wrapper">
            <img src={product.imagePath} alt={`${product.name} logo`} className="card-image" />
          </div>
          <div className="card-front-info">
            <div className="card-front-info-first-line">
              <div className="card-game-name">{product.name}</div>
              <div className="card-price">{`${product.price}$`}</div>
            </div>
            <RatingView stars={5} ratingValue={product.rating} size={20} />
          </div>
        </div>
        <div className="card-back">
          <div className="card-description">{product.description}</div>
          <div className="card-age">{product.age}</div>
          <input type="button" className="card-purchase" value="Add to cart" onClick={() => alert("Adding to cart")} />
        </div>
      </div>
    </div>
  );
}
