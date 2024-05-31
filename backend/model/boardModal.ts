import mongoose, { Schema } from "mongoose";
import { boardSchemaType } from "../types/boardTypes";

const boardSchema: Schema<boardSchemaType> = new mongoose.Schema({
  userId: String,
  title: { type: String, required: [true, "title must require"] },
  description: String,
  columns: [{ type: String }],
  tasks: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks" },
});

const Boards = mongoose.model("Boards", boardSchema);

export default Boards;
