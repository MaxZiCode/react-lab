import { RootState } from "@/redux/store";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  defaultPath: string;
  showSignInCallback: () => void;
  setSignInRedirectPath: (path: string) => void;
}

const AuthRoute: FC<AuthRouteProps> = ({ defaultPath, showSignInCallback, setSignInRedirectPath, ...routeProps }) => {
  const isSignedIn = useSelector((s: RootState) => s.user.isSignedIn);

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
