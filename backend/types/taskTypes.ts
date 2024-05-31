import mongoose, { Document, Types } from "mongoose";

export interface subTasks {
  title: string;
  isActive: boolean;
}

export interface taskSchemaType extends Document {
  title: string;
  isCompleted: boolean;
  status: string;
  userId: string;
  board: mongoose.Schema.Types.ObjectId;
  subTasks: subTasks[];
}
