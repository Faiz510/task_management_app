import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskSection from './components/TaskSection';
import { AnimatePresence, motion } from 'framer-motion';
import ShowSidebarButton from './components/ShowSidebarButton';
import '../src/css/ScrollBar.css';
import Register from './components/modals/Auth/Register';
import Signin from './components/modals/Auth/Signin';
import { useAppSelector } from './redux/hook';
import '../src/css/TaskSectionScrollBar.css';

const App = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSignModal, setShowSignModal] = useState<boolean>(false);
  const [showRegisterModal, setRegisterModal] = useState<boolean>(false);

  const curUser = useAppSelector((state) => state?.user?.currentUser);

  const [showBoardOnMobile, setShowBoardOnMobile] = useState(false);

  return (
    <>
      {curUser ? (
        <main className="dark:bg-custom-dark_primary_bg bg-custom-primary_bg scrollable-section">
          <div className="pt-20">
            <Navbar setShowBoardOnMobile={setShowBoardOnMobile} />
          </div>

          <section className="grid grid-cols-4  md:grid-cols-5 bg-custom-primary_bg dark:bg-custom-dark_primary_bg">
            <AnimatePresence>
              {!showSidebar && (
                <motion.div
                  className={`${showBoardOnMobile ? 'absolute' : 'hidden'} md:col-span-1 md:flex`}
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
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h3
            className=" bg-custom-button_bg text-custom-secondary_bg py-1 rounded-full text-2xl px-10 cursor-pointer"
            onClick={() => setShowSignModal(true)}
          >
            Login
          </h3>
        </div>
      )}

      {!curUser && showRegisterModal && (
        <Register
          onClose={setRegisterModal}
          showRegModal={setRegisterModal}
          showSignModal={setShowSignModal}
        />
      )}

      {!curUser && showSignModal && (
        <Signin
          onClose={setRegisterModal}
          showRegModal={setRegisterModal}
          showSignModal={setShowSignModal}
        />
      )}
    </>
  );
};

export default App;
