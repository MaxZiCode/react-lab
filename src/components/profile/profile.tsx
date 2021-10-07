import CardMenu from "@/elements/cardMenu/cardMenu";
import { VFC } from "react";
import UserContext from "../userContext/userContext";

const Profile: VFC = () => (
  <UserContext.Consumer>
    {({ username }) => (
      <div className="home">
        <CardMenu title={username || "User name"}>
          <div className="profile-page-container">
            <div className="profile-image-area">
              <div className="profile-image-no-picture">
                <div className="profile-image-no-picture-content">NO PICTURE</div>
              </div>
              <button type="button" className="profile-change-image-button">
                {" "}
              </button>
            </div>
            <div className="user-info-area"> </div>
            <div className="buttons-area"> </div>
          </div>
        </CardMenu>
      </div>
    )}
  </UserContext.Consumer>
);
export default Profile;
