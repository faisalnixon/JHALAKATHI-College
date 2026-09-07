import "dotenv/config";
import bcrypt from "bcrypt";
import { db } from "../db";
import { adminUsers } from "../db/schema";

const email = "admin@example.com";
const password = "ChangeThisPassword123!";

async function createAdmin() {
  const passwordHash = await bcrypt.hash(password, 12);

  const [admin] = await db
    .insert(adminUsers)
    .values({
      email,
      passwordHash,
    })
    .returning({
      id: adminUsers.id,
      email: adminUsers.email,
    });

  console.log("Admin created:", admin);

  process.exit(0);
}

createAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
