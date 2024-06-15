import mongoose, { Schema } from 'mongoose';
import { taskSchemaType } from '../types/taskTypes';

const taskSchema: Schema<taskSchemaType> = new mongoose.Schema({
  userId: String,
  title: { type: String, required: [true, 'title must required'] },
  board: String,
  status: { type: String, required: [true, 'status is requried '] },
  isCompleted: { type: Boolean, default: false },
  description: String,
  subTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubTasks',
    },
  ],
});

taskSchema.pre(/^find/, function (this: taskSchemaType, next) {
  this.populate({
    path: 'subTasks',
    select: '_id title',
  });
  next();
});

const Tasks = mongoose.model('Tasks', taskSchema);

export default Tasks;
