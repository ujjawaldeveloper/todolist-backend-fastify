import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Todo", todoSchema);
