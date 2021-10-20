import "./profile.scss";
import "@/styles/menu.scss";

import FormInput from "@/elements/formInput/formInput";
import { useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getProfile, saveProfile } from "@/api/apiProfile";
import { parseBody } from "@/utilities/responseParser";
import { Profile } from "@/types";
import { getBase64 } from "@/utilities/converter";

const Profile: VFC = () => {
  const { id, username: initialName } = useSelector((s: RootState) => s.user);
  const [username, setUserName] = useState(initialName as string);
  const [picture, setPicture] = useState<string>();
  const [description, setDescription] = useState<string>();

  const update = (promise: Promise<Response>) => {
    promise.then(async (r) => {
      const profile = await parseBody<Profile>(r);
      setDescription(profile.description);
      setPicture(profile.picture);
    });
  };

  useEffect(() => {
    if (!id) return;
    update(getProfile(id));
  }, []);

  const changePicture = (files: FileList | null) => {
    if (files && files.length > 0) getBase64(files[0]).then((s) => setPicture(s));
  };

  const save = () => {
    if (!id) return;
    update(saveProfile(id, { username, picture, description }));
  };

  const image = picture ? (
    <img src={picture} alt="profile" />
  ) : (
    <div className="profile-image-no-picture">NO PICTURE</div>
  );

  return (
    <div className="home">
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
            <FormInput
              id="profile-username"
              name="username"
              label="Username"
              type="text"
              style={"column" as const}
              onChange={setUserName}
              value={username}
            />
            <div className="form-field-column">
              <label className="form-input-label" htmlFor="profile-description">
                Profile description
                <textarea
                  id="profile-description"
                  name="profile-description"
                  rows={6}
                  className="form-input-column"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </label>
            </div>
          </div>
          <div className="buttons-area">
            <button type="button" className="menu-button-transparent" onClick={save}>
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
