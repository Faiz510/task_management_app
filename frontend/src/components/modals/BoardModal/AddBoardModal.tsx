import React, { useState } from 'react';
import OverlayModal from '../OverlayModal';
import AddColumns from './AddColumns';

interface AddBoardModalProp {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBoardModal: React.FC<AddBoardModalProp> = ({ onClose }) => {
  const [defaultCol, setDefaultCol] = useState<string[]>([
    'Todo',
    'Doing',
    'Done',
  ]);

  const onAddNewColumn = () => setDefaultCol([...defaultCol, '']);

  return (
    <OverlayModal onClose={onClose} key={'overlay'}>
      <form className="flex flex-col">
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
            className="w-full focus:outline-custom-button_bg/60 text-base p-1 font-light mx-auto"
          />
        </div>

        <AddColumns setDefaultCol={setDefaultCol} defaultCol={defaultCol} />

        <button
          type="button"
          className="w-full my-2 py-1 bg-custom-button_hover_bg rounded-full font-medium text-custom-button_bg hover:bg-custom-secondary_text/40"
          onClick={onAddNewColumn}
        >
          Add New Column
        </button>

        <button
          type="button"
          className="w-full my-2 mb-4 py-1 bg-custom-button_bg rounded-full text-custom-secondary_bg font-medium"
          onClick={() => alert(defaultCol)}
        >
          Add Board
        </button>
      </form>
    </OverlayModal>
  );
};

export default AddBoardModal;
