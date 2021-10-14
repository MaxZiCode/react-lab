import { FC, useEffect } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  isSignedIn: boolean;
  defaultPath: string;
  showSignInCallback: () => void;
  setSignInRedirectPath: (path: string) => void;
}

const AuthRoute: FC<AuthRouteProps> = ({
  isSignedIn,
  defaultPath,
  showSignInCallback,
  setSignInRedirectPath,
  ...routeProps
}) => {
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
