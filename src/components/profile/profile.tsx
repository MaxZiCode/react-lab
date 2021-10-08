import "./profile.scss";

import BigMenu from "@/elements/bigMenu/bigMenu";
import FormInput from "@/elements/formInput/formInput";
import { VFC } from "react";
import UserContext from "../userContext/userContext";

const Profile: VFC = () => (
  <UserContext.Consumer>
    {({ username }) => (
      <div className="home">
        <BigMenu title={`${username || "User name"} profile page`}>
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
              <FormInput
                id="profile-description"
                name="profile-description"
                label="Profile description"
                type="textarea"
                style={"column" as const}
              />
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
        </BigMenu>
      </div>
    )}
  </UserContext.Consumer>
);
export default Profile;
