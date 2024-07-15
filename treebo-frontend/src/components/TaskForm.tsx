import React from "react";
import { createTask } from "../services/task.service";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircleOutline,
  CheckmarkDoneCircle,
  CloseCircle,
} from "react-ionicons";
import { PulseLoader } from "react-spinners";

interface Props {
  onClick?: () => void;
  result: (value: boolean) => void;
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
  date: z
    .string()
    .min(1, "Esse campo é obrigatório.")
    .transform((str) => new Date(str))
    .refine((data) => data > new Date(), {
      message: "Não é possível realizar uma tarefa em uma data passada.",
    }),
});

type CreateTaskFormData = z.infer<typeof TaskSchema>

const TaskForm: React.FC<Props> = ({ onClick, result }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(TaskSchema),
  });

  const formSubmit = (data: CreateTaskFormData) => {
    setIsLoading(true);
    createTask(data).then((response: any) => {
      if (response.status === 201) {
        setIsLoading(false);
        setIsSuccessful(true);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    });
    console.log(data);
  };

  if (isLoading || isSuccessful || isError) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/30">
        <div className="md:w-1/2 xl:w-1/3 w-full min-h-24 p-2 rounded-md bg-cyan-200 flex flex-col justify-center items-center">
          <PulseLoader
            color={"#083344"}
            loading={isLoading}
            cssOverride={{ width: "auto", height: "20%" }}
          />
          {isSuccessful && (
            <>
              <h3 className="text-3xl text-cyan-950 my-4">
                Tarefa criada com sucesso!
              </h3>
              <CheckmarkDoneCircle
                color={"#083344"}
                height={"50px"}
                width={"auto"}
              />
              <button
                onClick={() => result(true)}
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
                onClick={() => result(false)}
                className="text-lg border-solid border-2 hover:opacity-50 border-sky-950 p-2 my-4 rounded-md flex flex-row items-center text-cyan-950 font-semibold"
              >
                Tentar novamente
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30">
      <div className="md:w-1/2 xl:w-1/3 w-full min-h-24 p-2 rounded-md flex flex-col bg-cyan-200">
        <h3 className="text-3xl text-cyan-950 font-semibold m-auto">
          Nova Tarefa
        </h3>
        <div className="w-full h-0.5 bg-sky-950"></div>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="w-full gap-2 p-2 flex flex-col text-cyan-950 font-semibold"
        >
          <h2 className="truncate">Título</h2>
          <input
            {...register("title")}
            className="border-solid border-1 border-sky-950 px-2 rounded-md "
            type="text"
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
          />
          {errors.date?.message && (
            <div className="flex flex-row gap-2 text-center">
              <AlertCircleOutline height="16px" width="16px" color="#082f49" />
              <p className="text-sm text-sky-950">
                {errors.date?.message as string}
              </p>
            </div>
          )}

          <div className="flex flex-row gap-2">
            <button
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
