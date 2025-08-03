import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/contextAPI";
import { API } from "../api/axios";
import { baseURL, SummaryAPI } from "../api/SummaryAPI";
import axios from "axios";
import toast from "react-hot-toast";
import Update from "../component/Update";

const DelUpdatePage = () => {
  const { id } = useParams();
  const { token, navigate } = useAppContext();
  const [showUpdate, setShowUpdate] = useState(null);
  const [data, setData] = useState({});
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/blogs/${id}`);
      const { data: responseData } = response;
      console.log("Response----", response.data.success);
      if (responseData.success) {
        setData(responseData.blog);
      }
    } catch (error) {
      let err = error.response.data;
      toast.error(err.message);
    }
  };
  console.log(data);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure ??");
    if (!confirm) return;
    try {
      const response = await axios.delete(`${baseURL}/api/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/dashboard");
      }
    } catch (error) {}
  };
  return (
    <div className="relative">
      <h1 className="text-1xl sm:text-3xl md:text-4xl text-violet-800/90 text-center mb-6 font-semibold ">
        Edit Blog
      </h1>
      <div className="rounded-xl bg-gray-300/40 mb-4 flex flex-col item-start gap-4 px-3 py-3">
        <p className="text-center mt-3 text-3xl text-gray-700">{data.title}</p>
        <p className="text-gray-700">{data.content}</p>
        <p className="text-end pr-4">~~~ {data?.author?.name || "Unknown"}</p>
      </div>
      <button
        onClick={() => setShowUpdate(true)}
        className="border mr-4 px-3 py-1 rounded border-green-600 text-green-600 bg-green-200 hover:bg-green-300"
      >
        Update
      </button>
      <button
        onClick={deleteBlog}
        className="border mr-4 px-3 py-1 rounded border-red-600 text-red-600 bg-red-200 hover:bg-red-300"
      >
        Delete
      </button>

      {showUpdate && <Update data={data} setShowUpdate={setShowUpdate} />}
    </div>
  );
};

export default DelUpdatePage;
