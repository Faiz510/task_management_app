import { Document, Schema } from 'mongoose';

// export interface subTasksSchemaType extends Document {
//   title: string;
//   taskId: Schema.Types.ObjectId;
//   isActive: boolean;
//   // subTask: subTaskObj[];
// }

// export interface subTaskObj extends Document {
//   title: string;
//   taskId: string;
//   isActive: boolean;
// }

// Define the subtask type
export interface SubTaskType {
  _id: string;
  title: string;
  taskId: string;
  isActive: boolean;
}

// Define the request body type for creating subtasks
export interface CreateSubTasksRequest {
  subtasks: {
    subTask: SubTaskType[];
  };
}
