import axios from "axios";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

const getTasks = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/tasks`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const createTask = async (data: CreateTaskDto) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/tasks`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const patchTask = async (id: string | undefined, data: UpdateTaskDto) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const deleteTask = async (id: string | undefined) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { getTasks, patchTask, deleteTask, createTask };
