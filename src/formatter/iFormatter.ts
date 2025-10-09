import { SpreadSheetAccessor } from "../spreadSheetAccessor";
import { TasksData } from "../types/dataCellPos";

export interface IFormatter {
  data(accessor: SpreadSheetAccessor): TasksData;
  format(accessor: SpreadSheetAccessor): string;
}
