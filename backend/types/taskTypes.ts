import mongoose, { Document, Types } from "mongoose";

export interface taskSchemaType extends Document {
  title: string;
  isCompleted: boolean;
  status: string;
  userId: string;
  board: mongoose.Schema.Types.ObjectId;
  subTasks: mongoose.Schema.Types.ObjectId[];
}
