import { useState } from "react";
import logoIcon from "../assets/logo-mobile.svg";
import { motion } from "framer-motion";
import ArrowIconDown from "../assets/icon-chevron-down.svg";
import addTaskIcon from "../assets/icon-add-task-mobile.svg";
import threeDotIcon from "../assets/icon-vertical-ellipsis.svg";

const Navbar = () => {
  const [showBoards, setShowBoards] = useState<boolean>(false);
  return (
    <section className="flex items-center justify-between bg-custom-primary_bg dark:bg-custom-dark_primary_bg">
      <div className="flex items-center justify-center md:gap-2 cursor-pointer my-2 ml-4">
        <img src={logoIcon} alt="" width={30} />
        <h3 className="hidden md:flex text-4xl font-semibold tracking-wider">
          Kanban
        </h3>
      </div>

      <div className="flex items-center justify-between px-6 md:px-10 my-2 w-[90%] md:w-[80%]">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl md:text-4xl font-semibold tracking-wider">
            Broad title
          </span>
          <motion.div
            className="md:hidden cursor-pointer mt-2"
            onClick={() => setShowBoards(!showBoards)}
            animate={{
              rotate: showBoards ? 180 : 0,
              transition: { duration: 0.25, type: "tween" },
            }}
          >
            <img src={ArrowIconDown} alt="" width={15} />
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <motion.div
            className="flex items-center justify-center cursor-pointer gap-2 bg-custom-button_bg text-custom-primary_text py-2 rounded-3xl px-5 text-2xl "
            whileHover={{ opacity: 0.6, transition: { duration: 0.3 } }}
          >
            <img src={addTaskIcon} alt="" />
            <span className="hidden md:flex text-lg font-semibold">
              Add New Task
            </span>
          </motion.div>
          <span className="text-2xl text-custom-secondary_text cursor-pointer">
            <img src={threeDotIcon} alt="" width={5} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
