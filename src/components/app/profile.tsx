import { RootState } from "@/redux/store";
import { VFC } from "react";
import { useSelector } from "react-redux";

const Profile: VFC = () => (
  <div>
    <h2>{`User ${useSelector((s: RootState) => s.user.username)} profile`}</h2>
  </div>
);
export default Profile;
