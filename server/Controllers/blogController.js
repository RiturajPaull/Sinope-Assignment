import { BlogModel } from "../Model/blogModel.js";

export const createBlog = async (req, resp) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return resp.status(400).json({
        message: "All the blog fields are required!!",
        success: false,
      });
    }

    let { userId } = req;
    if (!userId) {
      return resp.status(401).json({
        message: "Unauthorized. Please log in.",
        success: false,
      });
    }

    const blogData = {
      title,
      content,
      author: userId,
    };

    const blog = await BlogModel.create(blogData);
    return resp.status(201).json({
      message: "Blog Created Successfully!!",
      success: true,
      blog,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const allBlog = async (req, resp) => {
  try {
    const blogs = await BlogModel.find().populate("author", "name");
    if (blogs.length === 0) {
      return resp.status(404).json({
        message: "No blogs found!!",
        success: false,
      });
    }

    return resp.status(200).json({
      message: "All Blog Fetched.",
      success: true,
      blogs,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const getBlogById = async (req, resp) => {
  try {
    const { id } = req.params;

    const blog = await BlogModel.findById(id).populate({
      path: "author",
      select: "name -_id",
    });
    if (!blog) {
      return resp.status(400).json({
        message: "No such blogs",
        success: false,
      });
    }

    return resp.status(200).json({
      message: "Blogs fetched",
      success: true,
      blog,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const updateBlog = async (req, resp) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return resp.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    if (blog.author.toString() !== userId) {
      return resp.status(403).json({
        message: "You are not authorized to update this blog",
        success: false,
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    return resp.status(200).json({
      message: "Blog updated!!",
      success: true,
      blog,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const deleteBlog = async (req, resp) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    if (!userId) {
      return resp.status(401).json({
        message: "Unauthorized to delete this post",
        success: false,
      });
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    return resp.status(200).json({
      message: "Deleted Successfully",
      success: true,
      deletedBlog,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};
export const getUserBlogs = async (req, resp) => {
  try {
    const { userId } = req;
    console.log("Response", userId);
    if (!userId) {
      return resp.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const blog = await BlogModel.find({ author: userId });
    return resp.status(200).json({
      message: "Author blogs fetched",
      success: true,
      blog,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};
