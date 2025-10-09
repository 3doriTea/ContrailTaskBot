import { GoogleSpreadSheetJson } from "./oritinalJsonType";
import { CellPosition } from "./types/dataCellPos";

/**
 * Google Spread Sheet のjsonにアクセスするためのラップクラス
 */
export class SpreadSheetAccessor {
  /**
   *
   * @param json アクセスしたいjson
   */
  constructor(private json: GoogleSpreadSheetJson) {}

  public get ref(): GoogleSpreadSheetJson { return this.json;}

  getValueByCellPos(cellPos: CellPosition): string | null {
    return this.getValue(cellPos.row, cellPos.column);
  }
  /**
   * 指定したセルの値を取得
   * @param row 行
   * @param column 列
   * @returns null or 値
   */
  getValue(row: number, column: number): string | null {
    const value: string | undefined = this.json.values[row][column];
    if (value) {
      return value;
    } else {
      return null;
    }
  }
}
