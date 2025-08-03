import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/contextAPI";
import { API } from "../api/axios";
import { SummaryAPI } from "../api/SummaryAPI";
import { NavLink, Outlet } from "react-router-dom";

const PostsPage = () => {
  const { token } = useAppContext();
  const [authorBlogs, setAuthorBlogs] = useState([]);

  const fetchAuthorBlogs = async () => {
    try {
      const response = await API({
        ...SummaryAPI.getAuthorBlogs,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Author blogs", response);
      const { data: responseData } = response;
      if (responseData.success) {
        setAuthorBlogs(responseData.blog);
      }
    } catch (error) {
      let err = err.response.data;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAuthorBlogs();
  }, []);
  console.log(authorBlogs);
  return (
    <div className="">
      <h1 className=" p-6 text-center text-xl sm:text-2xl md:text-4xl font-semibold text-violet-800/90">
        {authorBlogs.length > 0 ? "Author Blogs" : "No Blogs Found"}
      </h1>
      <div className="border border-gray-400 rounded-3xl flex flex-col items-start gap-4 px-4 py-2">
        {authorBlogs.map((blog, index) => (
          <div
            key={index}
            className="border border-t-0 border-r-0 border-l-0 border-gray-500 w-full flex items-center justify-between px-4 py-6"
          >
            <h1 className="text-gray-800">{blog.title}</h1>
            <div className=" flex w-xs items-center justify-around py-4">
              <NavLink
                end={true}
                to={`/dashboard/${blog._id}`}
                className="border px-8 py-1 rounded-lg border-gray-600 text-gray-800 bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Edit
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
