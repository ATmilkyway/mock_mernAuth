import { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
const NavBar = () => {
  const navigate = useNavigate();
  const { backendURL, userData, setUserData, setIsLoggedIn } = useContext(AppContext);

  return (
    <div className="absolute top-0 flex w-full items-center justify-between p-4 sm:p-6 sm:px-24">
      <img src={assets.logo} className="w-28 sm:w-32" />
      {userData ? (
        <div className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
          {userData.name[0].toUpperCase()}
          <div className="absolute top-0 right-0 z-10 hidden rounded pt-10 text-black group-hover:block">
            <ul className="m-0 list-none bg-gray-100 p-2 wrap-normal">
              {!userData.isAccountVerified && (
                <li className="cursor-pointer px-2 py-1 hover:bg-gray-200">Verify Email</li>
              )}
              <li className="cursor-pointer px-2 py-1 pr-16 hover:bg-gray-200">Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-500 px-6 py-2 text-gray-800 transition-all hover:bg-gray-100"
          onClick={() => navigate('/login')}
        >
          Login <img src={assets.arrow_icon} />
        </button>
      )}
    </div>
  );
};

export default NavBar;
