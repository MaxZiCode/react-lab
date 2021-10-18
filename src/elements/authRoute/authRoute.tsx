import UserContext from "@/components/userContext/userContext";
import { FC, useContext, useEffect } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  defaultPath: string;
  showSignInCallback: () => void;
  setSignInRedirectPath: (path: string) => void;
}

const AuthRoute: FC<AuthRouteProps> = ({ defaultPath, showSignInCallback, setSignInRedirectPath, ...routeProps }) => {
  const { isSignedIn } = useContext(UserContext);

  useEffect(() => {
    if (isSignedIn) return;

    showSignInCallback();
    const pathname = routeProps.location?.pathname;
    if (typeof pathname === "string") setSignInRedirectPath(pathname);
  });

  if (isSignedIn) return <Route {...routeProps} />;
  return <Redirect to={defaultPath} />;
};

export default AuthRoute;
