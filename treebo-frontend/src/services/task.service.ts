import axios from "axios";
import Task from "./task.type";

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

const createTask = async (data: Task) => {
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

const patchTask = async (id: number, data: Task) => {
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

const deleteTask = async (id: number) => {
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
