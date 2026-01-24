import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="mt-20 flex flex-col items-center px-4 text-center text-gray-800">
      <img src={assets.header_img} className="mb-6 h-36 w-36 rounded-full" />
      <h1 className="mb-2 flex items-center gap-2 text-xl font-medium sm:text-3xl">
        Hey Developer
        <img src={assets.hand_wave} className="aspect-square w-8" />
      </h1>
      <h2 className="mb-4 text-3xl font-semibold sm:text-5xl">Wellcome to our app</h2>
      <p className="mb-8 max-w-md">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, dolores natus.
      </p>
      <button className="cursor-pointer rounded-full border border-gray-500 px-8 py-2.5 transition-all hover:bg-gray-100">
        Get started
      </button>
    </div>
  );
};

export default Header;
