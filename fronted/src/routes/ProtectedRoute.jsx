import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
