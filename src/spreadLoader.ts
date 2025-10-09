import { GoogleSpreadSheetJson } from "./oritinalJsonType";
import { SpreadSheetAccessor } from "./spreadSheetAccessor";

/**
 * Google Spread Sheet に直接アクセスするクラス
 */
export class SpreadLoader {
  private sheetAccessor_: SpreadSheetAccessor | null = null;
  private previousAccessUri_: string = "";
  
  public get previousAccessUri() : string {
    return this.previousAccessUri_;
  }
  

  constructor(private spreadId: string) {}

  /**
   * 読み込みをする
   * @param sheetName スプレッドの中のシート名
   */
  public async load(sheetName: string): Promise<void> {
    const accessUri: string = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadId}/values/${sheetName}?key=${process.env.SPREAD_SEET_API_KEY}`;
    const response = await fetch(accessUri);
    
    if (response.ok) {
      this.previousAccessUri_ = accessUri;
      
      const json : GoogleSpreadSheetJson = await response.json();
      this.sheetAccessor_ = new SpreadSheetAccessor(json);
    } else {
      console.log(response.headers);
    }
  }

  /**
   * 読み込み済み true / false
   */
  public get isLoaded(): boolean {
    return this.sheetAccessor_ !== null;
  }

  public get sheetAccessor(): SpreadSheetAccessor {
    return this.sheetAccessor_
  }

  /**
   * 指定セルの値を取得する
   * @param row 行
   * @param column 列
   * @returns セルの文字列 or 空の場合 null
   */
  public getValue(row: number, column: number): string | null {
    if (this.sheetAccessor_ === null) {
      return null;
    }

    return this.sheetAccessor_.getValue(row, column);
  }
}
