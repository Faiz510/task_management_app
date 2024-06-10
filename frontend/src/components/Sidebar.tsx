import React, { useEffect, useState } from 'react';
import Boards from '../data.json';
import { motion } from 'framer-motion';
import boardIcon from '../assets/icon-board.svg';
import ligthIcon from '../assets/icon-light-theme.svg';
import darkIcon from '../assets/icon-dark-theme.svg';
import hideSideBarIcon from '../assets/icon-hide-sidebar.svg';
import '../css/toggleButton.css';
import AddBoardModal from './modals/BoardModal/AddBoardModal';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { switchMode } from '../redux/Slice/DarkModeSlice';

interface sidebarPropsType {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<sidebarPropsType> = ({ setShowSidebar }) => {
  const [activeBoard, setActiveBoard] = useState<string>(Boards.boards[0].name);
  const [showAddBoardModal, setShowAddBoardModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state?.switchMode.mode);

  useEffect(() => {
    if (mode && mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    console.log(mode);
  }, [mode]);

  return (
    <section
      className={`bg-custom-primary_bg dark:bg-custom-dark_primary_bg overflow-hidden h-screen fixed`}
    >
      <div
        className={`md:flex flex-col min-h-[450px] ${
          Boards.boards.length > 4 ? 'overflow-y-scroll' : ''
        } overflow-x-hidden `}
      >
        <h2 className="text-custom-secondary_text text-base font-normal px-4 my-4">
          All Boards ({Boards.boards.length})
        </h2>

        {Boards.boards.map((board, i) => (
          <motion.div
            className={`my-1  font-medium tracking-wide py-2 pl-2 flex items-center gap-2 cursor-pointer rounded-r-full ${
              board.name === activeBoard
                ? 'bg-custom-button_bg text-custom-primary_text'
                : 'text-custom-secondary_text hover:bg-custom-button_hover_bg hover:text-custom-button_bg'
            }`}
            onClick={() => setActiveBoard(board.name)}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2, bounce: 500, stiffness: 100 },
            }}
          >
            <img src={boardIcon} alt="" />
            <h3 key={i} className="text-sm">
              {board.name}
            </h3>
          </motion.div>
        ))}

        <div
          className="bg-custom-primary_bg text-custom-button_bg px-2 py-2 rounded-r-2xl flex items-center justify-center gap-2 cursor-pointer hover:bg-custom-button_hover_bg text-base mt-4 font-medium dark:bg-custom-dark_primary_bg dark:hover:bg-custom-secondary_bg"
          onClick={() => setShowAddBoardModal(true)}
        >
          <img src={boardIcon} alt="" />
          <span>Create New Board </span>
        </div>
      </div>

      <div className="absolute bottom-20 w-[12rem] ">
        <div className="flex gap-3 justify-center items-center bg-custom-secondary_bg dark:bg-custom-dark_secondary_bg rounded-r-full py-2">
          <img src={ligthIcon} alt="" width={20} />
          <div>
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle hidden"
            />
            <label
              htmlFor="toggle"
              className="switch"
              onClick={() => dispatch(switchMode())}
            ></label>
          </div>
          <img src={darkIcon} alt="" width={20} />
        </div>

        <div
          className="flex gap-2 justify-center items-center mt-2 text-custom-secondary_text hover:text-custom-button_bg hover:bg-custom-button_hover_bg py-2 rounded-r-full cursor-pointer"
          onClick={() => setShowSidebar(true)}
        >
          <img src={hideSideBarIcon} alt="" width={20} />
          <span className="font-medium text-base">Hide Sidebar</span>
        </div>
      </div>

      {showAddBoardModal && <AddBoardModal onClose={setShowAddBoardModal} />}
    </section>
  );
};

export default Sidebar;
