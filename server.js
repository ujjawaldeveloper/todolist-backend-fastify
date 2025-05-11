import Fastify from "fastify";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const fastify = Fastify({ logger: true });

// JWT plugin registration
fastify.register(jwt, { secret: process.env.JWT_SECRET });

// JWT authentication decorator
fastify.decorate("auth", async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" });
  }
});

// Plugin registrations
fastify.register(import("./plugins/db.js"));
fastify.register(import("./routes/auth.js"));
fastify.register(import("./routes/todo.js"));
fastify.register(import("./routes/rbac.js"));

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
