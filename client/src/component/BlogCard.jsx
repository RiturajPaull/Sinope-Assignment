import React, { useState } from "react";
import { useAppContext } from "../context/contextAPI";

const BlogCard = ({ blog, index }) => {
  const { navigate } = useAppContext();

  return (
    <div
      key={index}
      className="shadow-lg bg-white/90 rounded-2xl hover:scale-102 transition-all duration-400 cursor-pointer px-8 py-10 flex flex-col gap-3 items-center justify-center"
    >
      <div className="flex text-gray-600 items-center justify-center gap-3 text-xl font-semibold">
        <h1>{blog.title}</h1>
      </div>
      <p className="text-sm text-gray-600">
        {blog.content.slice(0, 60)}.......
      </p>
      <button
        onClick={() => navigate(`/blog/${blog._id}`)}
        className="text-gray-600 px-4 mt-6 py-2 hover:scale-106 transition-all bg-gray-300 rounded cursor-pointer"
      >
        Fetch Blog By ID
      </button>
    </div>
  );
};

export default BlogCard;
