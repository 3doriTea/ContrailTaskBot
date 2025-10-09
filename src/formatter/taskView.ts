import { IFormatter } from "./iFormatter";
import { SpreadSheetAccessor } from "../spreadSheetAccessor";
import * as config from "../../private/dataCellPosConfig.json"
import { TasksData } from "../types/dataCellPos";
import { genTaskLinesText, genTasksData } from "../utilities/taskFormatterUtil";

export const taskView : IFormatter = {
  format(accessor: SpreadSheetAccessor): string {
    const linesText = genTaskLinesText(accessor.ref);

    return [
      `${accessor.getValueByCellPos(config.title)}`,
      `${accessor.getValueByCellPos(config.teamName)}`,
      `${linesText.join("\n")}`,
    ].join("\n");
  },

  data (accessor: SpreadSheetAccessor): TasksData {
    return {
      title:accessor.getValueByCellPos(config.title),
      teamName:accessor.getValueByCellPos(config.teamName),
      tasks: genTasksData(accessor.ref),
    };
  }
};
