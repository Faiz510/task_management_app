import React, { ChangeEvent, FormEvent, useState } from 'react';
import OverlayModal from '../OverlayModal';
import AddColumns from './AddColumns';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  clearError,
  createBoard,
} from '../../../redux/Slice/boardSlice/BoardSlice';
import { BoardType } from '../../Types';

interface AddBoardModalProp {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBoardModal: React.FC<AddBoardModalProp> = ({ onClose }) => {
  const [defaultCol, setDefaultCol] = useState<string[]>([
    'Todo',
    'Doing',
    'Done',
  ]);
  const dispatch = useAppDispatch();
  const addBoardError = useAppSelector((state) => state.board.error);
  const boardData = useAppSelector((state) => state?.board?.Board);

  const onAddNewColumn = () => {
    const newColumns = [...defaultCol, ''];
    setDefaultCol(newColumns);
    setInputVal((prevInputVal) => ({
      ...prevInputVal,
      columns: newColumns,
    }));
  };

  const [inputVal, setInputVal] = useState<BoardType>({
    columns: [...defaultCol],
    description: '',
    title: '',
    userId: '',
    tasks: [],
    _id: '',
  });

  const onChangeValHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setInputVal((prevInputVal) => ({
      ...prevInputVal,
      [id]: value,
    }));
  };

  const handlerClearError = () => {
    dispatch(clearError());
    onClose(false);
  };

  const submitBoardForm = async (e: FormEvent) => {
    e.preventDefault();

    // remove empty empty values
    const newVal = defaultCol.filter((val) => val !== '');
    setDefaultCol(newVal);
    const formData = {
      ...inputVal,
      columns: newVal,
    };
    setInputVal(formData);

    ////////////////////////////
    const res = await dispatch(createBoard(inputVal));

    if (res && addBoardError !== '') {
      handlerClearError();
    }
  };

  return (
    <OverlayModal onClose={handlerClearError}>
      <form className="flex flex-col" onSubmit={submitBoardForm}>
        <h3 className="font-semibold text-lg my-4 ml-3 dark:text-custom-primary_text">
          Add New Board
        </h3>

        <div className="flex flex-col my-4">
          <label
            htmlFor="board"
            className="text-sm text-custom-secondary_text font-semibold"
          >
            Board name
          </label>
          <input
            type="text"
            placeholder="e.g: Backend Task"
            id="title"
            className="w-full focus:outline-custom-button_bg/60 text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            onChange={onChangeValHandler}
          />
        </div>

        <div className="flex flex-col my-4">
          <label
            htmlFor="task_desc"
            className="text-sm text-custom-secondary_text font-semibold "
            id="description"
          >
            Description
          </label>

          <textarea
            name="task_desc"
            rows={2}
            placeholder="Board Description"
            id="description"
            className="w-full focus:outline-custom-button_bg/60 border-0 text-base p-1 font-light mx-auto dark:bg-custom-dark_secondary_bg dark:text-custom-primary_bg focus-within:outline-none"
            onChange={onChangeValHandler}
          />
        </div>

        <AddColumns
          setDefaultCol={setDefaultCol}
          defaultCol={defaultCol}
          setInputVal={setInputVal}
        />

        <button
          type="button"
          className="w-full my-2 py-1 bg-custom-button_hover_bg rounded-full font-medium text-custom-button_bg hover:bg-custom-secondary_text/40"
          onClick={onAddNewColumn}
        >
          Add New Column
        </button>

        <button
          type="submit"
          className="w-full my-2 mb-4 py-1 bg-custom-button_bg rounded-full text-custom-secondary_bg font-medium"
        >
          Add Board
        </button>

        {addBoardError && (
          <div className="text-red-500 my-2 -tracking-tighter text-center">
            {addBoardError}
          </div>
        )}
      </form>
    </OverlayModal>
  );
};

export default AddBoardModal;
