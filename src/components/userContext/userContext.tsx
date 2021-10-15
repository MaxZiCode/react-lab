import React from "react";

export interface UserContextProps {
  username?: string;
  isSignedIn: boolean;
}

const UserContext = React.createContext<UserContextProps>({ isSignedIn: false });

export default UserContext;
