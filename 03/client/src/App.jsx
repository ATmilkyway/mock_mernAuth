import { Route, Routes } from "react-router";

import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const Home = () => {
  return <div>Home</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
  