import fp from "fastify-plugin";
import mongoose from "mongoose";
export default fp(async (fastify) => {
  await mongoose.connect(process.env.MONGO_URI);
});
