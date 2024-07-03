import React from "react";
import { Add, Checkbox } from "react-ionicons";
import TaskList from "./components/TaskList";
import { getTasks } from "./services/task.service";
import Task from "./services/task.type";

const App = () => {
  const [data, setData] = React.useState<Task[]>([])

  React.useEffect(() => {
    console.log(process.env.REACT_APP_API_BASE_URL)
    getTasks().then(
      (response: any) => {
        console.log(response, "#data_Home")
        setData(response)
        console.log(data)
      }
    )
  }, []);

  return (
      <main className="w-full xl:w-1/3 p-5 m-auto my-16 bg-cyan-100 rounded-md">
        <header className="flex flex-row justify-between">
          <div className="flex flex-row items-center justify-center">
            <Checkbox color={"#082f49"} height="50px" width="50px" />
            <h1 className="text-3xl text-cyan-950 font-semibold">To-Do App</h1>
          </div>
          <button className="border-solid border-2 hover:opacity-50 border-sky-950 px-4 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold">
            <Add color={"#082f49"} height="20px" width="20px" />
            Nova Tarefa
          </button>
        </header>
        <div className="w-full h-0.5 bg-sky-950"></div>
        <TaskList data={data}></TaskList>
      </main>
  );
};

export default App;
