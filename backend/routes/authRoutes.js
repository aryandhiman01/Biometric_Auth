import express from "express";
import {
  registerOptions,
  verifyRegisterController,
  loginOptions,
  verifyLoginController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register-options", registerOptions);
router.post("/verify-register", verifyRegisterController);
router.post("/login-options", loginOptions);
router.post("/verify-login", verifyLoginController);

export default router;