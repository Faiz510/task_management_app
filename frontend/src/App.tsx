import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskSection from "./components/TaskSection";
import showSidebarIcon from "./assets/icon-show-sidebar.svg";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <main className="">
      <Navbar />

      <section className="grid grid-cols-5">
        <AnimatePresence>
          {!showSidebar && (
            <motion.div
              className="md:col-span-1 md:flex"
              key="sidebar"
              initial={{ translateX: -300 }}
              animate={{
                translateX: 0,
                transition: { duration: 0.3 },
              }}
              exit={{
                translateX: -300,
                transition: { duration: 0.3 },
              }}
            >
              <Sidebar setShowSidebar={setShowSidebar} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`${showSidebar ? "col-span-5" : "col-span-4"}`}>
          <TaskSection />
        </div>
      </section>

      {showSidebar && (
        <motion.div
          className="hidden md:absolute left-0 bottom-10 bg-custom-button_bg py-4 rounded-r-full px-4 cursor-pointer md:flex justify-center items-center text-custom-primary_text gap-4"
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
      )}
    </main>
  );
};

export default App;
