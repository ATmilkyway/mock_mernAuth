 import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const {} = useAuth()
  return <Outlet />;
};

export default AppLayout;
