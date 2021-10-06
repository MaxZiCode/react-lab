import React from "react";

export interface UserContextProps {
  username?: string;
}

const UserContext = React.createContext<UserContextProps>({});

export default UserContext;
