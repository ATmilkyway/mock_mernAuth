import { Route, Routes } from "react-router";

import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

export const Home = () => {
  return <div>Home</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      {/* work on the security so it can only work only on logged device or get the logged in user id */}
    </Routes>
  );
};

export default App;
  