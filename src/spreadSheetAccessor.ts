import { GoogleSpreadSheetJson } from "./oritinalJsonType";

/**
 * Google Spread Sheet のjsonにアクセスするためのラップクラス
 */
export class SpreadSheetAccessor {
  /**
   *
   * @param json アクセスしたいjson
   */
  constructor(private json: GoogleSpreadSheetJson) {}

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
