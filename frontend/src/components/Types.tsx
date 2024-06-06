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
