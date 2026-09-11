import { Router } from "express";

import {
  listAdminProfessors,
  createAdminProfessor,
  updateAdminProfessor,
  deleteAdminProfessor,
} from "../controllers/professorController";

import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Public: website can display professors
router.get("/", listAdminProfessors);

// Everything below requires admin authentication
router.use(requireAdmin);

// Create professor
router.post("/", createAdminProfessor);

// Update professor
router.patch("/:id", updateAdminProfessor);

// Delete professor
router.delete("/:id", deleteAdminProfessor);

export default router;



