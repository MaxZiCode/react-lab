import urls from "@/constants/urls";
import { showSignIn } from "@/redux/modals/modalsActions";
import { setRedirectSignIn } from "@/redux/routes/routesActions";
import { RootState } from "@/redux/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteProps, Redirect } from "react-router-dom";

const AuthRoute: FC<RouteProps> = (props) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((s: RootState) => s.user.isSignedIn);

  useEffect(() => {
    if (isSignedIn) return;

    dispatch(showSignIn());
    const pathname = props.location?.pathname;
    if (pathname) dispatch(setRedirectSignIn(pathname));
  });

  return isSignedIn ? <Route {...props} /> : <Redirect to={urls.HOME} />;
};

export default AuthRoute;
