import React, { useState } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";

const AppLayout = () => {
  const [user, setUser] = useState(false);
  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
};

export default AppLayout;
