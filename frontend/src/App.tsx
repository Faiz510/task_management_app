import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskSection from './components/TaskSection';
import { AnimatePresence, motion } from 'framer-motion';
import ShowSidebarButton from './components/ShowSidebarButton';
import '../src/css/ScrollBar.css';

const App = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  // style={{gridTemplateColumns : '30% 70%'}}

  return (
    <main className="">
      <div className="pt-20">
        <Navbar />
      </div>

      <section className="grid grid-cols-5 bg-custom-primary_bg dark:bg-custom-dark_primary_bg">
        <AnimatePresence>
          {!showSidebar && (
            <motion.div
              className="hidden md:col-span-1 md:flex"
              key="sidebar"
              initial={{ translateX: -300 }}
              animate={{
                translateX: 0,
                transition: { duration: 0.4 },
              }}
              exit={{
                translateX: -300,
                transition: { duration: 0.4 },
              }}
            >
              <Sidebar setShowSidebar={setShowSidebar} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ///////////////// */}
        <div className={`${showSidebar ? 'col-span-5' : 'col-span-4'}`}>
          <TaskSection />
        </div>
      </section>

      {/* // show bar icon  */}
      {showSidebar && <ShowSidebarButton setShowSidebar={setShowSidebar} />}
    </main>
  );
};

export default App;
