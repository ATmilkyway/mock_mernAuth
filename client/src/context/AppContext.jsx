import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/data');
      if (data.success) {
        setUserData(data.user); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching user data');
    }
  };

  const value = {
    backendURL,
    isLoggedIn,
    userData,
    setUserData,
    setIsLoggedIn,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
