import React from "react";
import UserContext from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  adminOnly,
}: React.PropsWithChildren<{ adminOnly?: boolean }>) => {
  const userContext = React.useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { admin, login } = userContext;

  if (login === true && (adminOnly ? admin === true : true)) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
