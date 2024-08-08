import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import OverlayModal from '../OverlayModal';
import AddSubtasks from './AddSubtasks';
import SelectColOpt from '../../SelectColOpt';
import { SubtaskReqObj, SubtaskType, TaskType } from '../../Types';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  createTask,
  taskById,
} from '../../../redux/Slice/taskSlice/TaskSliceApi';
import { clearTaskError } from '../../../redux/Slice/taskSlice/TaskSlice';

import {
  createSubtask,
  getSubtask,
} from '../../../redux/Slice/subTask/SubtaskApiSlice';

interface AddTaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose }) => {
  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );
  const addTaskError = useAppSelector((state) => state?.TaskSlice?.error);
  const [addSubtask, setAddSubtask] = useState<SubtaskType[]>([]);
  const [selOptionVal, setSelOptionVal] = useState<string>('');
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

  const onAddSubtaskHanlder = () => {
    const newSubtask: SubtaskType = {
      _id: '',
      isActive: true,
      title: '',
      taskId: '',
    };

    setAddSubtask([...addSubtask, newSubtask]);
  };

  const onChangeInputValHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    setInputValues((preVals) => ({
      ...preVals,
      [id]: value,
      status: selOptionVal,
      board: curBoard?._id || '',
    }));
  };

  useEffect(() => {
    setInputValues((prevVals) => ({
      ...prevVals,
      status: selOptionVal,
      board: curBoard?._id || '',
    }));
  }, [selOptionVal, curBoard]);

  const addTaskFormData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(createTask(inputValues));

    // console.log(res);

    if (createTask.fulfilled.match(res) && addTaskError === '') {
      onClose(false);
      dispatch(clearTaskError());

      const resTaskId = res?.payload?.task?._id;

      // Adding subtask

      const transformedSubtasks: SubtaskType[] = addSubtask.map((task) => ({
        title: task.title,
        taskId: resTaskId,
        isActive: true,
      }));

      const newObj: SubtaskReqObj = {
        subtasks: {
          subTask: transformedSubtasks,
        },
      };

      await dispatch(createSubtask({ id: resTaskId, data: newObj }));
      await dispatch(taskById(resTaskId));
      await dispatch(getSubtask(resTaskId));
    }
  };

  return (
    <OverlayModal onClose={onClose}>
      <form className="flex flex-col " onSubmit={addTaskFormData}>
        <h3 className="font-semibold text-lg my-4 ml-3 dark:text-custom-primary_text">
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
            className="w-full focus:outline-custom-button_bg text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg bottom-0 focus-within:outline-none"
            id="title"
            onChange={onChangeInputValHandler}
            defaultValue={inputValues.title}
          />
        </div>

        <div className="flex flex-col my-4">
          <label
            htmlFor="task_desc"
            className="text-sm text-custom-secondary_text font-semibold "
          >
            Description
          </label>

          <textarea
            name="task_desc"
            rows={2}
            placeholder="Task Desc"
            id="description"
            className="w-full focus:outline-custom-button_bg/60 border-0 text-base p-1 font-light mx-auto dark:bg-custom-dark_secondary_bg dark:text-custom-primary_bg focus-within:outline-none"
            onChange={onChangeInputValHandler}
            defaultValue={inputValues.description}
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
          <SelectColOpt
            setSelOptVal={setSelOptionVal}
            selOptVal={selOptionVal}
          />
        </div>

        <button
          type="submit"
          className="w-full my-2 mb-4 py-1 bg-custom-button_bg rounded-full text-custom-secondary_bg font-medium"
        >
          Add Task
        </button>

        {addTaskError && (
          <div className="text-red-500 my-2">{addTaskError}</div>
        )}
      </form>
    </OverlayModal>
  );
};

export default AddTaskModal;
