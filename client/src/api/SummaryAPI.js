export const baseURL = import.meta.env.VITE_SERVER_URL;
console.log("BaseURL", baseURL);
export const SummaryAPI = {
  register: {
    url: "/api/auth/register",
    method: "POST",
  },
  login: {
    url: "/api/auth/login",
    method: "POST",
  },
  logout: {
    url: "/api/auth/logout",
    method: "POST",
  },
  createBlog: {
    url: "/api/blogs",
    method: "POST",
  },
  getAllBlogs: {
    url: "/api/blogs/getBlogs",
    method: "GET",
  },
  getAllBlogsById: {
    url: "/api/blogs/:id",
  },
  update: {
    url: "/api/blogs/update/:id",
    method: "PUT",
  },
  delete: {
    url: "/api/blogs/delete/:id",
    method: "DELETE",
  },
  getAuthorBlogs: {
    url: "/api/blogs/getAuthorBlogs",
    method: "GET",
  },
  getLoginDetails: {
    url: "/api/users/me",
    method: "GET",
  },
};
