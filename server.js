import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(import('@fastify/jwt'), { secret: process.env.JWT_SECRET });
fastify.decorate('auth', async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});
fastify.register(import('./plugins/db.js'));
fastify.register(import('./routes/auth.js'));
fastify.register(import('./routes/todo.js'));
fastify.register(import('./routes/rbac.js'));
fastify.listen({ port: 3000 });
