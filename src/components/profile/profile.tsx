import "./profile.scss";
import "@/styles/menu.scss";

import FormInput from "@/elements/formInput/formInput";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Profile: VFC = () => {
  const username = useSelector((s: RootState) => s.user.username);

  return (
    <div className="home">
      <div className="big-menu">
        <h2 className="big-menu-title">{`${username || "User name"} profile page`}</h2>
        <div className="profile-page-container">
          <div className="profile-change-image-area">
            <div className="profile-image-view">
              <div className="profile-image-no-picture">NO PICTURE</div>
            </div>
            <button type="button" className="menu-button-transparent">
              Change profile image
            </button>
          </div>
          <div className="user-info-area">
            <FormInput id="profile-username" name="username" label="Username" type="text" style={"column" as const} />
            <div className="form-field-column">
              <label className="form-input-label" htmlFor="profile-description">
                Profile description
                <textarea
                  id="profile-description"
                  name="profile-description"
                  rows={6}
                  className="form-input-column"
                  onChange={() => {
                    // if (props.onChange) props.onChange(e.currentTarget.value);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="buttons-area">
            <button type="button" className="menu-button-transparent">
              Save profile
            </button>
            <button type="button" className="menu-button-transparent">
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
