import urls from "@/constants/urls";
import { RootState } from "@/redux/store";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  showSignIn: () => void;
  setRedirectSignIn: (pathName: string) => void;
}

const AuthRoute: FC<AuthRouteProps> = ({ showSignIn, setRedirectSignIn, ...props }) => {
  const isSignedIn = useSelector((s: RootState) => s.user.isSignedIn);

  useEffect(() => {
    if (isSignedIn) return;

    showSignIn();
    const pathname = props.location?.pathname;
    if (pathname) setRedirectSignIn(pathname);
  });

  return isSignedIn ? <Route {...props} /> : <Redirect to={urls.HOME} />;
};

export default AuthRoute;
