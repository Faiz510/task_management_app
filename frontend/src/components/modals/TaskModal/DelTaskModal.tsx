import React, { FormEvent } from 'react';
import OverlayModal from '../OverlayModal';

interface DelTaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const DelTaskModal: React.FC<DelTaskModalProps> = ({ onClose }) => {
  const submitDelBoard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('form added ');
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

export default DelTaskModal;
