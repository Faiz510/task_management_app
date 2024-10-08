import React, { useEffect, useRef, useState } from 'react';
import logoIcon from '../assets/logo-mobile.svg';
import { motion } from 'framer-motion';
import ArrowIconDown from '../assets/icon-chevron-down.svg';
import addTaskIcon from '../assets/icon-add-task-mobile.svg';
import threeDotIcon from '../assets/icon-vertical-ellipsis.svg';
import AddTaskModal from './modals/TaskModal/AddTaskModal';
import ModalOpt from './ModalOpt';
import EditBoardModal from './modals/BoardModal/EditBoardModal';
import DelBoardModal from './modals/BoardModal/DelBoardModal';
import { FiLogOut } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { logout } from '../redux/Slice/SigninSlice';

interface NavbarProps {
  setShowBoardOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setShowBoardOnMobile }) => {
  const [showBoards, setShowBoards] = useState<boolean>(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [showBoardOpt, setShowBoardOpt] = useState<boolean>(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState<boolean>(false);
  const [showDelBoardModal, setShowDelBoardModal] = useState<boolean>(false);
  const dotDivRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const curBoard = useAppSelector(
    (state) => state?.curBoardSlice?.curBoard.curboard,
  );
  const board = useAppSelector((state) => state.board.Board.boards);
  const onLogoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (showBoards) {
      setShowBoardOnMobile(true);
    } else {
      setShowBoardOnMobile(false);
    }

    // console.log(showBoardOnMobile);
  }, [showBoards]);

  return (
    <section className="flex items-center justify-between bg-custom-primary_bg dark:bg-custom-dark_primary_bg w-full fixed top-0 z-10 h-20">
      <div className="flex items-center justify-center md:gap-2 cursor-pointer my-4 ml-4">
        <img src={logoIcon} alt="" width={30} />
        <h3 className="hidden md:flex text-3xl font-semibold tracking-wider dark:text-custom-primary_bg">
          Kanban
        </h3>
      </div>

      <div className="flex items-center justify-between px-6 md:px-10 my-2 w-[90%] md:w-[80%]">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl  font-semibold tracking-wider dark:text-custom-primary_bg">
            {curBoard ? curBoard?.board?.title : ''}
          </span>
          <motion.div
            className="md:hidden cursor-pointer mt-2"
            onClick={() => setShowBoards(!showBoards)}
            animate={{
              rotate: showBoards ? 180 : 0,
              transition: { duration: 0.25, type: 'tween' },
            }}
          >
            <img src={ArrowIconDown} alt="" width={15} />
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-4">
          {board && board.length > 0 && (
            <>
              <motion.div
                className="flex items-center justify-center cursor-pointer gap-2 bg-custom-button_bg text-custom-primary_text py-2 rounded-3xl px-5 text-2xl "
                whileHover={{ opacity: 0.6, transition: { duration: 0.3 } }}
                onClick={() => setShowAddTaskModal(true)}
              >
                <img src={addTaskIcon} alt="" />
                <span className="hidden md:flex text-base font-semibold">
                  Add New Task
                </span>
              </motion.div>
              <span
                ref={dotDivRef}
                className="text-2xl text-custom-secondary_text cursor-pointer"
                onClick={() => setShowBoardOpt((prev) => !prev)}
              >
                <img src={threeDotIcon} alt="" width={5} />
              </span>
            </>
          )}

          <div
            className="px-4 text-2xl text-custom-secondary_text cursor-pointer"
            onClick={onLogoutHandler}
          >
            <FiLogOut />
          </div>
        </div>
      </div>

      <ModalOpt
        showOpt={showBoardOpt}
        setShowOpt={setShowBoardOpt}
        dotRef={dotDivRef}
        setShowEditModal={setShowEditBoardModal}
        setShowDelModal={setShowDelBoardModal}
        modalFor="Board"
      />

      {showEditBoardModal && <EditBoardModal onClose={setShowEditBoardModal} />}

      {showDelBoardModal && <DelBoardModal onClose={setShowDelBoardModal} />}

      {showAddTaskModal && <AddTaskModal onClose={setShowAddTaskModal} />}
    </section>
  );
};

export default Navbar;
