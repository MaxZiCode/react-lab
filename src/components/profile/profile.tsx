import "./profile.scss";
import "@/styles/menu.scss";

import { Suspense, useEffect, useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getProfile, saveProfile } from "@/api/apiProfile";
import { Profile, ProfileReader } from "@/types";
import { getBase64 } from "@/utilities/converter";
import { changeUsername } from "@/redux/user/userActions";
import ChangeUsernameField from "@/elements/changeUsernameField/changeUsernameField";
import defaultValues from "@/constants/defaultValues";
import LoadingSpinner from "@/elements/loadingSpinner/loadingSpinner";
import { wrapProfilePromise } from "@/utilities/wrapper";
import { UserState } from "@/redux/states";
import ChangePasswordWindow from "../changePasswordWindow/changePasswordWindow";

export interface ProfileProps {
  profile?: Profile;
  setProfile: (profile: Profile) => void;
}

interface ProfileCompProps extends ProfileProps {
  profile: Profile;
  profileReader: ProfileReader;
  setProfileReader: (p: ProfileReader) => void;
  user: UserState;
}

const ProfileComp: VFC<ProfileCompProps> = ({ profile, setProfile, profileReader, setProfileReader, user }) => {
  const dispatch = useDispatch();
  const [usernameValidationFn, setUsernameValidationFn] = useState(defaultValues.notImplementedValidationFn);

  const [isPasswordWindowShowing, setIsPasswordWindowShowing] = useState(false);

  useEffect(() => {
    const p = profileReader.read();
    dispatch(changeUsername(p.email));
    setProfile(p);
  }, [profileReader]);

  const changePicture = (files: FileList | null) => {
    if (files && files.length > 0) getBase64(files[0]).then((s) => setProfile({ ...profile, picture: s }));
  };

  const validate = () => usernameValidationFn();

  const update = (promise: Promise<Response>) => {
    setProfileReader(wrapProfilePromise(promise));
  };

  const save = () => {
    if (validate()) update(saveProfile(user.id, user.password, profile));
  };

  const image = profile?.picture ? (
    <img src={profile.picture} alt="profile" />
  ) : (
    <div className="profile-wrapper-no-picture">
      <div className="profile-image-no-picture">NO PICTURE</div>
    </div>
  );

  return (
    <>
      <div className="profile-page-container">
        <div className="profile-change-image-area">
          <div className="profile-image-view">{image}</div>
          <button type="button" className="menu-button-transparent">
            <label htmlFor="picture_input">
              Change profile image
              <input id="picture_input" type="file" accept="image/*" onChange={(e) => changePicture(e.target.files)} />
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
            <ChangePasswordWindow
              close={() => setIsPasswordWindowShowing(false)}
              profile={profile}
              isActive={isPasswordWindowShowing}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default function Profile(props: ProfileProps): JSX.Element {
  const user = useSelector((s: RootState) => s.user);
  const [profileReader, setProfileReader] = useState(wrapProfilePromise(getProfile(user.id)));

  const loading = (
    <div className="loading-bounds">
      <LoadingSpinner />
    </div>
  );

  const profile = props.profile ?? { email: "" };
  const { setProfile } = props;

  return (
    <div className="home">
      <div className="big-menu">
        <h2 className="big-menu-title">{`${user.username} profile page`}</h2>
        <Suspense fallback={loading}>
          <ProfileComp {...{ profile, setProfile, user, profileReader, setProfileReader }} />
        </Suspense>
      </div>
    </div>
  );
}
