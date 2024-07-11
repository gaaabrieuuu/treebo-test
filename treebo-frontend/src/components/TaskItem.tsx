import React from "react";
import Task from "../services/task.type";
import { Close, Create } from "react-ionicons";
import { patchTask, deleteTask } from "../services/task.service";

interface Props {
  data: Task;
}

const TaskItem: React.FC<Props> = ({ data }) => {
  const [showDeleteView, setShowDeleteView] = React.useState<boolean>(false);
  const [showEditView, setShowEditView] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<Task>({
    id: data.id,
    title: data.title,
    description: data.description,
    date: data.date,
    status: data.status,
  });
  
  const editTask = () => {
    console.log(values);
    patchTask(values.id, values).then((response: any) => {
      console.log(response);
    });
  };

  const excludeTask = () => {
    deleteTask(values.id).then((response: any) => {
      console.log(response);
    });
  };

  return (
      <div className="w-full rounded-md border-solid border-2 gap-2 border-sky-950">
        <div className="w-full h-10 p-2 rounded-md flex flex-row items-center justify-between text-cyan-950 font-semibold">
          <h2 className="truncate">{values?.title}</h2>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                setShowEditView(true);
                setShowDeleteView(false);
              }}
              className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
            >
              <Create color={"#082f49"} height="20px" width="20px" />
              Editar
            </button>
            <button
              onClick={() => {
                setShowDeleteView(true);
                setShowEditView(false);
              }}
              className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
            >
              <Close color={"#082f49"} height="20px" width="20px" />
              Apagar
            </button>
          </div>
        </div>
        {showDeleteView && (
          <div className="w-full gap-2 p-2 flex flex-row items-center justify-between text-cyan-950 font-semibold transition ease-in-out duration-300">
            <h2 className="truncate">Deseja continuar?</h2>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => excludeTask()}
                className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
              >
                Apagar
              </button>
              <button
                onClick={() => setShowDeleteView(false)}
                className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {showEditView && (
            <div className="w-full gap-2 p-2 flex flex-col text-cyan-950 font-semibold">
              <h2 className="truncate">Título</h2>
              <input
                className="border-solid border-1 border-sky-950 px-2 rounded-md "
                type="text"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
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
                defaultValue={values.date as any}
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
                    editTask();
                  }}
                  className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => setShowEditView(false)}
                  className="border-solid border-2 hover:opacity-50 border-sky-950 px-2 my-1 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default TaskItem;
