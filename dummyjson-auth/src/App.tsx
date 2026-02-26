import { Route, Routes } from "react-router-dom";
 import AppLayout from "./layouts/AppLayout";
import { Login } from "./pages/Login";

export const Profile = () => <div>Profile</div>;
export const Settings = () => <div>Settings</div>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
