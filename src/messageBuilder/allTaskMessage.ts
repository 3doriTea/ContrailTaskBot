import { TasksData } from "../types/dataCellPos";
import { IMessageBuilder } from "./iMessageBuilder";

export class AllTaskMessage implements IMessageBuilder {

  private formatDateToMonthDay(date: Date) : string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  }

  private equalDay(dateLeft: Date, dateRight: Date) : boolean {
    return dateLeft.getDate() === dateRight.getDate();
  }

  gen(data: TasksData): string {
    return [
      `${data.teamName}が作る`,
      `# ${data.title} のタスクすべて`,
      ...(() : string[] => {
        return data.tasks.map((task) : string => {
          return [
            `- ${task.wBS}:${task.task} `,
            `優先度:\`${task.taskPriority}\` `,
            `担当者:\`${task.taskAssignee}\` `,
            `期限:\`${
              this.equalDay(task.taskDateStart, task.taskDateEnd)
              ? `${this.formatDateToMonthDay(task.taskDateStart)}中`
              : `${this.formatDateToMonthDay(task.taskDateStart)}~${
                this.formatDateToMonthDay(task.taskDateEnd)}`}\``,
            `達成率${task.taskCompletionRate * 100.0}%`,
          ].join("");
        });
      })()
    ].join("\n");
  }
};