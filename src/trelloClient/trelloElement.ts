export class TrelloElement<JsonT = any> {
  constructor(protected json: JsonT) {}

  /** 生Jsonデータ */
  public get row(): JsonT {
    return this.json;
  } 
}

export type TrelloId = string;
