import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

// Designation enum
export const professorDesignationEnum = pgEnum("professor_designation", [
  "Professor",
  "Assistant Professor",
  "Lecturer",
  "Exhibitor",
]);

// Gender enum
export const genderEnum = pgEnum("gender", ["Male", "Female", "Other"]);

// Professors table
export const professors = pgTable("professors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  designation: professorDesignationEnum("designation").notNull(),
  imageUrl: text("image_url"),
  phoneNo: text("phone_no"),
  email: text("email"),
  gender: genderEnum("gender").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Employee table
export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  designation: text("designation"),
  imageUrl: text("image_url"),
  phoneNo: text("phone_no"),
  email: text("email").notNull(),
  gender: genderEnum("gender").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const notices = pgTable("notices", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
