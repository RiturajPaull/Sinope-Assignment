import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/contextAPI";
import Register from "./Register";

const Navbar = () => {
  const { token, navigate } = useAppContext();
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const handleRegisterPage = () => {
    setShowRegisterPage(true);
  };
  return (
    <div className="relative">
      <div className="max-w-7xl sm:mx-auto px-2 py-4">
        <div className="border border-t-0  border-r-0 border-l-0 border-gray-400 flex items-center justify-between px-3 py-3">
          <h1
            onClick={() => navigate("/")}
            className="text-4xl cursor-pointer sm:text-5xl lg:text-6xl font-bold text-violet-800/90"
          >
            SINOPE
          </h1>
          <div>
            {token ? (
              <div
                onClick={() => navigate("/dashboard")}
                className="border px-10 py-3 sm:px-13 cursor-pointer lg:px-16 bg-violet-800/90 text-white rounded-3xl hover:scale-106 transition:all duration-400"
              >
                <button>Dashboard</button>
              </div>
            ) : (
              <div
                onClick={handleRegisterPage}
                className="border px-10 py-3 sm:px-13 cursor-pointer lg:px-16 bg-violet-800/90 text-white rounded-3xl hover:scale-106 transition:all duration-400"
              >
                <button>Register</button>
              </div>
            )}
          </div>
        </div>
        {showRegisterPage && (
          <Register setShowRegisterPage={setShowRegisterPage} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
