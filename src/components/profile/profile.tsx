import "./profile.scss";
import "@/styles/menu.scss";

import { useEffect, useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getProfile, saveProfile } from "@/api/apiProfile";
import { parseBody } from "@/utilities/responseParser";
import { Profile } from "@/types";
import { getBase64 } from "@/utilities/converter";
import { signInUser } from "@/redux/user/userActions";
import ChangeUsernameField from "@/elements/changeUsernameField/changeUsernameField";
import defaultValues from "@/constants/defaultValues";
import ChangePasswordWindow from "../changePasswordWindow/changePasswordWindow";

const Profile: VFC = () => {
  const dispatch = useDispatch();
  const { id, username: initialName, password } = useSelector((s: RootState) => s.user);

  const [profile, setProfile] = useState<Profile>({ email: initialName });
  const [usernameValidationFn, setUsernameValidationFn] = useState(defaultValues.notImplementedValidationFn);

  const [isPasswordWindowShowing, setIsPasswordWindowShowing] = useState(false);

  const update = (promise: Promise<Response>) => {
    promise.then((r) => {
      if (r.ok)
        parseBody<Profile>(r).then((p) => {
          setProfile(p);
          dispatch(signInUser(id, p.email, password));
        });
      else r.text().then((t) => console.error(t));
    });
  };

  useEffect(() => {
    update(getProfile(id));
  }, []);

  const changePicture = (files: FileList | null) => {
    if (files && files.length > 0) getBase64(files[0]).then((s) => setProfile({ ...profile, picture: s }));
  };

  const validate = () => usernameValidationFn();

  const save = () => {
    if (validate()) update(saveProfile(id, password, profile));
  };

  const image = profile.picture ? (
    <img src={profile.picture} alt="profile" />
  ) : (
    <div className="profile-wrapper-no-picture">
      <div className="profile-image-no-picture">NO PICTURE</div>
    </div>
  );

  return (
    <div className="home">
      <ChangePasswordWindow
        close={() => setIsPasswordWindowShowing(false)}
        profile={profile}
        isActive={isPasswordWindowShowing}
      />
      <div className="big-menu">
        <h2 className="big-menu-title">{`${initialName} profile page`}</h2>
        <div className="profile-page-container">
          <div className="profile-change-image-area">
            <div className="profile-image-view">{image}</div>
            <button type="button" className="menu-button-transparent">
              <label htmlFor="picture_input">
                Change profile image
                <input
                  id="picture_input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => changePicture(e.target.files)}
                />
              </label>
            </button>
          </div>
          <div className="user-info-area">
            <ChangeUsernameField
              username={profile.email}
              onChangeUsername={(email) => setProfile({ ...profile, email })}
              setValidationFn={setUsernameValidationFn}
            />
            <div className="form-field-column">
              <label className="form-input-label" htmlFor="profile-description">
                Profile description
                <textarea
                  id="profile-description"
                  name="profile-description"
                  rows={6}
                  className="form-input-column"
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  value={profile.description}
                />
              </label>
            </div>
          </div>
          <div className="buttons-area">
            <button type="button" className="menu-button-transparent" onClick={save}>
              Save profile
            </button>
            <button type="button" className="menu-button-transparent" onClick={() => setIsPasswordWindowShowing(true)}>
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
