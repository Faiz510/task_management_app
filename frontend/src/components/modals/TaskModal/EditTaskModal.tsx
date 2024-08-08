import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import OverlayModal from '../OverlayModal';
import AddSubtasks from './AddSubtasks';
import SelectColOpt from '../../SelectColOpt';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  taskById,
  updateTask,
} from '../../../redux/Slice/taskSlice/TaskSliceApi';
import { SubtaskType, TaskType } from '../../Types';
import { getTaskByStatus } from '../../../redux/Slice/taskSlice/TaskByStatus';
import {
  createSubtask,
  updateSubtaskByIds,
} from '../../../redux/Slice/subTask/SubtaskApiSlice';
import { getCurBoard } from '../../../redux/Slice/boardSlice/curBoardSlice';

interface EditTaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ onClose, id }) => {
  const [addSubtask, setAddSubtask] = useState<SubtaskType[]>([]);
  const [selOptVal, setSelOptVal] = useState<string>('');
  const [inputValues, setInputValues] = useState<TaskType>({
    title: '',
    subTasks: [],
    description: '',
    isCompleted: false,
    board: '',
    status: '',
    _id: '',
  });

  const dispatch = useAppDispatch();
  const curTask = useAppSelector((state) => state.TaskSlice.task.task?.task);
  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );

  const onAddSubtaskHanlder = () => {
    const newSubtask: SubtaskType = {
      _id: '',
      isActive: true,
      title: '',
      taskId: curTask ? curTask?._id : '',
    };

    setAddSubtask([...addSubtask, newSubtask]);
  };

  const onChangeInputValHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setInputValues((preval) => ({ ...preval, [id]: value }));
  };

  // fetch task by id
  useEffect(() => {
    if (id) {
      dispatch(taskById(id));
    }
  }, [id]);

  useEffect(() => {
    if (curTask) {
      setInputValues(curTask);
      setSelOptVal(curTask.status);
    }
  }, [curTask]);

  // Update inputValues when selOptVal changes
  useEffect(() => {
    setInputValues((preval) => ({
      ...preval,
      status: selOptVal,
    }));
  }, [selOptVal]);

  useEffect(() => {
    if (curTask) {
      setAddSubtask(curTask.subTasks);
    }
  }, []);

  const addTaskFormData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(updateTask({ id: id, data: inputValues }));
    dispatch(taskById(id));
    if (curBoard) {
      dispatch(getTaskByStatus(curBoard?._id));
    }
    onClose(false);

    // Update subtasks

    // check if its new or already existing subtask
    const newlyAddedSubtask = addSubtask.filter(
      (subtask) => subtask._id === '' && subtask.title !== '',
    );

    if (newlyAddedSubtask.length > 0) {
      const transformedSubtasks: SubtaskType[] = newlyAddedSubtask.map(
        (task) => ({
          title: task.title,
          taskId: curTask?._id || '',
          isActive: true,
          _id: '',
        }),
      );

      const newObj = {
        subtasks: {
          subTask: transformedSubtasks,
        },
      };

      if (curTask) {
        await dispatch(createSubtask({ id: curTask?._id, data: newObj }));
      }
    }

    // update subtask that already exists
    const alreadyExisted = addSubtask.filter(
      (subtask) => subtask._id !== '' && subtask.title !== '',
    );

    await dispatch(updateSubtaskByIds(alreadyExisted));

    await dispatch(taskById(curTask?._id || ''));

    await dispatch(getCurBoard(curBoard?._id || ''));

    await dispatch(getTaskByStatus(curTask?._id || ''));
  };

  return (
    <OverlayModal onClose={onClose}>
      <form className="flex flex-col " onSubmit={addTaskFormData}>
        <h3 className="font-semibold text-lg my-4 ml-3 dark:text-custom-primary_text ">
          Add New Task
        </h3>

        <div className="flex flex-col my-4">
          <label
            htmlFor="title"
            className="text-sm text-custom-secondary_text font-semibold"
          >
            Title
          </label>
          <input
            type="text"
            placeholder="e.g: Backend Task"
            className="w-full focus:outline-custom-button_bg/60 text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            id="title"
            onChange={onChangeInputValHandler}
            defaultValue={inputValues?.title}
          />
        </div>

        <div className="flex flex-col my-4">
          <label
            htmlFor="task_desc"
            className="text-sm text-custom-secondary_text font-semibold"
            id="description"
          >
            Description
          </label>

          <textarea
            name="task_desc"
            rows={2}
            id="description"
            placeholder="Task Desc"
            className="w-full focus:outline-custom-button_bg/60 border-0 text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            onChange={onChangeInputValHandler}
            defaultValue={inputValues?.description}
          />
        </div>

        <AddSubtasks addSubtask={addSubtask} setAddSubtask={setAddSubtask} />

        <button
          type="button"
          className="w-full my-2 py-1 bg-custom-button_hover_bg rounded-full font-medium text-custom-button_bg hover:bg-custom-secondary_text/40 text-center"
          onClick={onAddSubtaskHanlder}
        >
          Add subtasks
        </button>

        <div className="my-4">
          <SelectColOpt setSelOptVal={setSelOptVal} selOptVal={selOptVal} />
        </div>

        <button
          type="submit"
          className="w-full my-2 mb-4 py-1 bg-custom-button_bg rounded-full text-custom-secondary_bg font-medium"
        >
          edit Task
        </button>
      </form>
    </OverlayModal>
  );
};

export default EditTaskModal;
