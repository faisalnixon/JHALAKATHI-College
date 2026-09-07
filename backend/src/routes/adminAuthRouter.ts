import { Router } from "express";

import {
  adminLogin,
  adminMe,
  adminLogout,
  changeAdminCredentials,
} from "../controllers/adminAuthController";

import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Login
router.post("/login", adminLogin);

// Check current authentication
router.get("/me", requireAdmin, adminMe);

// Logout
router.post("/logout", requireAdmin, adminLogout);

// Change password
router.patch(
  "/credentials",
  requireAdmin,
  changeAdminCredentials,
);

export default router;
