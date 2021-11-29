import "./cardEditWindow.scss";

import closeIcon from "@/assets/vectors/close.svg";

import { useState, VFC } from "react";
import { Product, ProductData } from "@/types";
import productValues from "@/constants/productValues";
import categoriesValues from "@/constants/categoriesValues";
import { useDispatch } from "react-redux";
import {
  addProduct as addProductLocal,
  changeProduct as changeProductLocal,
  deleteProduct as deleteProductLocal,
} from "@/redux/products/productsActions";
import { addProduct, changeProduct, deleteProduct } from "@/api/apiProducts";
import ConfirmationWindow from "@/components/confirmationWindow/confirmationWindow";
import withModal, { ModalProps } from "../modal/modal";
import NoPicture from "../noPicture/noPicture";
import Window from "../window/window";

export interface CardEditWindowProps {
  close: () => void;
  product?: Product;
}

const CardEditWindowComp: VFC<CardEditWindowProps> = ({ close, product }) => {
  const dispatch = useDispatch();

  const [isDeleteWindowShowing, setIsDeleteWindowShowing] = useState(false);

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.genre ?? "");
  const [price, setPrice] = useState(product?.price.toString() ?? "0");
  const [image, setImage] = useState(product?.imagePath ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [age, setAge] = useState(product?.age ?? productValues.ages[0]);
  const [platformMap, setPlatformMap] = useState(new Map(product?.platforms.map((p) => [p, true])));

  const submitHandler = () => {
    const platforms = [...platformMap.keys()].filter((p) => platformMap.get(p));
    if (platforms.length === 0) {
      const firstPlatform = categoriesValues.keys().next().value;
      platforms.push(firstPlatform);
    }

    const productData: ProductData = {
      name,
      genre: category,
      price: Number.parseFloat(price),
      imagePath: image,
      description,
      age,
      platforms,
      rating: product?.rating ?? 1,
      date: product?.date ?? new Date(),
    };

    if (product) {
      changeProduct({ id: product.id, ...productData }).then((p) => {
        dispatch(changeProductLocal(p));
      });
    } else {
      addProduct(productData).then((p) => {
        dispatch(addProductLocal(p));
      });
    }

    close();
  };

  const deleteHandler = () => {
    if (product)
      deleteProduct(product.id).then(() => {
        dispatch(deleteProductLocal(product.id));
      });

    close();
  };

  const changePriceHandler = (inputPrice: string) => {
    if (inputPrice.match(/^\d+\.*\d{0,2}$/) || !inputPrice) setPrice(inputPrice);
  };

  const blurPriceHandler = () => {
    if (!price) setPrice("0");
  };

  return (
    <Window>
      <ConfirmationWindow
        isActive={isDeleteWindowShowing}
        message={`Are you sure you want to delete the product "${name}"?`}
        actionText="Yes"
        action={deleteHandler}
        cancelText="No"
        cancel={() => setIsDeleteWindowShowing(false)}
        title="Delete confirmation"
      />
      <div id="card-edit">
        <div className="top">
          <div className="modal-title">Edit Card</div>
          <button className="modal-close-button" type="button" onClick={close}>
            <img src={closeIcon} alt="close icon" />
          </button>
        </div>
        <div className="middle">
          <div className="first-column">
            <div className="title">Card image</div>
            {product?.imagePath ? <img src={product?.imagePath} alt="card" /> : <NoPicture />}
          </div>
          <div className="second-column">
            <div className="title">Information</div>
            <label htmlFor="card-edit-name">
              Name
              <input
                type="text"
                name="name"
                id="card-edit-name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
              />
            </label>
            <label htmlFor="card-edit-category">
              Category
              <input
                type="text"
                name="category"
                id="card-edit-category"
                value={category}
                onChange={(e) => setCategory(e.currentTarget.value)}
              />
            </label>
            <label htmlFor="card-edit-price">
              Price
              <input
                type="text"
                name="price"
                id="card-edit-price"
                value={price}
                onChange={(e) => changePriceHandler(e.target.value)}
                onBlur={blurPriceHandler}
              />
            </label>
            <label htmlFor="card-edit-image-link">
              Image
              <input
                type="text"
                name="image"
                id="card-edit-image-link"
                value={image}
                onChange={(e) => setImage(e.currentTarget.value)}
              />
            </label>
            <label htmlFor="card-edit-description">
              Description
              <textarea
                name="description"
                id="card-edit-description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </label>
            <label htmlFor="card-edit-age">
              Age
              <select name="age" id="card-edit-age" value={age} onChange={(e) => setAge(e.currentTarget.value)}>
                {productValues.ages.map((a) => (
                  <option key={a} value={a}>
                    {a}+
                  </option>
                ))}
              </select>
            </label>
            <div className="title">Platform</div>
            {[...categoriesValues.values()].map((c) => {
              const { id } = c;
              const inputId = `card-edit-platform-${id}`;
              return (
                <label htmlFor={inputId} key={id}>
                  {c.label}
                  <input
                    type="checkbox"
                    name="platform"
                    value={id}
                    id={inputId}
                    defaultChecked={platformMap.get(id)}
                    onChange={(e) => setPlatformMap((map) => map.set(e.target.value, e.target.checked))}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div className="bottom">
          <button className="menu-button" type="button" onClick={submitHandler}>
            Submit
          </button>
          <button
            className="menu-button"
            type="button"
            disabled={!product}
            onClick={() => setIsDeleteWindowShowing(true)}
          >
            Delete card
          </button>
        </div>
      </div>
    </Window>
  );
};

const CardEditWindow = ({ isActive, ...props }: CardEditWindowProps & ModalProps): JSX.Element =>
  withModal(<CardEditWindowComp {...props} />, isActive, true);

export default CardEditWindow;
