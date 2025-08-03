import React, { useState } from "react";
import { useAppContext } from "../context/contextAPI";
import axios from "axios";
import { baseURL } from "../api/SummaryAPI";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Update = ({ data, setShowUpdate }) => {
  const [newTitle, setNewTitle] = useState(data.title || "");
  const [newContent, setNewContent] = useState(data.content || "");
  const { token, navigate } = useAppContext();
  const { id } = useParams();

  const updateBlog = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    try {
      const response = await axios.put(
        `${baseURL}/api/blogs/update/${id}`,
        {
          title: newTitle,
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update", response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        navigate(-1);
      }
    } catch (error) {}
  };
  return (
    <div className="absolute top-0 left-0 w-full h-[490px] backdrop-blur-sm z-1 flex items-center justify-center bg-black/20">
      <div className="shadow-lg rounded-2xl bg-white w-3xl px-3 py-6">
        <h1
          onClick={() => setShowUpdate(false)}
          className="border inline-block px-2 border-red-500 text-red-500 bg-red-100 hover:bg-red-200 cursor-pointer text-center rounded-full"
        >
          X
        </h1>
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl text-violet-800">
          Update
        </h1>
        <form onSubmit={updateBlog} className="flex flex-col py-4 px-6 gap-6">
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="title"
            className="border mt-4  px-3 py-2 rounded-2xl outline-none border-gray-400 text-gray-700"
          />
          <textarea
            type="text"
            name="content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="content"
            className="border mt-2 h-[120px]  px-3 py-2 rounded-2xl outline-none border-gray-400 text-gray-700"
          />
          <button
            type="submit"
            className="border w-[140px] mx-auto py-2 rounded-3xl bg-violet-700/90 cursor-pointer hover:bg-violet-800 text-white"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
