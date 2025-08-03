import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { API } from "../api/axios";
import { SummaryAPI } from "../api/SummaryAPI";
import toast from "react-hot-toast";
import { useAppContext } from "../context/contextAPI";

const Dashboard = () => {
  const { setToken, navigate, setUser } = useAppContext();
  const logout = async () => {
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    try {
      const response = await API({
        ...SummaryAPI.logout,
      });
      console.log(response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setToken(null);
        localStorage.removeItem("Token");
        setUser(false);
        navigate("/");
      }
    } catch (error) {
      let err = error.response.data;
      toast.error(err.message);
    }
  };
  return (
    <div>
      <div className="max-w-7xl sm:mx-auto mx-3 px-3 py-3 ">
        <h1 className="bg-gray-300/60 mb-10 border-gray-300 rounded-lg relative border px-3 py-4 flex items-center justify-start gap-8">
          <p
            onClick={logout}
            className=" px-3 py-1 rounded border-red-600  bg-red-200/30 border-2 text-red-700 cursor-pointer"
          >
            Logout
          </p>
          <NavLink
            end={true}
            to="info"
            className="px-6 py-1 rounded border-violet-600 border-2 text-violet-700"
          >
            Info
          </NavLink>
          <NavLink
            end={true}
            to="posts"
            className="px-4 py-1 rounded border-violet-600 border-2 text-violet-700"
          >
            All Posts
          </NavLink>
          <NavLink
            end={true}
            to=""
            className="px-4 py-1 rounded border-violet-600 border-2 text-violet-700"
          >
            Create Blog
          </NavLink>
        </h1>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
