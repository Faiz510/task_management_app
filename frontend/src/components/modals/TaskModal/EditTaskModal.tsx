import React, { ChangeEvent, FormEvent, useState } from 'react';
import OverlayModal from '../OverlayModal';
import AddSubtasks from './AddSubtasks';
import Board from '../../../data.json';
import SelectColOpt from '../../SelectColOpt';

interface EditTaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ onClose }) => {
  const [addSubtask, setAddSubtask] = useState<string[]>([]);
  const [curBoard, setCurBoard] = useState(Board.boards[0]);
  const [inputValues, setInputValues] = useState<TaskType>({
    title: '',
    subTasks: [],
    description: '',
    isCompleted: false,
    board: '',
    status: '',
  });

  const onAddSubtaskHanlder = () => setAddSubtask([...addSubtask, '']);

  const onChangeInputValHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    setInputValues({
      ...inputValues,
      [id]: value,
    });
  };

  const addTaskFormData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValues);
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
            defaultValue={inputValues.title}
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
            placeholder="Task Desc"
            className="w-full focus:outline-custom-button_bg/60 border-0 text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
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
          <SelectColOpt />
        </div>

        <button
          type="submit"
          className="w-full my-2 mb-4 py-1 bg-custom-button_bg rounded-full text-custom-secondary_bg font-medium"
        >
          Add Task
        </button>
      </form>
    </OverlayModal>
  );
};

export default EditTaskModal;
