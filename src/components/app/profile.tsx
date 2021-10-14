import { VFC } from "react";

const Profile: VFC<{ name: string }> = ({ name }) => (
  <div>
    <h2>{`User ${name} profile`}</h2>
  </div>
);
export default Profile;
