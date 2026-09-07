import { z } from "zod";

// .coerce.number() means it will convert the string to a number if it's a string

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),


  //   FRONTEND_URL: z.string().url(),
  FRONTEND_URL: z.url(),

  JWT_SECRET: z.string().min(32),

  FACEBOOK_PAGE_ID: z.string().min(1),

  FACEBOOK_PAGE_ACCESS_TOKEN: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    // console.error(parsed.error.flatten().fieldErrors);
    const errors = z.treeifyError(parsed.error);
    console.error(errors);

    throw new Error("Invalid environment variables");

  }

  return parsed.data;
}

let cachedEnv: Env | null = null;

export function getEnv() {
  if (!cachedEnv) {
    cachedEnv = loadEnv();
  }

  return cachedEnv;
}
