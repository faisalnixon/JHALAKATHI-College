import type { Request, Response, NextFunction } from "express";

import { db } from "../db";
import { professors } from "../db/schema";

import { desc, eq } from "drizzle-orm";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              VALIDATION                                    */
/* -------------------------------------------------------------------------- */

const optionalText = z.string().optional().nullable();

const optionalEmail = z
  .union([z.email(), z.literal("")])
  .optional()
  .nullable();

const optionalImageUrl = z
  .union([z.url(), z.literal("")])
  .optional()
  .nullable();

const professorCreate = z.object({
  name: z.string().trim().min(1, "Name is required"),

  designation: z.enum([
    "Professor",
    "Assistant Professor",
    "Lecturer",
    "Demonstrator", // renamed
  ]),

  subject: optionalText, // NEW
  bcsBatch: optionalText, // NEW

  imageUrl: optionalImageUrl,
  phoneNo: optionalText,
  email: optionalEmail,
  gender: z.enum(["Male", "Female", "Other"]),
});

const professorPatch = professorCreate.partial();

const professorIdSchema = z.uuid();

/* -------------------------------------------------------------------------- */
/*                         BUILD UPDATE DATA                                  */
/* -------------------------------------------------------------------------- */

function buildProfessorUpdateSet(body: z.infer<typeof professorPatch>) {
  const data: Partial<typeof professors.$inferInsert> = {};

  if (body.name !== undefined) data.name = body.name;
  if (body.designation !== undefined) data.designation = body.designation;

  if (body.subject !== undefined) {
    data.subject = body.subject || null;
  }

  if (body.bcsBatch !== undefined) {
    data.bcsBatch = body.bcsBatch || null;
  }

  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl || null;
  if (body.phoneNo !== undefined) data.phoneNo = body.phoneNo || null;
  if (body.email !== undefined) data.email = body.email || null;
  if (body.gender !== undefined) data.gender = body.gender;

  return data;
}

/* -------------------------------------------------------------------------- */
/*                         LIST PROFESSORS                                    */
/* -------------------------------------------------------------------------- */

export async function listAdminProfessors(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = await db
      .select()
      .from(professors)
      .orderBy(desc(professors.createdAt));

    res.json({
      professors: rows,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                         CREATE PROFESSOR                                   */
/* -------------------------------------------------------------------------- */

export async function createAdminProfessor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = professorCreate.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid body",
        details: z.treeifyError(parsed.error),
      });

      return;
    }

    const { imageUrl, phoneNo, email, subject, bcsBatch, ...rest } =
      parsed.data;
    const [row] = await db
      .insert(professors)
      .values({
        ...rest,
        subject: subject || null,
        bcsBatch: bcsBatch || null,
        imageUrl: imageUrl || null,
        phoneNo: phoneNo || null,
        email: email || null,
      })
      .returning();

    res.status(201).json({ professor: row });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                         UPDATE PROFESSOR                                   */
/* -------------------------------------------------------------------------- */

export async function updateAdminProfessor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const idResult = professorIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      res.status(400).json({
        error: "Invalid professor ID",
      });

      return;
    }

    const parsed = professorPatch.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid body",
        details: z.treeifyError(parsed.error),
      });

      return;
    }

    const data = buildProfessorUpdateSet(parsed.data);

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        error: "No fields to update",
      });

      return;
    }

    const [row] = await db
      .update(professors)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(professors.id, idResult.data))
      .returning();

    if (!row) {
      res.status(404).json({
        error: "Professor not found",
      });

      return;
    }

    res.json({
      professor: row,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                         DELETE PROFESSOR                                   */
/* -------------------------------------------------------------------------- */

export async function deleteAdminProfessor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const idResult = professorIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      res.status(400).json({
        error: "Invalid professor ID",
      });

      return;
    }

    const [deleted] = await db
      .delete(professors)
      .where(eq(professors.id, idResult.data))
      .returning({
        id: professors.id,
      });

    if (!deleted) {
      res.status(404).json({
        error: "Professor not found",
      });

      return;
    }

    res.json({
      ok: true,
      id: deleted.id,
    });
  } catch (error) {
    next(error);
  }
}

// import type { Request, Response, NextFunction } from "express";

// import { db } from "../db";
// import { professors } from "../db/schema";

// import { desc, eq } from "drizzle-orm";
// import { z } from "zod";

// /* -------------------------------------------------------------------------- */
// /*                              VALIDATION                                    */
// /* -------------------------------------------------------------------------- */

// const optionalText = z.string().optional().nullable();

// const optionalEmail = z
//   .union([z.email(), z.literal("")])
//   .optional()
//   .nullable();

// const optionalImageUrl = z
//   .union([z.url(), z.literal("")])
//   .optional()
//   .nullable();

// const professorCreate = z.object({
//   name: z.string().trim().min(1, "Name is required"),

//   designation: z.enum(["Professor", "Assistant Professor", "Lecturer","Exhibitor",]),

//   imageUrl: optionalImageUrl,

//   phoneNo: optionalText,

//   email: optionalEmail,

//   gender: z.enum(["Male", "Female", "Other"]),
// });

// const professorPatch = professorCreate.partial();

// const professorIdSchema = z.uuid();

// /* -------------------------------------------------------------------------- */
// /*                         BUILD UPDATE DATA                                  */
// /* -------------------------------------------------------------------------- */

// function buildProfessorUpdateSet(body: z.infer<typeof professorPatch>) {
//   const data: Partial<typeof professors.$inferInsert> = {};

//   if (body.name !== undefined) {
//     data.name = body.name;
//   }

//   if (body.designation !== undefined) {
//     data.designation = body.designation;
//   }

//   if (body.imageUrl !== undefined) {
//     data.imageUrl = body.imageUrl || null;
//   }

//   if (body.phoneNo !== undefined) {
//     data.phoneNo = body.phoneNo || null;
//   }

//   if (body.email !== undefined) {
//     data.email = body.email || null;
//   }

//   if (body.gender !== undefined) {
//     data.gender = body.gender;
//   }

//   return data;
// }

// /* -------------------------------------------------------------------------- */
// /*                         LIST PROFESSORS                                    */
// /* -------------------------------------------------------------------------- */

// export async function listAdminProfessors(
//   _req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const rows = await db
//       .select()
//       .from(professors)
//       .orderBy(desc(professors.createdAt));

//     res.json({
//       professors: rows,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                         CREATE PROFESSOR                                   */
// /* -------------------------------------------------------------------------- */

// export async function createAdminProfessor(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const parsed = professorCreate.safeParse(req.body);

//     if (!parsed.success) {
//       res.status(400).json({
//         error: "Invalid body",
//         details: z.treeifyError(parsed.error),
//       });

//       return;
//     }

//     const { imageUrl, phoneNo, email, ...rest } = parsed.data;

//     const [row] = await db
//       .insert(professors)
//       .values({
//         ...rest,
//         imageUrl: imageUrl || null,
//         phoneNo: phoneNo || null,
//         email: email || null,
//       })
//       .returning();

//     res.status(201).json({ professor: row });
//   } catch (error) {
//     next(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                         UPDATE PROFESSOR                                   */
// /* -------------------------------------------------------------------------- */

// export async function updateAdminProfessor(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const idResult = professorIdSchema.safeParse(req.params.id);

//     if (!idResult.success) {
//       res.status(400).json({
//         error: "Invalid professor ID",
//       });

//       return;
//     }

//     const parsed = professorPatch.safeParse(req.body);

//     if (!parsed.success) {
//       res.status(400).json({
//         error: "Invalid body",
//         details: z.treeifyError(parsed.error),
//       });

//       return;
//     }

//     const data = buildProfessorUpdateSet(parsed.data);

//     if (Object.keys(data).length === 0) {
//       res.status(400).json({
//         error: "No fields to update",
//       });

//       return;
//     }

//     const [row] = await db
//       .update(professors)
//       .set({
//         ...data,
//         updatedAt: new Date(),
//       })
//       .where(eq(professors.id, idResult.data))
//       .returning();

//     if (!row) {
//       res.status(404).json({
//         error: "Professor not found",
//       });

//       return;
//     }

//     res.json({
//       professor: row,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                         DELETE PROFESSOR                                   */
// /* -------------------------------------------------------------------------- */

// export async function deleteAdminProfessor(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const idResult = professorIdSchema.safeParse(req.params.id);

//     if (!idResult.success) {
//       res.status(400).json({
//         error: "Invalid professor ID",
//       });

//       return;
//     }

//     const [deleted] = await db
//       .delete(professors)
//       .where(eq(professors.id, idResult.data))
//       .returning({
//         id: professors.id,
//       });

//     if (!deleted) {
//       res.status(404).json({
//         error: "Professor not found",
//       });

//       return;
//     }

//     res.json({
//       ok: true,
//       id: deleted.id,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
