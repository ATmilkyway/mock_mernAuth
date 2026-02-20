import { Route, Routes } from "react-router";

import React from "react";
import Login from "./pages/Login";

export const Home = () => {
  return <div>Home</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
  