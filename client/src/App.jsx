import React, { useEffect } from "react";
import Navbar from "./component/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import BlogPage from "./pages/BlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import InfoPage from "./pages/InfoPage";
import PostsPage from "./pages/PostsPage";
import DelUpdatePage from "./pages/DelUpdatePage";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<CreateBlogPage />} />
          <Route path="info" element={<InfoPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path=":id" element={<DelUpdatePage />} />
        </Route>
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
