import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(async (fastify) => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    fastify.log.info(`MongoDB connected: ${db.connection.host}`);
  } catch (err) {
    fastify.log.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
});
