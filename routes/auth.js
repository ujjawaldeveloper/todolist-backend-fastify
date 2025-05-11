import User from "../models/User.js";

export default async function (fastify) {
  fastify.post("/signup", async (req, reply) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return reply.code(400).send({ error: "Username already exists" });
      }
      
      // Create new user
      const user = await User.create(req.body);
      
      // Generate token
      const token = fastify.jwt.sign({ 
        id: user._id, 
        role: user.role 
      });
      
      reply.code(201).send({ 
        message: "User created successfully",
        token 
      });
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  fastify.post("/login", async (req, reply) => {
    try {
      // Validate request body
      if (!req.body.username || !req.body.password) {
        return reply.code(400).send({ error: "Username and password required" });
      }
      
      // Find user
      const user = await User.findOne({ username: req.body.username });
      if (!user || !(await user.comparePassword(req.body.password))) {
        return reply.code(401).send({ error: "Invalid credentials" });
      }

      // Generate token
      const token = fastify.jwt.sign({ 
        id: user._id, 
        role: user.role 
      });
      
      reply.send({ 
        message: "Login successful",
        token 
      });
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });
}
