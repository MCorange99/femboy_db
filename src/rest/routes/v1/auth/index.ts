import login from "./login";
import register from "./register";
import express from "express";
const router = express.Router();

router.use("/register", register);
router.use("/login", login);


export default router;