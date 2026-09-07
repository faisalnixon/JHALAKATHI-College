import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import { getEnv } from "../lib/env";

const env = getEnv();

export type AdminJwtPayload = {
  adminId: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      admin?: AdminJwtPayload;
    }
  }
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.admin_token;

    if (!token) {
      res.status(401).json({
        error: "Authentication required",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET,
    );

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.adminId !== "string" ||
      typeof decoded.email !== "string"
    ) {
      res.status(401).json({
        error: "Invalid authentication token",
      });
      return;
    }

    req.admin = {
      adminId: decoded.adminId,
      email: decoded.email,
    };

    next();
  } catch {
    res.status(401).json({
      error: "Invalid or expired authentication",
    });
  }
}








// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { getEnv } from "../lib/env";

// const env = getEnv();

// export type AdminJwtPayload = {
//   adminId: string;
//   email: string;
// };

// declare global {
//   namespace Express {
//     interface Request {
//       admin?: AdminJwtPayload;
//     }
//   }
// }

// export function requireAdmin(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const token = req.cookies?.admin_token;

//     if (!token) {
//       res.status(401).json({
//         error: "Authentication required",
//       });
//       return;
//     }

//     const decoded = jwt.verify(
//       token,
//       env.JWT_SECRET,
//     ) as AdminJwtPayload;

//     req.admin = decoded;

//     next();
//   } catch {
//     res.status(401).json({
//       error: "Invalid or expired authentication",
//     });
//   }
// }