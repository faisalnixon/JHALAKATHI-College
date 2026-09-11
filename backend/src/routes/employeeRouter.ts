import { Router } from "express";

import {
  listAdminEmployees,
  createAdminEmployee,
  updateAdminEmployee,
  deleteAdminEmployee,
} from "../controllers/employeeController";

import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

/* Public GET */
router.get("/", listAdminEmployees);

/* Everything below requires admin authentication */
router.use(requireAdmin);

/* Create employee */
router.post("/", createAdminEmployee);

/* Update employee */
router.patch("/:id", updateAdminEmployee);

/* Delete employee */
router.delete("/:id", deleteAdminEmployee);

export default router;