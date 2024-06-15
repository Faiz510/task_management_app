import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TaskModal from './modals/TaskModal/TaskModal';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import axios from 'axios';
import { TaskType } from './Types';
import { getTaskByStatus } from '../redux/Slice/taskSlice/TaskByStatus';

const TaskSection = () => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [curTaskId, setCurTaskId] = useState<string | null>(null);

  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );

  const dispatch = useAppDispatch();
  const taskData = useAppSelector((state) => state.TaskByStatus.tasksByStatus);

  useEffect(() => {
    if (curBoard) {
      dispatch(getTaskByStatus(curBoard?._id));
    }
  }, [curBoard]);

  const onClickTaskHandler = (id: string) => {
    setShowTaskModal(true);
    setCurTaskId(id);
  };

  return (
    <section className="bg-custom-secondary_bg dark:bg-custom-dark_secondary_bg  px-4 flex h-screen">
      <table className="w-full mt-4">
        <thead>
          <tr>
            {curBoard &&
              curBoard.columns.map((column, i) => (
                <th
                  key={i}
                  className="text-base text-custom-secondary_text font-normal tracking-wider"
                >
                  {column} (
                  {taskData && taskData[column]?.length > 0
                    ? taskData[column]?.length
                    : 0}
                  )
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {curBoard?.columns.map((column, i) => (
              <td key={i} className="align-top">
                {taskData &&
                  taskData[column]?.map((task: TaskType) => (
                    <motion.div
                      key={task?._id}
                      className="px-2 w-[250px] h-[100px] my-4 bg-custom-primary_bg dark:bg-custom-dark_primary_bg cursor-pointer shadow-md rounded-md py-2 mx-auto"
                      whileHover={{ scale: 1.02, opacity: 0.6 }}
                      onClick={() => onClickTaskHandler(task?._id?.toString())}
                    >
                      <h3 className="text-custom-dark_primary_bg dark:text-custom-secondary_bg font-semibold text-sm">
                        {task?.title?.length > 50
                          ? `${task?.title?.slice(0, 50)}...`
                          : task?.title}
                      </h3>
                      <span className="text-custom-secondary_text text-sm">
                        {task?.subTasks?.length} subtasks
                      </span>
                    </motion.div>
                  ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="bg-custom-button_hover_bg flex items-center justify-center w-1/4 h-[300px] mt-10 font-semibold text-custom-secondary_text hover:text-custom-button_bg cursor-pointer dark:bg-custom-dark_primary_bg">
        <h3>Add Column</h3>
      </div>

      {showTaskModal && (
        <TaskModal
          onClose={setShowTaskModal}
          curtask={curTaskId}
          setShowTaskModal={setShowTaskModal}
        />
      )}
    </section>
  );
};

export default TaskSection;
