import React from "react";
import Task from "../services/task.type";
import {
  AlertCircleOutline,
  CheckmarkDoneCircle,
  Close,
  CloseCircle,
  Create,
} from "react-ionicons";
import { patchTask, deleteTask } from "../services/task.service";
import moment from "moment-timezone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

interface Props {
  data: Task;
}

const TaskSchema = z.object({
  title: z
    .string()
    .min(3, "O título precisa ter mais que 3 caracteres.")
    .max(25, "O título precisa ter menos que 25 caracteres."),
  description: z
    .string()
    .min(3, "A descrição precisa ter mais que 3 caracteres.")
    .max(200, "A descrição precisa ter menos que 200 caracteres."),
  date: z.coerce
    .date({ message: "Esse campo é obrigatório." })
    .refine((data) => data > new Date(), {
      message: "Não é possível realizar uma tarefa em uma data passada.",
    }),
  status: z.boolean(),
});

const TaskItem: React.FC<Props> = ({ data }) => {
  const [showDeleteView, setShowDeleteView] = React.useState<boolean>(false);
  const [showEditView, setShowEditView] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskSchema),
  });

  const formattedDate = moment
    .tz(data.date.toString(), "America/Sao_Paulo")
    .format()
    .slice(0, 16);

  const formSubmit = (values: any) => {
    setShowEditView(false);
    setIsLoading(true);
    patchTask(data.id, values).then((response: any) => {
      console.log(response);
      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccessful(true);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    });
  };

  return (
    <div className="w-full rounded-md border-solid border-2 gap-2 border-sky-950">
      <div className="w-full h-10 p-2 rounded-md flex flex-row items-center justify-between text-cyan-950 font-semibold">
        <h2 className="truncate">{data.title}</h2>
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
              onClick={() => deleteTask(data.id)}
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
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="w-full gap-2 p-2 flex flex-col text-cyan-950 font-semibold"
        >
          <h2 className="truncate">Título</h2>
          <input
            {...register("title")}
            className="border-solid border-1 border-sky-950 px-2 rounded-md "
            type="text"
            defaultValue={data.title}
          />
          {errors.title?.message && (
            <div className="flex flex-row gap-2 text-center">
              <AlertCircleOutline height="16px" width="16px" color="#082f49" />
              <p className="text-sm text-sky-950">
                {" "}
                {errors.title?.message as string}{" "}
              </p>
            </div>
          )}

          <h2 className="truncate">Descrição</h2>
          <textarea
            {...register("description")}
            defaultValue={data.description}
            className="border-solid border-1 border-sky-950 px-2 rounded-md "
          />
          {errors.description?.message && (
            <div className="flex flex-row gap-2 text-center">
              <AlertCircleOutline height="16px" width="16px" color="#082f49" />
              <p className="text-sm text-sky-950">
                {errors.description?.message as string}
              </p>
            </div>
          )}

          <h2 className="truncate">Data</h2>
          <input
            {...register("date")}
            className="border-solid border-1 border-sky-950 px-2 rounded-md "
            type="datetime-local"
            defaultValue={formattedDate}
          />
          {errors.date?.message && (
            <div className="flex flex-row gap-2 text-center">
              <AlertCircleOutline height="16px" width="16px" color="#082f49" />
              <p className="text-sm text-sky-950">
                {errors.date?.message as string}
              </p>
            </div>
          )}

          <div className="flex flex-row gap-5">
            <h2 className="truncate">Já finalizou esta tarefa?</h2>
            <input
              {...register("status")}
              defaultChecked={data.status}
              type="checkbox"
            />
          </div>

          <div className="flex flex-row gap-2">
            <button
              type="submit"
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
        </form>
      )}
      {(isLoading || isSuccessful || isError) && (
        <div className="flex flex-col justify-center items-center">
          <PulseLoader
            color={"#083344"}
            loading={isLoading}
            cssOverride={{ width: "auto", height: "20%", margin:"10px auto"}}
          />
          {isSuccessful && (
            <>
              <h3 className="text-3xl text-cyan-950 my-4">
                Tarefa atualizada com sucesso!
              </h3>
              <CheckmarkDoneCircle
                color={"#083344"}
                height={"50px"}
                width={"auto"}
              />
              <button
                onClick={() => {
                  setIsSuccessful(false);
                  setShowEditView(true);
                }}
                className="text-lg border-solid border-2 hover:opacity-50 border-sky-950 p-2 my-4 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
              >
                Continuar
              </button>
            </>
          )}
          {isError && (
            <>
              <h3 className="text-3xl text-cyan-950 my-4">
                Erro ao criar a tarefa!
              </h3>
              <CloseCircle color={"#083344"} height={"50px"} width={"auto"} />
              <button
                onClick={() => {
                  setIsError(false);
                  setShowEditView(true);
                }}
                className="text-lg border-solid border-2 hover:opacity-50 border-sky-950 p-2 my-4 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
              >
                Tentar novamente
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
