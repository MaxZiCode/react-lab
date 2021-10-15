import { showSignIn } from "@/redux/modals/modalsActions";
import { RootState } from "@/redux/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  defaultPath: string;
  setSignInRedirectPath: (path: string) => void;
}

const AuthRoute: FC<AuthRouteProps> = ({ defaultPath, setSignInRedirectPath, ...routeProps }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((s: RootState) => s.user.isSignedIn);

  useEffect(() => {
    if (isSignedIn) return;

    dispatch(showSignIn());
    const pathname = routeProps.location?.pathname;
    if (typeof pathname === "string") setSignInRedirectPath(pathname);
  });

  if (isSignedIn) return <Route {...routeProps} />;
  return <Redirect to={defaultPath} />;
};

export default AuthRoute;
