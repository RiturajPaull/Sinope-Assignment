import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../api/axios";
import { SummaryAPI } from "../api/SummaryAPI";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loginDetails, setLoginDetails] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [token, setToken] = useState(null);
  const [singleBlogData, setSingleBlogData] = useState({});
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchBlogs = async () => {
    // setBlogData(blog_data);
    try {
      const response = await API({
        ...SummaryAPI.getAllBlogs,
      });
      console.log(response);
      const { data: responseData } = response;
      if (responseData.success) {
        setBlogData(responseData.blogs);
      }
    } catch (error) {
      let err = error.response.data;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("Token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);
  // console.log("Blogs---", blogData);
  useEffect(() => {
    console.log("Blogs state changed", blogData);
  }, [blogData]);

  const value = {
    user,
    setUser,
    navigate,
    blogData,
    setBlogData,
    registerData,
    setRegisterData,
    token,
    setToken,
    singleBlogData,
    setSingleBlogData,
    loginDetails,
    setLoginDetails,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
