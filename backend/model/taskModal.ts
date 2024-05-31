import mongoose, { Schema } from "mongoose";
import { taskSchemaType } from "../types/taskTypes";

const taskSchema: Schema<taskSchemaType> = new mongoose.Schema({
  userId: String,
  title: { type: String, required: [true, "title must required"] },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Boards" },
  status: String,
  isCompleted: { type: Boolean, default: false },
  subTasks: [
    {
      title: { type: String, required: [true, "title must required"] },
      isActive: { type: Boolean, default: false },
    },
  ],
});

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;
