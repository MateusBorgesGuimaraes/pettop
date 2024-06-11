import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import UserContext from "../../Context/UserContext";

const Login = () => {
  const userContext = React.useContext(UserContext);

  if (!userContext) {
    return null;
  }
  const { login, admin } = userContext;

  if (login === true) return <Navigate to="/" />;
  // if (admin === true) return <Navigate to="/dashboard" />;
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
      </Routes>
    </div>
  );
};

export default Login;
