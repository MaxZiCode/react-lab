import { VFC } from "react";
import FormInput from "../formInput/formInput";

export interface ChangeUsernameFieldProps {
  username: string;
  onChangeUsername: (username: string) => void;
  usernameProblem: string;
}

const ChangeUsernameField: VFC<ChangeUsernameFieldProps> = ({
  username,
  onChangeUsername,
  usernameProblem,
}): JSX.Element => (
  <FormInput
    id="username"
    name="username"
    label="Username"
    type="text"
    onChange={onChangeUsername}
    validationProblem={usernameProblem}
    value={username}
  />
);

export default ChangeUsernameField;
