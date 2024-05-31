import { Document, Types } from "mongoose";

export interface boardSchemaType extends Document {
  userId: string;
  title: string;
  description: string;
  columns: string[];
  tasks: Types.ObjectId;
}
