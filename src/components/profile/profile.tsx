import "./profile.scss";
import "@/styles/menu.scss";

import { useEffect, useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getProfile, saveProfile } from "@/api/apiProfile";
import { Profile } from "@/types";
import { getBase64 } from "@/utilities/converter";
import { changeUsername } from "@/redux/user/userActions";
import ChangeUsernameField from "@/elements/changeUsernameField/changeUsernameField";
import defaultValues from "@/constants/defaultValues";
import LoadingSpinner from "@/elements/loadingSpinner/loadingSpinner";
import { parseBody } from "@/utilities/responseParser";
import { setProfile as SetProfileState } from "@/redux/profile/profileActions";
import NoPicture from "@/elements/noPicture/noPicture";
import ChangePasswordWindow from "../changePasswordWindow/changePasswordWindow";

const Profile: VFC = () => {
  const dispatch = useDispatch();

  const user = useSelector((s: RootState) => s.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const updateProfile = async (promise: Promise<Response>): Promise<Profile> => {
    setIsLoading(true);
    const response = await promise;
    const p = await parseBody<Profile>(response);

    if (isMounted) setIsLoading(false);
    return p;
  };
  const profileState = useSelector((s: RootState) => s.profile.state);
  const [profile, setProfile] = useState<Profile>(profileState);

  const [usernameValidationFn, setUsernameValidationFn] = useState(defaultValues.notImplementedValidationFn);

  const [isPasswordWindowShowing, setIsPasswordWindowShowing] = useState(false);

  useEffect(() => () => setIsMounted(false), []);

  useEffect(() => {
    if (profileState.email !== user.username) {
      updateProfile(getProfile(user.id)).then((p) => {
        setProfile(p);
        dispatch(SetProfileState(p));
      });
    }
  }, [profileState]);

  const changePicture = (files: FileList | null) => {
    if (files && files.length > 0) getBase64(files[0]).then((s) => setProfile({ ...profile, picture: s }));
  };

  const validate = () => usernameValidationFn();

  const save = async () => {
    if (!validate()) return;
    const p = await updateProfile(saveProfile(user.id, user.password, profile));
    setProfile(p);
    dispatch(SetProfileState(p));
    dispatch(changeUsername(p.email));
  };

  const loadingSpinner = (
    <div className="loading-bounds">
      <LoadingSpinner />
    </div>
  );

  return (
    <div className="home">
      <ChangePasswordWindow
        close={() => {
          setIsPasswordWindowShowing(false);
        }}
        profile={profile}
        isActive={isPasswordWindowShowing}
      />
      <div className="big-menu">
        <h2 className="big-menu-title">{`${user.username} profile page`}</h2>
        {isLoading ? (
          loadingSpinner
        ) : (
          <div className="profile-page-container">
            <div className="profile-change-image-area">
              <div className="profile-image-view">
                {profile.picture ? <img src={profile.picture} alt="profile" /> : <NoPicture />}
              </div>
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
                    className="form-input"
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
              <button
                type="button"
                className="menu-button-transparent"
                onClick={() => setIsPasswordWindowShowing(true)}
              >
                Change password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
