import { VFC, ReactNode, useEffect } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  isSignedIn: boolean;
  route: ReactNode;
  defaultPath: string;
  showSignInCallback: () => void;
  setSignInRedirectPath: (path: string) => void;
}

const AuthRoute: VFC<AuthRouteProps> = ({
  route,
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

  if (isSignedIn) return <Route {...routeProps}>{route}</Route>;
  return <Redirect to={defaultPath} />;
};

export default AuthRoute;
