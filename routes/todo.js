import Todo from '../models/Todo.js';

export default async function (fastify) {
  fastify.addHook('onRequest', fastify.auth);
  fastify.post('/todos', async (req) => {
    return await Todo.create({ ...req.body, user: req.user.id });
  });
  fastify.get('/todos', async (req) => {
    return await Todo.find({ user: req.user.id });
  });
  fastify.put('/todos/:id', async (req) => {
    return await Todo.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  });
  fastify.delete('/todos/:id', async (req) => {
    return await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  });
}
