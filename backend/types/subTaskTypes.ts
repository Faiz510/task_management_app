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
