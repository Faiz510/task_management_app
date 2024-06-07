import { useState } from 'react';
import Boards from '../data.json';
import { motion } from 'framer-motion';
import TaskModal from './modals/TaskModal/TaskModal';

const TaskSection = () => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  return (
    <section className="bg-custom-secondary_bg h-screen px-4 flex ">
      <table className="w-full mt-4">
        <thead>
          <tr>
            {Boards.boards[0].columns.slice(0, 4).map((column, i) => (
              <th
                key={i}
                className="text-base text-custom-secondary_text font-normal tracking-wider"
              >
                {column.name} ({column.tasks.length})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Boards.boards[0].columns.slice(0, 4).map((column, i) => (
              <td key={i} className="align-top ">
                {column.tasks.map((task, j) => (
                  <motion.div
                    key={j}
                    className="px-2 w-[250px] h-[100px] my-4 bg-custom-primary_bg cursor-pointer shadow-md rounded-md py-2"
                    whileHover={{ scale: 1.02, opacity: 0.6 }}
                    onClick={() => setShowTaskModal(true)}
                  >
                    <h3 className="text-black dark:bg-custom-primary_bg font-semibold text-sm">
                      {task.title.length > 50
                        ? `${task.title.slice(0, 50)}...`
                        : task.title}
                    </h3>
                    <span className="text-custom-secondary_text text-sm">
                      {task.subtasks.length} subtasks
                    </span>
                  </motion.div>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {Boards.boards[0].columns.length < 4 && (
        <div className="bg-custom-button_hover_bg flex items-center justify-center w-1/4 h-[300px] mt-10 font-semibold text-custom-secondary_text hover:text-custom-button_bg cursor-pointer">
          <h3>Add Column</h3>
        </div>
      )}
      {showTaskModal && <TaskModal onClose={setShowTaskModal} />}
    </section>
  );
};

export default TaskSection;
