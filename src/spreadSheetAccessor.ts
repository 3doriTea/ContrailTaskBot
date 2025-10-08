import { GoogleSpreadSheetJson } from "./oritinalJsonType";

export class SpreadSheetAccessor {
  constructor(private json: GoogleSpreadSheetJson) {}

  getValue(row: number, column: number): string | null {
    const value: string | undefined = this.json.values[row][column];
    if (value) {
      return value;
    } else {
      return null;
    }
  }
}
