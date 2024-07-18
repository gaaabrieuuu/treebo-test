export class UpdateTaskDto {
  title?: string;
  description?: string;
  date?: Date;
  status?: boolean;

  constructor(
    title?: string,
    description?: string,
    date?: Date,
    status?: boolean
  ) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.status = status;
  }
}
