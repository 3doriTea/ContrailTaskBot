import { TasksData } from "../types/dataCellPos";

export interface IMessageBuilder {
  gen(data: TasksData): string;
}