import { assets } from '../assets/assets';
const NavBar = () => {
  return (
    <div className="absolute top-0 flex w-full items-center justify-between p-4 sm:p-6 sm:px-24">
      <img src={assets.logo} className="w-28 sm:w-32" />
      <button className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-500 px-6 py-2 text-gray-800 transition-all hover:bg-gray-100">
        Login <img src={assets.arrow_icon} />
      </button>
    </div>
  );
};

export default NavBar;
