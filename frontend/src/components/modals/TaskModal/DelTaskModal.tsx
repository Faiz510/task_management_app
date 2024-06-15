import React, { FormEvent, useEffect } from 'react';
import OverlayModal from '../OverlayModal';
import { deleteTask } from '../../../redux/Slice/taskSlice/TaskSliceApi';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getTaskByStatus } from '../../../redux/Slice/taskSlice/TaskByStatus';

interface DelTaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const DelTaskModal: React.FC<DelTaskModalProps> = ({
  onClose,
  id,
  setShowTaskModal,
}) => {
  const dispatch = useAppDispatch();
  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );

  const submitDelBoard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowTaskModal(false);
    onClose(false);
    await dispatch(deleteTask(id));
    if (curBoard) {
      dispatch(getTaskByStatus(curBoard?._id));
    }
  };

  useEffect(() => {
    if (curBoard) {
      dispatch(getTaskByStatus(curBoard?._id));
    }
  }, [onClose]);

  const onCancelDelModalHandler = () => {
    onClose(false);
  };
  return (
    <OverlayModal onClose={onClose}>
      <form className="flex flex-col" onSubmit={submitDelBoard}>
        <h3 className="font-semibold text-lg my-4 ml-3 text-red-500">
          Delete Task ?
        </h3>

        <p className="text-custom-secondary_text text-sm tracking-wide">
          Are you sure you want to delete the Add account management endpoints
          task and its subtasks? This action cannot be reversed
        </p>

        <div className="flex gap-4 my-6">
          <button
            type="submit"
            className="bg-red-500 text-custom-primary_bg rounded-full w-full py-2 hover:opacity-70"
          >
            Delete
          </button>
          <button
            type="button"
            className="bg-custom-secondary_bg hover:bg-custom-secondary_text/50 text-custom-button_bg rounded-full w-full py-2 opacity-70"
            onClick={onCancelDelModalHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </OverlayModal>
  );
};

export default DelTaskModal;
