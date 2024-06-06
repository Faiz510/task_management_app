import React, { ChangeEvent, FormEvent, useState } from 'react';
import OverlayModal from '../OverlayModal';
import AddSubtasks from './AddSubtasks';
import Board from '../../../data.json';
import Select, { ActionMeta, SingleValue, StylesConfig } from 'react-select';

interface AddTaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionType {
  value: string;
  label: string;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    minHeight: '30px',
    maxHeight: '40px',
    backgroundColor: state.isSelected ? '#635fc7' : 'white',
    color: state.isSelected ? 'white' : 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected ? '' : '#F4F7FD',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    minHeight: '30px',
    maxHeight: '40px',
    backgroundColor: 'white',
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '150px',
    overflow: 'auto',
  }),
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose }) => {
  const [addSubtask, setAddSubtask] = useState<string[]>([]);
  const [curBoard, setCurBoard] = useState(Board.boards[0]);
  const [isSelected, setIsSelected] = useState<OptionType | null>(null);
  const [inputValues, setInputValues] = useState<TaskType>({
    title: '',
    subTasks: [],
    description: '',
    isCompleted: false,
    board: '',
    status: '',
  });

  const onAddSubtaskHanlder = () => setAddSubtask([...addSubtask, '']);

  const opt = curBoard.columns.map((board) => ({
    value: board.name,
    label: board.name,
  }));

  const changeSelectValHandler = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
  ) => {
    setIsSelected(newValue);
  };

  const onChangeInputValHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    if (isSelected?.value === undefined) return;

    setInputValues({
      ...inputValues,
      [id]: value,
      status: isSelected?.value,
    });
  };

  const addTaskFormData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValues);
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
            className="w-full focus:outline-custom-button_bg/60 text-base p-1 font-light mx-auto"
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
            className="w-full focus:outline-custom-button_bg/60 border-0 text-base p-1 font-light mx-auto"
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

        <Select
          styles={customStyles}
          options={opt}
          defaultValue={opt[0] || ''}
          onChange={changeSelectValHandler}
        />

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

export default AddTaskModal;
