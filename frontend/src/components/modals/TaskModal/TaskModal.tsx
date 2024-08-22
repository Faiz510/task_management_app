import React, { useEffect, useRef, useState } from 'react';
import OverlayModal from '../OverlayModal';
import dotOptIcon from '../../../assets/icon-vertical-ellipsis.svg';
import SelectColOpt from '../../SelectColOpt';
import ModalOpt from '../../ModalOpt';
import DelTaskModal from './DelTaskModal';
import EditTaskModal from './EditTaskModal';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { taskById } from '../../../redux/Slice/taskSlice/TaskSliceApi';
import {
  getSubtaskById,
  updateActiveStatus,
} from '../../../redux/Slice/subTask/SubtaskApiSlice';
import { SubtaskApiResponse } from '../../Types';

interface TaskModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  curtask: string | null;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  curtask,
  setShowTaskModal,
}) => {
  const [showTaskOpt, setShowTaskOpt] = useState<boolean>(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const [showDelTaskModal, setShowDelTaskModal] = useState<boolean>(false);
  const taskData = useAppSelector((state) => state.TaskSlice.task.task);

  const [selOptVal, setSelOptVal] = useState<string>(
    `${taskData?.task?.status}`,
  );
  const dotRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (taskData) {
      setSelOptVal(taskData.task.status);
    }
  }, [curtask, taskData]);

  useEffect(() => {
    if (curtask) {
      dispatch(taskById(curtask));
    }
  }, [curtask]);

  useEffect(() => {
    if (showDelTaskModal && showEditTaskModal) {
      setShowTaskModal(false);
    }
  }, [showDelTaskModal, showEditTaskModal]);

  const onChangeInputHanlder = async (id: string) => {
    // sending change status request
    const getSubtaskRes = await dispatch(getSubtaskById(id));
    const payload = getSubtaskRes?.payload as SubtaskApiResponse;

    if (getSubtaskById.fulfilled.match(getSubtaskRes)) {
      const currentStatus = payload.subtask.isActive;
      const newStatus = !currentStatus;

      await dispatch(
        updateActiveStatus({ id: id, data: { isActive: newStatus } }),
      );

      if (curtask) {
        await dispatch(taskById(curtask));
      }

      await dispatch(getSubtaskById(id));
    }
  };

  return (
    <>
      <OverlayModal onClose={onClose}>
        <form>
          <h3 className="text-custom-dark_secondary_bg dark:text-custom-primary_bg text-lg font-medium my-2">
            {taskData?.task?.title}
          </h3>

          <span
            className="absolute right-4 top-4 cursor-pointer"
            ref={dotRef}
            onClick={() => setShowTaskOpt((pre) => !pre)}
          >
            <img src={dotOptIcon} alt="" width={5} />
          </span>

          {/* active and not acitve subtask length  */}
          <div className="dark:text-custom-primary_bg text-custom-dark_primary_bg flex items-center gap-2">
            <span> Subtasks </span>
            <span>
              {
                taskData?.task.subTasks.filter(
                  (task) => task.isActive === false,
                ).length
              }
              / {taskData?.task.subTasks.length}{' '}
            </span>
          </div>

          <div className="px-2 min-h-20 max-h-60 overflow-auto my-4">
            {taskData?.task.subTasks.map((subtask) => (
              <div
                className="py-1 my-1 bg-custom-secondary_bg px-2 flex  gap-2 text-custom-secondary_text text-sm hover:bg-custom-secondary_text/60 hover:text-custom-dark_primary_bg dark:bg-custom-dark_secondary_bg hover:dark:bg-custom-secondary_bg dark:hover:text-custom-button_bg"
                key={subtask._id}
              >
                <input
                  type="checkbox"
                  className=" w-4 bg-custom-button_bg outline-none text-custom-button_bg"
                  checked={!subtask.isActive}
                  onChange={() => onChangeInputHanlder(subtask._id || '')}
                />
                {subtask.isActive === false ? (
                  <del className="opacity-60">{subtask.title}</del>
                ) : (
                  <label>{subtask?.title}</label>
                )}
              </div>
            ))}
          </div>

          <div className="my-4">
            <SelectColOpt setSelOptVal={setSelOptVal} selOptVal={selOptVal} />
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

      {showDelTaskModal && (
        <DelTaskModal
          onClose={setShowDelTaskModal}
          id={curtask || ''}
          setShowTaskModal={setShowTaskModal}
        />
      )}

      {showEditTaskModal && (
        <EditTaskModal onClose={setShowEditTaskModal} id={curtask || ''} />
      )}
    </>
  );
};

export default TaskModal;
