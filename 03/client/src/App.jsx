import { Route, Routes } from "react-router";

import React from "react";
import { Button, HStack, Link } from "@chakra-ui/react";

export const Home = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button bg="brand.500" color="white">
        Test Button
      </Button>
    </HStack>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
