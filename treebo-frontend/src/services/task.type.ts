interface Task {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  date: Date | undefined;
  status: boolean | undefined;
}

export default Task;
