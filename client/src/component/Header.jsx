import React from "react";
import { assets } from "../assets/assets";
const Header = () => {
  return (
    <div className=" relative max-w-7xl sm:mx-auto px-2 py-4 text-center">
      <div>
        <p className="border mt-10 max-w-[300px] mx-auto border-violet-600 rounded-full text-violet-600/90 bg-violet-800/10 mb-8 py-1">
          Blog App by Sinope
        </p>
        <p className="text-5xl font-semibold text-gray-600">
          Your own <span className="text-violet-800">Blogging</span>
          <br /> Platform
        </p>
        <p className=" mt-6 text-gray-600 px-10 text-center max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam,
          assumenda.
          <br />
        </p>
      </div>
      <img
        src={assets.gradientBg}
        className="absolute -top-0 -z-1 opacity-90"
      />
    </div>
  );
};

export default Header;
