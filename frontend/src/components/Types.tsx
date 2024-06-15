export interface SubtaskType {
  title: string;
  taskId: string;
  isActive: boolean;
}

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
