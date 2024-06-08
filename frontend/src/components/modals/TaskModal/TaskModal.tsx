import React, { useEffect, useRef, useState } from 'react';
import OverlayModal from '../OverlayModal';
import dotOptIcon from '../../../assets/icon-vertical-ellipsis.svg';
import Board from '../../../data.json';
import SelectColOpt from '../../SelectColOpt';
import ModalOpt from '../../ModalOpt';
import DelTaskModal from './DelTaskModal';
import EditBoardModal from '../BoardModal/EditBoardModal';
import EditTaskModal from './EditTaskModal';

interface TaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose }) => {
  const [curBoard, setCurBoard] = useState(Board.boards[0]);
  const [showTaskOpt, setShowTaskOpt] = useState<boolean>(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const [showDelTaskModal, setShowDelTaskModal] = useState<boolean>(false);
  const dotRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <OverlayModal onClose={onClose}>
        <form>
          <h3 className="text-custom-dark_secondary_bg dark:text-custom-primary_bg text-lg font-medium my-2">
            Show Modal
          </h3>

          <span
            className="absolute right-4 top-4 cursor-pointer"
            ref={dotRef}
            onClick={() => setShowTaskOpt((pre) => !pre)}
          >
            <img src={dotOptIcon} alt="" width={5} />
          </span>

          <div className="px-2 min-h-20 max-h-60 overflow-auto my-4">
            {curBoard.columns[0].tasks.map((task) => (
              <>
                {task.subtasks.map((t) => (
                  <div className="py-1 my-1 bg-custom-secondary_bg px-2 flex  gap-2 text-custom-secondary_text text-sm hover:bg-custom-secondary_text/60 hover:text-custom-dark_primary_bg dark:bg-custom-dark_secondary_bg hover:dark:bg-custom-secondary_bg dark:hover:text-custom-button_bg">
                    <input
                      type="checkbox"
                      className=" w-4 bg-custom-button_bg outline-none text-custom-button_bg"
                    />
                    <label>{t.title}</label>
                  </div>
                ))}
              </>
            ))}
          </div>

          <div className="my-4">
            <SelectColOpt />
          </div>

          {showTaskOpt && (
            <ModalOpt
              showOpt={showTaskOpt}
              setShowOpt={setShowTaskOpt}
              setShowDelModal={setShowDelTaskModal}
              setShowEditModal={setShowEditTaskModal}
              modalFor="Task"
              dotRef={dotRef}
            />
          )}
        </form>
      </OverlayModal>

      {showDelTaskModal && <DelTaskModal onClose={setShowDelTaskModal} />}

      {showEditTaskModal && <EditTaskModal onClose={setShowEditTaskModal} />}
    </>
  );
};

export default TaskModal;
