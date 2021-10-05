import SignInModal from "@/components/signInModal/signInModal";
import { FC, ReactNode, useState } from "react";
import { Route, RouteProps } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  isSignedIn: boolean;
  defaultPage: ReactNode;
  onSignedIn: () => void;
}

const AuthRoute: FC<AuthRouteProps> = (props) => {
  const [shouldShowSignIn, setShouldShowSignIn] = useState(true);

  return (
    <Route
      {...props}
      render={() => {
        if (props.isSignedIn) return props.children;
        return (
          <>
            {props.defaultPage}
            <SignInModal
              active={shouldShowSignIn}
              onClose={() => setShouldShowSignIn(false)}
              onSignedIn={props.onSignedIn}
            />
          </>
        );
      }}
    />
  );
};

export default AuthRoute;
