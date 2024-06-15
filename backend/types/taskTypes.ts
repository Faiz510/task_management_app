import mongoose, { Document, Types } from 'mongoose';

export interface taskSchemaType extends Document {
  title: string;
  isCompleted: boolean;
  status: string;
  userId: string;
  board: string;
  description: string;
  subTasks: mongoose.Schema.Types.ObjectId[];
}
