import React, { useEffect } from "react";
import { blog_data } from "../assets/assets";
import { useAppContext } from "../context/contextAPI";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const { blogData } = useAppContext();

  return (
    <div className="mt-10 max-w-7xl sm:mx-auto px-2 py-4 text-center mb-20">
      <h1 className="text-4xl mb-6 py-4 font-semibold text-violet-800/90">
        Blogs
      </h1>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 py-4 gap-10">
        {blogData.map((blog, index) => (
          <BlogCard blog={blog} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
