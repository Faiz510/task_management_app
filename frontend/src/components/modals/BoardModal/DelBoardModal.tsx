import React, { FormEvent } from 'react';
import OverlayModal from '../OverlayModal';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  deleteBoard,
  getBoard,
} from '../../../redux/Slice/boardSlice/BoardSlice';
import {
  clearState,
  getCurBoard,
} from '../../../redux/Slice/boardSlice/curBoardSlice';

interface DelBoardModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const DelBoardModal: React.FC<DelBoardModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );

  const boardData = useAppSelector((state) => state?.board?.Board);
  // const boardData = useAppSelector((state) => state.board.Board)

  const submitDelBoard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose(false);
    if (curBoard) {
      dispatch(deleteBoard(curBoard?._id));
    }

    dispatch(clearState());
    // console.log(boardData);
    const id = boardData.boards[0]._id || boardData.boards[1]._id;
    dispatch(getCurBoard(id));
  };
  return (
    <OverlayModal onClose={onClose}>
      <form className="flex flex-col" onSubmit={submitDelBoard}>
        <h3 className="font-semibold text-lg my-4 ml-3 text-red-500">
          Delete Board ?
        </h3>

        <p className="text-custom-secondary_text text-sm tracking-wide">
          Are you sure you want to delete the name board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>

        <div className="flex gap-4 my-6">
          <button className="bg-red-500 text-custom-primary_bg rounded-full w-full py-2 hover:opacity-70">
            Delete
          </button>
          <button className="bg-custom-secondary_bg hover:bg-custom-secondary_text/50 text-custom-button_bg rounded-full w-full py-2 opacity-70">
            Cancel
          </button>
        </div>
      </form>
    </OverlayModal>
  );
};

export default DelBoardModal;
