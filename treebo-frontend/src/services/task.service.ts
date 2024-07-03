import axios from "axios";
import Task from "./task.type";

const getTasks = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { getTasks };
