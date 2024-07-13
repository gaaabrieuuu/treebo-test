import React from "react";
import { createTask } from "../services/task.service";
import { z } from "zod";
import { CreateTaskDto } from "../services/dto/create-task.dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleOutline } from "react-ionicons";

interface Props {
  onClick?: () => void;
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

const TaskForm: React.FC<Props> = ({ onClick }) => {
  const [values, setValues] = React.useState<CreateTaskDto>(
    {} as CreateTaskDto
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskSchema),
  });

  const formSubmit = (data: any) => {
    console.log(data);
  };
  console.log(errors);

  const newTask = () => {
    createTask(values).then((response: any) => {
      console.log(response);
    });
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 md:w-1/2 xl:w-1/3 w-full min-h-24 p-2 rounded-md flex flex-col bg-cyan-200">
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
            <AlertCircleOutline
            height="16px" width="16px" color="#082f49"
            />
            <p className="text-sm text-sky-950"> {errors.title?.message as string} </p>
          </div>
        )}

        <h2 className="truncate">Descrição</h2>
        <textarea
          {...register("description")}
          className="border-solid border-1 border-sky-950 px-2 rounded-md "
        />
        {errors.description?.message && (
          <div className="flex flex-row gap-2 text-center">
            <AlertCircleOutline
            height="16px" width="16px" color="#082f49"
            />
            <p className="text-sm text-sky-950"> {errors.description?.message as string} </p>
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
            <AlertCircleOutline
            height="16px" width="16px" color="#082f49"
            />
            <p className="text-sm text-sky-950"> {errors.date?.message as string} </p>
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
  );
};

export default TaskForm;
