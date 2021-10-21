import { validateUsername } from "@/utilities/validator";
import { useEffect, useState, VFC } from "react";
import FormInput from "../formInput/formInput";

export interface ChangeUsernameFieldProps {
  username: string;
  onChangeUsername: (username: string) => void;
  setValidationFn: (fn: () => () => boolean) => void;
}

const ChangeUsernameField: VFC<ChangeUsernameFieldProps> = ({
  username,
  onChangeUsername,
  setValidationFn,
}): JSX.Element => {
  const [usernameProblem, setUsernameProblem] = useState("");

  function validate() {
    return validateUsername(username, setUsernameProblem);
  }

  useEffect(() => setValidationFn(() => validate), [username]);

  return (
    <FormInput
      id="username"
      name="username"
      label="Username"
      type="text"
      onChange={onChangeUsername}
      validationProblem={usernameProblem}
    />
  );
};

export default ChangeUsernameField;
