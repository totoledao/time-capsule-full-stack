import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastify_static from "@fastify/static";
import "dotenv/config";
import fastify from "fastify";

import { resolve } from "path";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";
import { uploadRoutes } from "./routes/upload";

const app = fastify();

app.register(multipart);
app.register(fastify_static, {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});
app.register(cors, {
  origin: true, // all urls have access
});
app.register(jwt, {
  secret: "spacetime",
});
app.register(authRoutes);
app.register(memoriesRoutes);
app.register(uploadRoutes);

app
  .listen({
    port: 3333,
    // Needed for mobile access
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP server running on port 3333");
  });
