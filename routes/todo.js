import Todo from "../models/Todo.js";

export default async function (fastify) {
  // Apply authentication to all routes
  fastify.addHook("onRequest", fastify.auth);

  // Create a new todo
  fastify.post("/todos", async (req, reply) => {
    try {
      if (!req.body.text) {
        return reply.code(400).send({ error: "Todo text is required" });
      }
      
      const todo = await Todo.create({ 
        text: req.body.text,
        completed: req.body.completed || false,
        user: req.user.id 
      });
      
      return reply.code(201).send(todo);
    } catch (err) {
      return reply.code(500).send({ error: err.message });
    }
  });

  // Get all todos for current user
  fastify.get("/todos", async (req, reply) => {
    try {
      const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
      return reply.send(todos);
    } catch (err) {
      return reply.code(500).send({ error: err.message });
    }
  });

  // Update a todo
  fastify.put("/todos/:id", async (req, reply) => {
    try {
      if (!req.params.id) {
        return reply.code(400).send({ error: "Todo ID is required" });
      }
      
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!todo) {
        return reply.code(404).send({ error: "Todo not found" });
      }
      
      return reply.send(todo);
    } catch (err) {
      return reply.code(500).send({ error: err.message });
    }
  });

  // Delete a todo
  fastify.delete("/todos/:id", async (req, reply) => {
    try {
      if (!req.params.id) {
        return reply.code(400).send({ error: "Todo ID is required" });
      }
      
      const todo = await Todo.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
      
      if (!todo) {
        return reply.code(404).send({ error: "Todo not found" });
      }
      
      return reply.code(200).send({ message: "Todo deleted successfully" });
    } catch (err) {
      return reply.code(500).send({ error: err.message });
    }
  });
}
