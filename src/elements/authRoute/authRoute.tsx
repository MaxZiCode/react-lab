import urls from "@/constants/urls";
import { showSignInWindow } from "@/redux/authModal/authModalActions";
import { RootState } from "@/redux/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  setRedirectSignIn: (pathName: string) => void;
}

const AuthRoute: FC<AuthRouteProps> = ({ setRedirectSignIn, ...props }) => {
  const dispatch = useDispatch();

  const isSignedIn = useSelector((s: RootState) => s.user.isSignedIn);

  useEffect(() => {
    if (isSignedIn) return;

    dispatch(showSignInWindow());
    const pathname = props.location?.pathname;
    if (pathname) setRedirectSignIn(pathname);
  });

  return isSignedIn ? <Route {...props} /> : <Redirect to={urls.HOME} />;
};

export default AuthRoute;
