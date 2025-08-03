import React, { useState } from "react";
import { useAppContext } from "../context/contextAPI";
import { API } from "../api/axios";
import { SummaryAPI } from "../api/SummaryAPI";
import toast from "react-hot-toast";

const CreateBlogPage = () => {
  const { token } = useAppContext();
  const [createBlogData, setCreateBlogData] = useState({
    title: "",
    content: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCreateBlogData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API({
        ...SummaryAPI.createBlog,
        data: createBlogData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response", response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setCreateBlogData({
          title: "",
          content: "",
        });
      }
    } catch (error) {
      let err = error.response.data;
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h1 className="text-3xl mb-10 md:text-3xl lg:text-5xl text-violet-800/96 font-semibold text-center">
        Create Your Blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4  items-center px-3 py-6"
      >
        <div>
          <input
            name="title"
            value={createBlogData.title}
            onChange={handleInput}
            placeholder="Title"
            className="border rounded-lg text-gray-600 border-gray-400 w-md px-4 py-4 outline-none"
          />
        </div>
        <div>
          <textarea
            name="content"
            value={createBlogData.content}
            onChange={handleInput}
            placeholder="content"
            className="border text-gray-600 w-md px-4 py-4 outline-none h-60  rounded-lg border-gray-400"
          />
        </div>
        <button
          type="submit"
          className="border w-113 py-3 bg-violet-800 text-white rounded-full hover:bg-violet-900"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
