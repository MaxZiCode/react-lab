import { VFC, ReactNode } from "react";
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
}) => (
  <Route
    {...routeProps}
    render={(props) => {
      if (isSignedIn) return route;

      showSignInCallback();
      if (typeof props.location.pathname === "string") setSignInRedirectPath(props.location.pathname);
      return <Redirect to={defaultPath} />;
    }}
  />
);

export default AuthRoute;
