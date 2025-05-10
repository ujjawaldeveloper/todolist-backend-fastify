import User from '../models/User.js';

export default async function (fastify) {
  fastify.post('/signup', async (req, reply) => {
    const user = await User.create(req.body);
    const token = fastify.jwt.sign({ id: user._id, role: user.role });
    reply.send({ token });
  });
  fastify.post('/login', async (req, reply) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password)))
      return reply.code(401).send({ error: 'Invalid credentials' });

    const token = fastify.jwt.sign({ id: user._id, role: user.role });
    reply.send({ token });
  });
}
