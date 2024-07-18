export class CreateTaskDto {
  title: string;
  description: string;
  date: Date;

  constructor(title: string, description: string, date: Date) {
    this.title = title;
    this.description = description;
    this.date = date;
  }
}
