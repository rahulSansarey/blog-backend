import { Blog } from "../models/blogModels.js";
import cloudinary from "cloudinary";

export const blogCreate = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Ensure imageUrl exists before accessing mimetype
    if (!req.files || !req.files.imageUrl) {
      return res.status(400).json({ message: "Please upload an Image" });
    }

    const { imageUrl } = req.files;

    // Check file type
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(imageUrl.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only png, jpeg, and webp formats are supported" });
    }

    if (!title) {
      return res.status(404).json({ message: "Please fill title" });
    }
    if (!description) {
      return res.status(404).json({ message: "Please fill description" });
    }

    
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      imageUrl.tempFilePath
    );

    // Check for upload errors
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown cloudinary error"
      );
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }

   
    const blog = await Blog.create({
      title,
      description,
      imageUrl: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    return res.status(200).json({ message: "Blog Created", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const getSavedBlog = await Blog.find();

    // If no blogs are found
    if (!getSavedBlog || getSavedBlog.length === 0) {
      return res.status(404).json({
        message: "No blogs found",
      });
    }

    // If blogs are found, then return it
    return res.status(200).json({
      message: "Blogs retrieved successfully",
      blogs: getSavedBlog,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update blog fields if provided
    blog.title = title || blog.title;
    blog.description = description || blog.description;

    // If image update is required
    if (req.files && req.files.imageUrl) {
      const { imageUrl } = req.files;
      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageUrl.tempFilePath
      );

      blog.imageUrl = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }


    await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

  
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await cloudinary.uploader.destroy(blog.imageUrl.public_id);

    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
