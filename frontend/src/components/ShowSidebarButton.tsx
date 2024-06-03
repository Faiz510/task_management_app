import React from "react";
import { motion } from "framer-motion";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";

interface showSidebarButtonType {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowSidebarButton: React.FC<showSidebarButtonType> = ({
  setShowSidebar,
}) => {
  return (
    <motion.div
      className="hidden md:absolute left-0 bottom-0 mb-0  bg-custom-button_bg py-4 rounded-r-full px-4 cursor-pointer md:flex justify-center items-center text-custom-primary_text gap-4"
      initial={{ translateX: -130 }}
      whileHover={{
        scale: 1.1,
        opacity: 0.8,
        translateX: 0,
        transition: { duration: 0.3, type: "tween" },
      }}
      onClick={() => setShowSidebar(false)}
    >
      <span className="font-medium text-base">Show Sidebar</span>
      <img src={showSidebarIcon} alt="" width={25} />
    </motion.div>
  );
};

export default ShowSidebarButton;
