import type { Request, Response, NextFunction } from "express";

import { db } from "../db";
import { employees } from "../db/schema";

import { desc, eq } from "drizzle-orm";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              VALIDATION                                    */
/* -------------------------------------------------------------------------- */

const optionalText = z.string().optional().nullable();

const optionalImageUrl = z
  .union([z.url(), z.literal("")])
  .optional()
  .nullable();

const employeeCreate = z.object({
  name: z.string().trim().min(1, "Name is required."),

  designation: optionalText,

  bcsBatch: optionalText, // NEW

  imageUrl: optionalImageUrl,

  phoneNo: optionalText,

  email: z
    .union([z.email("Please enter a valid email address."), z.literal("")])
    .optional()
    .nullable(), // CHANGED - now optional like professors' email

  gender: z.enum(["Male", "Female", "Other"]),
});

const employeePatch = employeeCreate.partial();

const employeeIdSchema = z.uuid();

/* -------------------------------------------------------------------------- */
/*                         BUILD UPDATE DATA                                  */
/* -------------------------------------------------------------------------- */
function buildEmployeeUpdateSet(body: z.infer<typeof employeePatch>) {
  const data: Partial<typeof employees.$inferInsert> = {};

  if (body.name !== undefined) {
    data.name = body.name;
  }

  if (body.designation !== undefined) {
    data.designation = body.designation || null;
  }

  if (body.bcsBatch !== undefined) {
    data.bcsBatch = body.bcsBatch || null;
  }

  if (body.imageUrl !== undefined) {
    data.imageUrl = body.imageUrl || null;
  }

  if (body.phoneNo !== undefined) {
    data.phoneNo = body.phoneNo || null;
  }

  if (body.email !== undefined) {
    data.email = body.email || null;
  }

  if (body.gender !== undefined) {
    data.gender = body.gender;
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                           LIST EMPLOYEES                                   */
/* -------------------------------------------------------------------------- */

export async function listAdminEmployees(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = await db
      .select()
      .from(employees)
      .orderBy(desc(employees.createdAt));

    res.json({
      employees: rows,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                           CREATE EMPLOYEE                                  */
/* -------------------------------------------------------------------------- */

export async function createAdminEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = employeeCreate.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid body",
        details: z.treeifyError(parsed.error),
      });

      return;
    }

    const { designation, bcsBatch, imageUrl, phoneNo, email, ...rest } =
      parsed.data;

    const [row] = await db
      .insert(employees)
      .values({
        ...rest,
        designation: designation || null,
        bcsBatch: bcsBatch || null,
        imageUrl: imageUrl || null,
        phoneNo: phoneNo || null,
        email: email || null,
      })
      .returning();
      
    res.status(201).json({
      employee: row,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                           UPDATE EMPLOYEE                                  */
/* -------------------------------------------------------------------------- */

export async function updateAdminEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const idResult = employeeIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      res.status(400).json({
        error: "Invalid employee ID",
      });

      return;
    }

    const parsed = employeePatch.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid body",
        details: z.treeifyError(parsed.error),
      });

      return;
    }

    const data = buildEmployeeUpdateSet(parsed.data);

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        error: "No fields to update",
      });

      return;
    }

    const [row] = await db
      .update(employees)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(employees.id, idResult.data))
      .returning();

    if (!row) {
      res.status(404).json({
        error: "Employee not found",
      });

      return;
    }

    res.json({
      employee: row,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                           DELETE EMPLOYEE                                  */
/* -------------------------------------------------------------------------- */

export async function deleteAdminEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const idResult = employeeIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      res.status(400).json({
        error: "Invalid employee ID",
      });

      return;
    }

    const [existing] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, idResult.data))
      .limit(1);

    if (!existing) {
      res.status(404).json({
        error: "Employee not found",
      });

      return;
    }

    await db.delete(employees).where(eq(employees.id, idResult.data));

    res.json({
      ok: true,
      id: idResult.data,
    });
  } catch (error) {
    next(error);
  }
}
