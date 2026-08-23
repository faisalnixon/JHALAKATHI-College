import express from "express";
import cors from "cors";
import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

const app = express();
app.use(express.json());
app.use(cors());

const publicDir = path.join(process.cwd(), "public");
//cwd is current working directory &
// "public" is the folder where the static files are located .. "public" folder is created by vite build command in the frontend project

if (fs.existsSync(publicDir)) {
  //existsSync means check if the public folder exists or not
  app.use(express.static(publicDir)); // this middleware is used to serve the static files from the public folder

  app.get("/{*any}", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      //req.method === "GET" is when the user is trying to access a page in the browser
      //req.method === "HEAD" is when the user is trying to get the headers of the response, not the body of the response
      next();
      return;
    }

    if (req.path.startsWith("/api/") || req.path.startsWith("/webhooks/")) {
      next();
      return;
    }

    res.sendFile(path.join(publicDir, "index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
