import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { adminUsers } from "../db/schema";
import { getEnv } from "../lib/env";

const env = getEnv();

export type AdminJwtPayload = {
  adminId: string;
  email: string;
};

/* -------------------------------------------------------------------------- */
/*                              COOKIE OPTIONS                                */
/* -------------------------------------------------------------------------- */

function getCookieOptions() {
  const isProduction = env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    path: "/",
  };
}

/* -------------------------------------------------------------------------- */
/*                              LOGIN                                         */
/* -------------------------------------------------------------------------- */

export async function adminLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    const password =
      typeof req.body?.password === "string"
        ? req.body.password
        : "";

    if (!email || !password) {
      res.status(400).json({
        error: "Email and password are required",
      });
      return;
    }

    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    if (!admin) {
      res.status(401).json({
        error: "Invalid email or password",
      });
      return;
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      res.status(401).json({
        error: "Invalid email or password",
      });
      return;
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
      } satisfies AdminJwtPayload,
      env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    res.cookie(
      "admin_token",
      token,
      {
        ...getCookieOptions(),
        maxAge: 8 * 60 * 60 * 1000,
      },
    );

    res.json({
      ok: true,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                              CURRENT ADMIN                                 */
/* -------------------------------------------------------------------------- */

export async function adminMe(
  req: Request,
  res: Response,
) {
  if (!req.admin) {
    res.status(401).json({
      error: "Authentication required",
    });
    return;
  }

  res.json({
    admin: {
      id: req.admin.adminId,
      email: req.admin.email,
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                              LOGOUT                                        */
/* -------------------------------------------------------------------------- */

export async function adminLogout(
  _req: Request,
  res: Response,
) {
  res.clearCookie(
    "admin_token",
    getCookieOptions(),
  );

  res.json({
    ok: true,
  });
}

/* -------------------------------------------------------------------------- */
/*                       CHANGE EMAIL + PASSWORD                              */
/* -------------------------------------------------------------------------- */

export async function changeAdminCredentials(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.admin) {
      res.status(401).json({
        error: "Authentication required",
      });
      return;
    }

    const currentPassword =
      typeof req.body?.currentPassword === "string"
        ? req.body.currentPassword
        : "";

    const newEmail =
      typeof req.body?.newEmail === "string"
        ? req.body.newEmail.trim().toLowerCase()
        : "";

    const newPassword =
      typeof req.body?.newPassword === "string"
        ? req.body.newPassword
        : "";

    if (!currentPassword || !newEmail || !newPassword) {
      res.status(400).json({
        error:
          "Current password, new email and new password are required",
      });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        error: "New password must contain at least 8 characters",
      });
      return;
    }

    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, req.admin.adminId))
      .limit(1);

    if (!admin) {
      res.status(404).json({
        error: "Admin account not found",
      });
      return;
    }

    const currentPasswordMatches = await bcrypt.compare(
      currentPassword,
      admin.passwordHash,
    );

    if (!currentPasswordMatches) {
      res.status(401).json({
        error: "Current password is incorrect",
      });
      return;
    }

    if (newEmail !== admin.email) {
      const [existingAdmin] = await db
        .select({
          id: adminUsers.id,
        })
        .from(adminUsers)
        .where(eq(adminUsers.email, newEmail))
        .limit(1);

      if (existingAdmin && existingAdmin.id !== admin.id) {
        res.status(409).json({
          error: "That email address is already in use",
        });
        return;
      }
    }

    const passwordHash = await bcrypt.hash(
      newPassword,
      12,
    );

    const [updatedAdmin] = await db
      .update(adminUsers)
      .set({
        email: newEmail,
        passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, admin.id))
      .returning({
        id: adminUsers.id,
        email: adminUsers.email,
      });

    // Force a fresh login after credentials change.
    res.clearCookie(
      "admin_token",
      getCookieOptions(),
    );

    res.json({
      ok: true,
      admin: updatedAdmin,
    });
  } catch (error) {
    next(error);
  }
}











// import type { Request, Response, NextFunction } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { eq } from "drizzle-orm";
// import { z } from "zod";

// import { db } from "../db";
// import { adminUsers } from "../db/schema";
// import { getEnv } from "../lib/env";

// const env = getEnv();

// const loginSchema = z.object({
//   email: z.email(),
//   password: z.string().min(1),
// });

// const changeAdminCredentialsSchema = z.object({
//   currentPassword: z.string().min(1),

//   newEmail: z.email().transform((email) => email.toLowerCase().trim()),

//   newPassword: z.string().min(8),
// });

// export async function adminLogin(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const parsed = loginSchema.safeParse(req.body);

//     if (!parsed.success) {
//       res.status(400).json({
//         error: "Invalid email or password",
//       });
//       return;
//     }

//     const { email, password } = parsed.data;

//     const [admin] = await db
//       .select()
//       .from(adminUsers)
//       .where(eq(adminUsers.email, email.toLowerCase()))
//       .limit(1);

//     if (!admin) {
//       res.status(401).json({
//         error: "Invalid email or password",
//       });
//       return;
//     }

//     const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

//     if (!passwordMatches) {
//       res.status(401).json({
//         error: "Invalid email or password",
//       });
//       return;
//     }

//     const token = jwt.sign(
//       {
//         adminId: admin.id,
//         email: admin.email,
//       },
//       env.JWT_SECRET,
//       {
//         expiresIn: "30m",
//       },
//     );

//     res.cookie("admin_token", token, {
//       httpOnly: true,
//       secure: env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 30 * 60 * 1000,
//       path: "/",
//     });

//     res.json({
//       ok: true,
//       admin: {
//         id: admin.id,
//         email: admin.email,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function adminMe(req: Request, res: Response) {
//   res.json({
//     admin: {
//       id: req.admin!.adminId,
//       email: req.admin!.email,
//     },
//   });
// }

// export async function adminLogout(_req: Request, res: Response) {
//   res.clearCookie("admin_token", {
//     httpOnly: true,
//     secure: env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//   });

//   res.json({
//     ok: true,
//   });
// }

// export async function changeAdminCredentials(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const parsed = changeAdminCredentialsSchema.safeParse(req.body);

//     if (!parsed.success) {
//       res.status(400).json({
//         error: "Invalid email or password data",
//       });
//       return;
//     }

//     const { currentPassword, newEmail, newPassword } = parsed.data;

//     // Find the currently authenticated admin
//     const [admin] = await db
//       .select()
//       .from(adminUsers)
//       .where(eq(adminUsers.id, req.admin!.adminId))
//       .limit(1);

//     if (!admin) {
//       res.status(401).json({
//         error: "Admin not found",
//       });
//       return;
//     }

//     // Verify current password
//     const currentPasswordMatches = await bcrypt.compare(
//       currentPassword,
//       admin.passwordHash,
//     );

//     if (!currentPasswordMatches) {
//       res.status(400).json({
//         error: "Current password is incorrect",
//       });
//       return;
//     }

//     // Check whether the new email is already being used
//     const [existingAdmin] = await db
//       .select({
//         id: adminUsers.id,
//       })
//       .from(adminUsers)
//       .where(eq(adminUsers.email, newEmail))
//       .limit(1);

//     if (existingAdmin && existingAdmin.id !== admin.id) {
//       res.status(409).json({
//         error: "This email is already in use",
//       });
//       return;
//     }

//     // Hash the new password
//     const newPasswordHash = await bcrypt.hash(newPassword, 12);

//     // Update email + password
//     await db
//       .update(adminUsers)
//       .set({
//         email: newEmail,
//         passwordHash: newPasswordHash,
//         updatedAt: new Date(),
//       })
//       .where(eq(adminUsers.id, admin.id));

//     // Force login again after credentials change
//     res.clearCookie("admin_token", {
//       httpOnly: true,
//       secure: env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });

//     res.json({
//       ok: true,
//       message: "Email and password changed successfully. Please login again.",
//     });
//   } catch (error) {
//     next(error);
//   }
// }
