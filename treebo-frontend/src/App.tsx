import React from "react";
import { Add, Checkbox } from "react-ionicons";
import TaskList from "./components/TaskList";
import { getTasks } from "./services/task.service";
import Task from "./services/task.type";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [data, setData] = React.useState<Task[]>([]);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [taskCreated, setTaskCreated] = React.useState<boolean>(false);

  console.log("Renderizei pae");

  React.useEffect(() => {
    getTasks().then((response: Task[]) => {
      setData(response);
    });
  }, []);

  const handleTaskCreated = (result: boolean) => {
    setIsVisible(false);
    if (result) {
      getTasks().then((response: Task[]) => {
        setData(response);
        console.log(data)
        setTaskCreated(false);
      });
    }
  }

  return (
    <>
      <main className="w-full md:w-1/2 xl:w-1/3 p-5 m-auto my-16 bg-cyan-100 rounded-md">
        <header className="flex flex-row justify-between">
          <div className="flex flex-row items-center justify-center">
            <Checkbox color={"#082f49"} height="50px" width="50px" />
            <h1 className="text-3xl text-cyan-950 font-semibold">To-Do App</h1>
          </div>
          <button
            onClick={() => setIsVisible(true)}
            className="border-solid border-2 hover:opacity-50 border-sky-950 px-4 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
          >
            <Add color={"#082f49"} height="20px" width="20px" />
            Nova Tarefa
          </button>
        </header>
        <div className="w-full h-0.5 bg-sky-950 my-3"></div>
        {data.length < 1 ? (
          <h3 className="text-base text-cyan-950 m-auto">
            Nenhuma tarefa registrada!
          </h3>
        ) : (
          <TaskList data={data}></TaskList>
        )}
      </main>
      {isVisible && (
        <TaskForm
          result={handleTaskCreated}
          onClick={() => setIsVisible(false)}
        ></TaskForm>
      )}
    </>
  );
};

export default App;
