import React, { ChangeEvent } from 'react';
import { FaXmark } from 'react-icons/fa6';

interface AddSubtasksProps {
  addSubtask: string[];
  setAddSubtask: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddSubtasks: React.FC<AddSubtasksProps> = ({
  addSubtask,
  setAddSubtask,
}) => {
  const removeTasksHandler = (index: number) => {
    const newSubtasksArr = addSubtask.filter((_, i) => i !== index);
    setAddSubtask(newSubtasksArr);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    addSubtask[index] = e.target.value;
  };

  return (
    <div className={`max-h-24 overflow-auto`}>
      {addSubtask.map((col, i) => (
        <div
          className="flex gap-2 justify-between items-center px-4 my-2"
          key={i}
        >
          <input
            type="text"
            defaultValue={col}
            className="w-full text-base focus:outline-custom-button_bg/60 focus:outline-1 p-1 dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            placeholder="new Subtask"
            onChange={(e) => handleOnChange(e, i)}
            id={col}
          />
          <span
            className="text-custom-secondary_text text-2xl cursor-pointer"
            onClick={() => removeTasksHandler(i)}
          >
            <FaXmark />
          </span>
        </div>
      ))}
    </div>
  );
};

export default AddSubtasks;
