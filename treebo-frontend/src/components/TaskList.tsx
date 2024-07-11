import React from "react";
import Task from "../services/task.type";
import TaskItem from "./TaskItem";

interface Props {
  data?: Task[];
}

const TaskList: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      {data?.map((data: any, index) => (
        <TaskItem key={index} data={data}></TaskItem>
      ))}
    </div>
  );
};

export default TaskList;
