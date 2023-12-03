import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/routes";

const ProtectedRoute = ({ children, ...rest }) => {
  const { signInSuccessful } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        signInSuccessful ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: ROUTES.SIGN,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
