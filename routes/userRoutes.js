import express from "express";
import { login, logout, register } from "../controllers/usercontroller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);




// router.route("/register").post(register);

export default router;
