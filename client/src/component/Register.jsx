import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/contextAPI";
import { API } from "../api/axios";
import { SummaryAPI } from "../api/SummaryAPI";
import toast from "react-hot-toast";
import axios from "axios";
const Register = ({ setShowRegisterPage }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const [login, setLogin] = useState(false);
  const { registerData, setRegisterData, setToken, setUser, setLoginDetails } =
    useAppContext();

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login) {
      // Register Part
      try {
        const response = await API({
          ...SummaryAPI.register,
          data: registerData,
        });
        console.log(response);
        const { data: responseData } = response;
        if (responseData.success) {
          toast.success(responseData.message);
          setRegisterData({
            name: "",
            email: "",
            password: "",
          });
          setLogin(true);
        }
      } catch (error) {
        let err = error.response.data;
        toast.error(err.message);
      }
    } else {
      //Login Part
      try {
        const response = await API({
          ...SummaryAPI.login,
          data: {
            email: registerData.email,
            password: registerData.password,
          },
        });
        console.log(response);
        const { data: responseData } = response;
        if (responseData.success) {
          toast.success(responseData.message);
          setToken(responseData.token);
          localStorage.setItem("Token", responseData.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${responseData.token}`;
          setShowRegisterPage(false);
          setUser(true);
          setLoginDetails({
            name: responseData.user.name,
            email: responseData.user.email,
          });
        }
      } catch (error) {
        let err = error.response.data;
        toast.error(err.message);
      }
    }
  };
  console.log("Register data", registerData);
  return (
    <div className="absolute w-full flex items-center justify-center h-screen top-0 left-0 right-0 bottom-0 z-1 backdrop-blur-sm bg-black/40 ">
      <div className="shadow-md rounded flex flex-col gap-6 bg-white max-sm:mx-10 px-3 py-7 w-xl">
        <h1
          onClick={() => setShowRegisterPage(false)}
          className="ml-4 border inline-block w-7 h-7 border-red-600 text-red-600 bg-red-100 text-center rounded-full cursor-pointer"
        >
          x
        </h1>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold">
          {login ? "Login" : "Register"}{" "}
          <span className="text-violet-800">Page</span>
        </h1>
        {login ? (
          <p className="text-center text-gray-600">
            Enter your credentials to access the admin panel
          </p>
        ) : (
          <p className="text-center  text-gray-600">
            Enter your credentials to get registered
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center gap-6 px-4 py-3"
        >
          {!login && (
            <input
              name="name"
              value={registerData.name}
              onChange={handleInputData}
              type="text"
              placeholder="Name"
              className="border w-full px-2 py-3 outline-none border-gray-400 border-t-0 border-l-0 border-r-0"
            />
          )}

          <input
            name="email"
            value={registerData.email}
            onChange={handleInputData}
            type="email"
            placeholder="Enter email"
            className="border w-full px-2 py-3 outline-none border-gray-400 border-t-0 border-l-0 border-r-0"
          />
          <input
            name="password"
            value={registerData.password}
            onChange={handleInputData}
            type="password"
            placeholder="Enter password"
            className="border w-full px-2 py-3 outline-none border-gray-400 border-t-0 border-l-0 border-r-0"
          />
          {login ? (
            <p className="mt-4">
              Don't have an account?{" "}
              <span
                className="text-red-700 cursor-pointer"
                onClick={() => setLogin(false)}
              >
                Register
              </span>
            </p>
          ) : (
            <p className="mt-4">
              Already Registered?{" "}
              <span
                className="text-red-700 cursor-pointer"
                onClick={() => setLogin(true)}
              >
                Login
              </span>
            </p>
          )}
          {login ? (
            <button
              type="submit"
              className="border w-full py-3 bg-violet-800 text-white hover:bg-violet-900"
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
              className="border w-full py-3 bg-violet-800 text-white hover:bg-violet-900"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
