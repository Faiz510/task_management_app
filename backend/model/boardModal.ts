import mongoose, { Schema } from "mongoose";
import { boardSchemaType } from "../types/boardTypes";

const boardSchema: Schema<boardSchemaType> = new mongoose.Schema({
  userId: String,
  title: { type: String, required: [true, "title must require"] },
  description: String,
  columns: [{ type: String, required: [true, "status is required"] }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
});

boardSchema.pre(/^find/, function (this: boardSchemaType, next) {
  this.populate({
    path: "tasks",
  });
  next();
});

const Boards = mongoose.model("Boards", boardSchema);

export default Boards;
