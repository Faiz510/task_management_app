import React, { useState } from "react";
import Boards from "../data.json";
import { motion } from "framer-motion";
import boardIcon from "../assets/icon-board.svg";
import ligthIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import hideSideBarIcon from "../assets/icon-hide-sidebar.svg";
// import showSideBarIcon from "../assets/icon-show-sidebar.svg";
import "../css/toggleButton.css";

interface sidebarPropsType {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<sidebarPropsType> = ({ setShowSidebar }) => {
  const [activeBoard, setActiveBoard] = useState<string>(Boards.boards[0].name);
  return (
    <section className={`bg-custom-primary_bg dark:bg-custom-dark_primary_bg `}>
      <div
        className={`md:flex flex-col min-h-[450px] ${
          Boards.boards.length > 4 ? "overflow-y-scroll" : ""
        } overflow-x-hidden `}
      >
        <h2 className="text-custom-secondary_text text-base font-normal px-4 my-4">
          All Boards ({Boards.boards.length})
        </h2>

        {Boards.boards.map((board, i) => (
          <motion.div
            className={`my-1  font-medium tracking-wide py-2 pl-2 flex items-center gap-2 cursor-pointer rounded-r-2xl ${
              board.name === activeBoard
                ? "bg-custom-button_bg text-custom-primary_text"
                : "text-custom-secondary_text hover:bg-custom-button_hover_bg hover:text-custom-button_bg"
            }`}
            onClick={() => setActiveBoard(board.name)}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2, bounce: 500, stiffness: 100 },
            }}
          >
            <img src={boardIcon} alt="" />
            <h3 key={i} className="text-base">
              {board.name}
            </h3>
          </motion.div>
        ))}

        <div className="bg-custom-primary_bg text-custom-button_bg px-2 py-2 rounded-r-2xl flex items-center justify-center gap-2 cursor-pointer hover:bg-custom-button_hover_bg text-lg mt-4 font-medium">
          <img src={boardIcon} alt="" />
          <span>Create New Board</span>
        </div>
      </div>

      <div className="absolute bottom-6 w-[12rem] ">
        <div className="flex gap-3 justify-center items-center bg-custom-secondary_bg rounded-r-2xl">
          <img src={darkIcon} alt="" width={25} />
          <div>
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle hidden"
            />
            <label htmlFor="toggle" className="switch"></label>
          </div>
          <img src={ligthIcon} alt="" width={25} />
        </div>

        <div
          className="flex gap-2 justify-center items-center mt-2 text-custom-secondary_text hover:text-custom-button_bg hover:bg-custom-button_hover_bg py-2 rounded-r-2xl cursor-pointer"
          onClick={() => setShowSidebar(true)}
        >
          <img src={hideSideBarIcon} alt="" width={20} />
          <span className="font-medium text-base">Hide Sidebar</span>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
