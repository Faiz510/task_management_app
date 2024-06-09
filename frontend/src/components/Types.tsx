interface SubtaskType {
  title: string;
  taskId: string;
  isActive: boolean;
}

interface TaskType {
  title: string;
  board: string;
  status: string;
  isCompleted: boolean;
  description: string;
  subTasks: SubtaskType[];
}

interface BoardType {
  userId: string;
  title: string;
  description: string;
  columns: string[];
  tasks: TaskType[];
}

///Autu ////////////

interface RegisterUserType {
  username: string;
  email: string;
  password: string;
  conformPassword: string;
}

interface SigninUserType {
  email: string;
  password: string;
}
