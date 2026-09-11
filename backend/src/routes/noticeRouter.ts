import { Router } from "express";

import {
  listNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController";

import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

/* Public */
router.get("/", listNotices);

/* Everything below requires admin authentication */
router.use(requireAdmin);

/* Admin CRUD */
router.post("/", createNotice);
router.patch("/:id", updateNotice);
router.delete("/:id", deleteNotice);

export default router;
