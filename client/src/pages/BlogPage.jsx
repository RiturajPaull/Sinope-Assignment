import React, { useEffect } from "react";
import { useAppContext } from "../context/contextAPI";
import { API } from "../api/axios";
import { baseURL, SummaryAPI } from "../api/SummaryAPI";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BlogPage = () => {
  const { singleBlogData, setSingleBlogData, blogData } = useAppContext();
  const { id } = useParams();

  const fetchSingleBlogs = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/blogs/${id}`);
      console.log("Response", response.data.blog);
      const { data: responseData } = response;
      if (responseData.success) {
        setSingleBlogData(responseData.blog);
      }
    } catch (error) {
      let err = error.response.data;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchSingleBlogs();
  }, [blogData, id]);
  console.log("Blog is page", singleBlogData);
  return (
    <div className="mt-10 max-w-7xl sm:mx-auto px-2 py-4">
      <p className=" text-violet-800/90 text-2xl font-semibold sm:text-3xl md:text-5xl text-center py-6 mb-10">
        Fetching Single blog by ID
      </p>
      <h1 className="text-xl font-semibold sm:text-2xl md:text-4xl mb-4 text-gray-600 text-center py-4">
        {singleBlogData.title}
      </h1>
      <p className="text-gray-800 min-md:text-xl text-center py-2 mb-4">
        {singleBlogData.content}
      </p>
      <p className="font-semibold text-center">
        Author {singleBlogData?.author?.name || "Unknown"}
      </p>
    </div>
  );
};

export default BlogPage;
