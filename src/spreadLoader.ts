import { SpreadSheetAccessor } from "./spreadSheetAccessor";

export class SpreadLoader {
  private sheetAccessor: SpreadSheetAccessor | null = null;

  constructor(private spreadId: string) {}

  /**
   * 読み込みをする
   * @param sheetName スプレッドの中のシート名
   */
  public async load(sheetName: string): Promise<void> {
    const accessUri = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadId}/values/${sheetName}?key=${process.env.SPREAD_SEET_API_KEY}`;
    console.log(accessUri);
    const response = await fetch(accessUri);
    const json = await response.json();

    this.sheetAccessor = new SpreadSheetAccessor(json);
  }

  /**
   * 読み込み済み true / false
   */
  public get isLoaded(): boolean {
    return this.sheetAccessor !== null;
  }

  public getValue(row: number, column: number): string | null {
    return this.sheetAccessor.getValue(row, column);
  }
}
