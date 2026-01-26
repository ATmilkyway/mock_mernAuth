import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(backendURL + '/api/auth/is-auth');
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      axios.defaults.withCredentials = true;
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

  useEffect(() => {
    getAuthState();
  }, []);

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
