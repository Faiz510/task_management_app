export interface SubtaskType {
  _id?: string;
  title: string;
  taskId: string;
  isActive: boolean;
}
export interface SubtaskRequest {
  subTask: SubtaskType[];
}

export interface SubtaskReqObj {
  subtasks: SubtaskRequest;
}

export interface createSubtaskThankType {
  id?: string;
  data: SubtaskRequest;
}

//////////////////////

export interface TaskType {
  _id: string;
  title: string;
  board: string;
  status: string;
  isCompleted: boolean;
  description: string;
  subTasks: SubtaskType[];
}

export interface BoardType {
  _id: string;
  userId: string;
  title: string;
  description: string;
  columns: string[];
  tasks: TaskType[];
}

///////////////
export interface BoardTypeApiResponse {
  status?: string;
  boards: BoardType[];
}

export interface curBoardApiResponse {
  status?: string;
  board: BoardType;
}

export interface TaskApiResponse {
  status?: string;
  task: TaskType;
}

export interface SubtaskApiResponse {
  status?: string;
  subtask: SubtaskType;
}

///Autu ////////////

export interface RegisterUserType {
  username: string;
  email: string;
  password: string;
  conformPassword: string;
}

export interface SigninUserType {
  email: string;
  password: string;
}
