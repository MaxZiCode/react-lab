import { VFC } from "react";
import UserContext from "../userContext/userContext";

const Profile: VFC = () => (
  <UserContext.Consumer>
    {({ username }) => (
      <div>
        <h2>{`User ${username} profile`}</h2>
      </div>
    )}
  </UserContext.Consumer>
);
export default Profile;
