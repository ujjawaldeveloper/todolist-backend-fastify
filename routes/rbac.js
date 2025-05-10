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
      const users = await import("../models/User.js").then((mod) =>
        mod.default.find()
      );
      return users;
    }
  );
}
