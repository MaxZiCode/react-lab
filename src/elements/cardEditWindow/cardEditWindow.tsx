import "./cardEditWindow.scss";

import closeIcon from "@/assets/vectors/close.svg";

import { useState, VFC } from "react";
import { Product } from "@/types";
import productValues from "@/constants/productValues";
import categoriesValues from "@/constants/categoriesValues";
import { useDispatch } from "react-redux";
import { addProduct, changeProduct, deleteProduct } from "@/redux/products/productsActions";
import withModal, { ModalProps } from "../modal/modal";
import NoPicture from "../noPicture/noPicture";
import Window from "../window/window";

export interface CardEditWindowProps {
  close: () => void;
  product?: Product;
}

const CardEditWindowComp: VFC<CardEditWindowProps> = ({ close, product }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.genre ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [image, setImage] = useState(product?.imagePath ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [age, setAge] = useState(product?.age ?? productValues.ages[0]);
  const [platformMap, setPlatformMap] = useState(new Map(product?.platforms.map((p) => [p, true])));

  const getPlatforms = () => [...platformMap.keys()].filter((p) => platformMap.get(p));

  const submitHandler = () => {
    type ProductData = Omit<Product, "id">;
    const productData: ProductData = {
      name,
      genre: category,
      price,
      imagePath: image,
      description,
      age,
      platforms: getPlatforms(),
      rating: product?.rating ?? 1,
      date: product?.date ?? new Date(),
    };

    if (product) {
      dispatch(changeProduct({ id: product.id, ...productData }));
    } else {
      dispatch(addProduct({ id: 0, ...productData }));
    }

    close();
  };

  const deleteHandler = () => {
    if (product) dispatch(deleteProduct(product.id));

    close();
  };

  return (
    <Window>
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
                type="number"
                name="price"
                id="card-edit-price"
                value={price}
                onChange={(e) => {
                  const value = e.currentTarget.valueAsNumber;
                  if (!Number.isNaN(value)) setPrice(value);
                }}
                min="0"
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
          <button className="menu-button" type="button" disabled={!product} onClick={deleteHandler}>
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
