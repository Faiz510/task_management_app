import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskSection from "./components/TaskSection";

const App = () => {
  return (
    <main className="">
      <Navbar />
      <section className="grid grid-cols-5">
        <div className="hidden md:col-span-1 md:flex">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <TaskSection />
        </div>
      </section>
    </main>
  );
};

export default App;
