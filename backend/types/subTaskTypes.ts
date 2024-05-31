import { Document } from "mongoose";

export interface subTasksSchemaType extends Document {
  title: string;
  taskId: string;
  isActive: boolean;
}
