import mongoose, { Schema } from 'mongoose';

interface SubTasksSchemaType extends Document {
  title: string;
  taskId: string;
  isActive: boolean;
}

const subTaskSchema: Schema<SubTasksSchemaType> = new mongoose.Schema({
  title: { type: String, required: [true, 'title must required'] },
  taskId: { type: String, required: true },
  isActive: { type: Boolean, default: false },
});

const subTasksSchema: Schema = new mongoose.Schema({
  subTask: [subTaskSchema],
});

const SubTasks = mongoose.model<SubTasksSchemaType>('SubTasks', subTaskSchema);

export default SubTasks;
