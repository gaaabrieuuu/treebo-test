import React from "react";
import Task from "../services/task.type";
import { createTask } from "../services/task.service";

interface Props {
  onClick?: () => void;
}

const TaskForm: React.FC<Props> = ({ onClick }) => {
  const [values, setValues] = React.useState<Task>({ status: false } as Task);

  const newTask = () => {
    createTask(values).then((response: any) => {
      console.log(response);
    });
  };

  return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 xl:w-1/3 w-full min-h-24 p-2 rounded-md flex flex-col bg-cyan-200">
        <h3 className="text-3xl text-cyan-950 font-semibold m-auto">
          Nova Tarefa
        </h3>
        <div className="w-full h-0.5 bg-sky-950"></div>
        <div className="w-full gap-2 p-2 flex flex-col text-cyan-950 font-semibold">
          <h2 className="truncate">Título</h2>
          <input
            className="border-solid border-1 border-sky-950 px-2 rounded-md "
            type="text"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <h2 className="truncate">Descrição</h2>
          <input
            className="border-solid border-1 border-sky-950 px-2 rounded-md "
            type="text"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
          <h2 className="truncate">Data</h2>
          <input
            className="border-solid border-1 border-sky-950 px-2 rounded-md "
            type="datetime-local"
            onChange={(e) =>
              setValues({ ...values, date: new Date(e.target.value) })
            }
          />
          <div className="flex flex-row gap-5">
            <h2 className="truncate">Já finalizou esta tarefa?</h2>
            <input
              type="checkbox"
              defaultChecked={values.status}
              onChange={(e) =>
                setValues({ ...values, status: e.target.checked })
              }
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                newTask();
              }}
              className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
            >
              Enviar
            </button>
            <button
              onClick={onClick}
              className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
  );
};

export default TaskForm;
