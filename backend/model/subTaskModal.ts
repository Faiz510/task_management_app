import mongoose, { Schema } from "mongoose";
import { subTasksSchemaType } from "../types/subTaskTypes";

const subTaskSchema: Schema<subTasksSchemaType> = new mongoose.Schema({
  title: { type: String, required: [true, "title must required"] },
  taskId: String,
  isActive: { type: Boolean, default: false },
});

const SubTasks = mongoose.model("SubTasks", subTaskSchema);

export default SubTasks;
