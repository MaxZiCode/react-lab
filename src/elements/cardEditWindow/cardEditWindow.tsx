import "./cardEditWindow.scss";

import closeIcon from "@/assets/vectors/close.svg";

import { VFC } from "react";

const CardEditWindow: VFC = () => (
  <div id="card-edit">
    <div className="top">
      <div className="modal-title">Edit Card</div>
      <button className="modal-close-button" type="button">
        <img src={closeIcon} alt="close icon" />
      </button>
    </div>

    <div className="middle">
      <div className="first-column">
        <div className="title">Card image</div>
        <img src="https://upload.wikimedia.org/wikipedia/ru/9/98/Battlefield_1.jpg" alt="card" />
      </div>
      <div className="second-column">
        <div className="title">Information</div>
        <label htmlFor="card-edit-name">
          Name
          <input type="text" name="name" id="card-edit-name" defaultValue="Battlefield 1" />
        </label>
        <label htmlFor="card-edit-category">
          Category
          <input type="text" name="category" id="card-edit-category" defaultValue="Shooter" />
        </label>
        <label htmlFor="card-edit-price">
          Price
          <input type="text" name="price" id="card-edit-price" defaultValue={23.99} />
        </label>
        <label htmlFor="card-edit-image-link">
          Image
          <input
            type="text"
            name="image"
            id="card-edit-image-link"
            defaultValue="https://upload.wikimedia.org/wikipedia/ru/9/98/Battlefield_1.jpg"
          />
        </label>
        <label htmlFor="card-edit-description">
          Description
          <textarea
            name="description"
            id="card-edit-description"
            defaultValue="Battlefield 1 is a first-person shooter video game developed by DICE and published by Electronic Arts. Battlefield 1 is the fifteenth installment in the Battlefield series, and the first main entry in the series since Battlefield 4. It was released worldwide for Microsoft Windows, PlayStation 4, and Xbox One on October 21, 2016."
          />
        </label>
        <label htmlFor="card-edit-age">
          Age
          <select name="age" id="card-edit-age">
            <option value={6}>6+</option>
          </select>
        </label>
        <div className="title">Platform</div>
        <label htmlFor="card-edit-platform-pc">
          PC
          <input type="checkbox" name="platform-pc" id="card-edit-platform-pc" />
        </label>
        <label htmlFor="card-edit-platform-ps5">
          PlayStation 5
          <input type="checkbox" name="platform-ps5" id="card-edit-platform-ps5" />
        </label>
        <label htmlFor="card-edit-platform-xone">
          XBox One
          <input type="checkbox" name="platform-xone" id="card-edit-platform-xone" />
        </label>
      </div>
    </div>

    <div className="bottom">
      <button className="menu-button" type="button">
        Submit
      </button>
      <button className="menu-button" type="button">
        Delete card
      </button>
    </div>
  </div>
);

export default CardEditWindow;
