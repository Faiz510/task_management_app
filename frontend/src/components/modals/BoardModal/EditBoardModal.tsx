import React, { ChangeEvent, FormEvent, useState } from 'react';
import OverlayModal from '../OverlayModal';
import AddColumns from './AddColumns';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  EditBoard,
  clearError,
} from '../../../redux/Slice/boardSlice/BoardSlice';
import { BoardType } from '../../Types';
import { getCurBoard } from '../../../redux/Slice/boardSlice/curBoardSlice';

interface EditBoardModalProp {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBoardModal: React.FC<EditBoardModalProp> = ({ onClose }) => {
  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );

  const [defaultCol, setDefaultCol] = useState<string[]>(
    curBoard ? curBoard?.columns : [],
  );

  const dispatch = useAppDispatch();
  const editBoardError = useAppSelector((state) => state.board.error);

  const onAddNewColumn = () => {
    const newColumns = [...defaultCol, ''];
    setDefaultCol(newColumns);
    setInputVal((prevInputVal) =>
      prevInputVal
        ? {
            ...prevInputVal,
            columns: newColumns,
          }
        : null,
    );
  };

  const [inputVal, setInputVal] = useState<BoardType | null>(
    curBoard
      ? {
          columns: [...defaultCol],
          description: curBoard?.description,
          title: curBoard?.title,
          userId: curBoard?.userId,
          tasks: curBoard?.tasks,
          _id: curBoard?._id,
        }
      : null,
  );

  const onChangeValHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setInputVal((prevInputVal) =>
      prevInputVal
        ? {
            ...prevInputVal,
            [id]: value,
          }
        : null,
    );
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
    const formData = inputVal
      ? {
          ...inputVal,
          columns: newVal,
        }
      : null;
    setInputVal(formData);

    ////////////////////////////
    const res = await dispatch(
      EditBoard({ id: curBoard?._id || '', data: formData || null }),
    );

    console.log(res);

    dispatch(getCurBoard(curBoard?._id || ''));

    if (res.type === 'board/edit/fulfilled') {
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
            defaultValue={inputVal?.title}
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
            defaultValue={inputVal?.description}
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
          Edit Board
        </button>

        {editBoardError && (
          <div className="text-red-500 my-2 -tracking-tighter text-center">
            {editBoardError}
          </div>
        )}
      </form>
    </OverlayModal>
  );
};

export default EditBoardModal;
