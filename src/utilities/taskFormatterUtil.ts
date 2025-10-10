import { TaskPriority, CellPosition, TaskData } from "../types/dataCellPos";
import { GoogleSpreadSheetJson } from "../oritinalJsonType"
import * as config from "../formatter/dataCellPosConfig.json"
import * as dfns from "date-fns"

export type WBS = {
  major: number;
  minor: number;
  patch: string;
};

/**
 * WBS の文字列から WBS を生成する
 * @param str wbsの文字列
 * @returns WBS or null
 */
export const genWBS = (str: string) : WBS | null => {
  const regex = /(\d+)(?:\.(\d+))?(?:\.(.*))?/;
  const match = str.match(regex);
  if (match) {
    return {
      major: Number.parseInt(match[1]) ?? 0,
      minor: Number.parseInt(match[2]) ?? 0,
      patch: match[3] ?? "",
    };
  }

  return null;
};

/**
 * タスクのjsonからタスクデータの配列を生成
 * @param json Google Spread Sheet のjson
 * @returns 各タスクデータの配列
 */
export const genTasksData = (json: GoogleSpreadSheetJson) : Array<TaskData> => {
  const column = (cellPos: CellPosition) => cellPos.column;
  const dateFormat = "yyyy/MM/dd";
  const toDate = (dateStr: string) => { return dfns.parse(dateStr, dateFormat, new Date()) };
  const toRate = (rateStr: string) => { return Number.parseInt(rateStr.substring(0, rateStr.length - 1)) / 100.0 }

  return json.values.splice(config.begin.wBS.row).map((line) : TaskData | undefined => {
      if (!hasAllDataIn(line)) {
        return; // データが揃っていないなら回帰
      }

      const isTaskPriority = (str: string) : str is TaskPriority => {
        return [ "S", "A", "B", "C", "D", "E" ].includes(str);
      }

      const priority : string = line[column(config.begin.taskPriority)];
      if (!isTaskPriority(priority)) {
        console.error("priorityのキャスト");
        return;
      }
      const taskPriority: TaskPriority = priority;

      console.log(line[column(config.begin.taskDateStart)]);

      return {
        wBS: line[column(config.begin.wBS)],
        task:line[column(config.begin.task)],
        taskPriority: taskPriority,
        taskAssignee: line[column(config.begin.taskAssignee)],
        taskDateStart: toDate(line[column(config.begin.taskDateStart)]),
        taskDateEnd: toDate(line[column(config.begin.taskDateEnd)]),
        taskDuration: Number.parseInt(line[column(config.begin.taskDuration)]),
        taskCompletionRate: toRate(line[column(config.begin.taskCompletionRate)]),
        taskDaysToStart: Number.parseInt(line[column(config.begin.taskDaysToStart)]),
      };
    }).filter((taskData) => { return taskData; });
}

/**
 * タスクのjsonからタスクのテキスト配列を生成
 * @param json Google Spread Sheetのjson
 * @returns 各タスクのテキスト配列
 */
export const genTaskLinesText = (json: GoogleSpreadSheetJson) => {
  const column = (cellPos: CellPosition) => cellPos.column;

  return json.values.splice(config.begin.wBS.row).map((line) => {
      if (!hasAllDataIn(line)) {
        return; // データが揃っていないなら回帰
      }

      return [
        `${line[column(config.begin.wBS)]}`,
        `「${line[column(config.begin.task)]}」`,
        `優先度:${line[column(config.begin.taskPriority)]} `,
        `担当者:${line[column(config.begin.taskAssignee)]} `,
        `${line[column(config.begin.taskDateStart)]}~`,
        `${line[column(config.begin.taskDateEnd)]} `,
        `期間:${line[column(config.begin.taskDuration)]} `,
        `達成率:${line[column(config.begin.taskCompletionRate)]}% `,
        `取り掛かり日数:${line[column(config.begin.taskDaysToStart)]}`,
      ].join("");
    }).filter((text) => { return text?.length; });
};

/**
 * その行にタスクの情報が全て含まれている/揃っている か
 * @param line 調べる行の文字列配列
 * @returns 含まれている true / false
 */
export const hasAllDataIn = (line: string[]) => {
  const column = (cellPos: CellPosition) => cellPos.column;
  
  return line[column(config.begin.wBS)] &&
        line[column(config.begin.task)] &&
        line[column(config.begin.taskPriority)] &&
        line[column(config.begin.taskAssignee)] &&
        line[column(config.begin.taskDateStart)] &&
        line[column(config.begin.taskDateEnd)] &&
        line[column(config.begin.taskDuration)] &&
        line[column(config.begin.taskCompletionRate)] &&
        line[column(config.begin.taskDaysToStart)]
};
