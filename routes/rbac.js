import User from "../models/User.js";

export default async function (fastify) {
  fastify.get(
    "/admin/users",
    {
      preHandler: [
        fastify.auth,
        async (req, reply) => {
          if (req.user.role !== "admin")
            return reply.code(403).send({ error: "Forbidden" });
        },
      ],
    },
    async () => {
      const users = await User.find();
      return users;
    }
  );
}
