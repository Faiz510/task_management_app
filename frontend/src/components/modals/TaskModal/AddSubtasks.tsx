import React, { ChangeEvent } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { SubtaskType } from '../../Types';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  deleteSubtask,
  getSubtaskById,
} from '../../../redux/Slice/subTask/SubtaskApiSlice';
import { getCurBoard } from '../../../redux/Slice/boardSlice/curBoardSlice';

interface AddSubtasksProps {
  addSubtask: SubtaskType[];
  setAddSubtask: React.Dispatch<React.SetStateAction<SubtaskType[]>>;
}

const AddSubtasks: React.FC<AddSubtasksProps> = ({
  addSubtask,
  setAddSubtask,
}) => {
  const dispatch = useAppDispatch();
  const curTask = useAppSelector(
    (state) => state.TaskSlice.task.task?.task._id,
  );
  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );

  const removeTasksHandler = async (index: number, id: string) => {
    const newSubtasksArr = addSubtask.filter((_, i) => i !== index);
    setAddSubtask(newSubtasksArr);

    if (id) {
      await dispatch(deleteSubtask(id));
      await dispatch(getSubtaskById(curTask || ''));
      await dispatch(getCurBoard(curBoard?._id || ''));
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newSubtasksArr = [...addSubtask];
    newSubtasksArr[index] = { ...newSubtasksArr[index], title: e.target.value };
    setAddSubtask(newSubtasksArr);
  };

  return (
    <div className={`max-h-24 overflow-auto`}>
      {addSubtask.map((col, i) => (
        <div
          className="flex gap-2 justify-between items-center px-4 my-2"
          key={col._id || i}
        >
          <input
            type="text"
            value={col.title}
            // defaultValue={col.title}
            className="w-full text-base focus:outline-custom-button_bg/60 focus:outline-1 p-1 dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            placeholder="new Subtask"
            onChange={(e) => handleOnChange(e, i)}
            id={col._id}
          />
          <span
            className="text-custom-secondary_text text-2xl cursor-pointer"
            onClick={() => removeTasksHandler(i, col._id || '')}
          >
            <FaXmark />
          </span>
        </div>
      ))}
    </div>
  );
};

export default AddSubtasks;
