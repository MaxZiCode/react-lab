import "./gameCard.scss";
import { RatingView } from "react-simple-star-rating";

import { Product, CategoryName } from "@/types";
import categoriesValues from "@/constants/categoriesValues";
import { useDispatch } from "react-redux";
import { AddProduct } from "@/redux/cart/cartActions";
import { useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useCategoryParam from "@/hooks/useCategoryParam";
import PlatformIcon from "../platformIcon/platformIcon";
import CardEditWindow from "../cardEditWindow/cardEditWindow";

export default function GameCard(product: Product): JSX.Element {
  const dispatch = useDispatch();
  const categoryInfo = useCategoryParam();
  const isAdmin = useAdmin();
  const [isEditPageShowing, setIsEditPageShowing] = useState(false);

  const platformImages = product.platforms.sort().map((p) => {
    const category = categoriesValues.get(p as CategoryName);
    return category ? (
      <PlatformIcon key={category.id} label={category.label} logo={category.logo} className="card-platform" />
    ) : (
      []
    );
  });

  const addToCart = () => dispatch(AddProduct(product, categoryInfo?.id));

  return (
    <div className="card">
      <CardEditWindow isActive={isEditPageShowing} close={() => setIsEditPageShowing(false)} product={product} />
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
          <div className="card-age">{`${product.age}+`}</div>
          <div className="card-buttons">
            <button type="button" className="menu-button" onClick={addToCart}>
              Add to cart
            </button>
            {isAdmin && (
              <button type="button" className="menu-button" onClick={() => setIsEditPageShowing(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
