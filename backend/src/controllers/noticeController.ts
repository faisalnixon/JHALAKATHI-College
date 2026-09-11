import type { NextFunction, Request, Response } from "express";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../db";
import { notices } from "../db/schema";

const noticeCreateSchema = z.object({
  content: z.string().trim().min(1, "Notice content is required"),
});

const noticeUpdateSchema = noticeCreateSchema.partial();

function getNoticeId(id: string) {
  return z.uuid().parse(id);
}

/* -------------------------------------------------------------------------- */
/* GET ALL NOTICES                                                            */
/* Public                                                                     */
/* Newest notices first                                                       */
/* -------------------------------------------------------------------------- */

export async function listNotices(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = await db
      .select()
      .from(notices)
      .orderBy(desc(notices.createdAt));

    res.json({
      notices: rows,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/* CREATE NOTICE                                                              */
/* Admin only                                                                 */
/* -------------------------------------------------------------------------- */

export async function createNotice(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = noticeCreateSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid notice data",
        details: z.treeifyError(parsed.error),
      });
      return;
    }

    const [notice] = await db
      .insert(notices)
      .values({
        content: parsed.data.content,
      })
      .returning();

    res.status(201).json({
      notice,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/* UPDATE NOTICE                                                              */
/* Admin only                                                                 */
/* -------------------------------------------------------------------------- */

export async function updateNotice(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const idResult = z.uuid().safeParse(req.params.id);

    if (!idResult.success) {
      res.status(400).json({
        error: "Invalid notice ID",
      });
      return;
    }

    const parsed = noticeUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid notice data",
        details: z.treeifyError(parsed.error),
      });
      return;
    }

    if (Object.keys(parsed.data).length === 0) {
      res.status(400).json({
        error: "No fields to update",
      });
      return;
    }

    const [notice] = await db
      .update(notices)
      .set({
        ...parsed.data,
        updatedAt: new Date(),
      })
      .where(eq(notices.id, idResult.data))
      .returning();

    if (!notice) {
      res.status(404).json({
        error: "Notice not found",
      });
      return;
    }

    res.json({
      notice,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/* DELETE NOTICE                                                              */
/* Admin only                                                                 */
/* -------------------------------------------------------------------------- */

export async function deleteNotice(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const idResult = z.uuid().safeParse(req.params.id);

    if (!idResult.success) {
      res.status(400).json({
        error: "Invalid notice ID",
      });
      return;
    }

    const [notice] = await db
      .delete(notices)
      .where(eq(notices.id, idResult.data))
      .returning({
        id: notices.id,
      });

    if (!notice) {
      res.status(404).json({
        error: "Notice not found",
      });
      return;
    }

    res.json({
      ok: true,
      id: notice.id,
    });
  } catch (error) {
    next(error);
  }
}
