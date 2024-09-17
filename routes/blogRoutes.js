import express from "express";
const router = express.Router();
import {
  blogCreate,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsController.js";

router.post("/createblog", blogCreate);
router.get("/getblog", getBlog);
router.put("/updateblogs/:id", updateBlog);
router.delete("/deleteblogs/:id", deleteBlog);

export default router;
