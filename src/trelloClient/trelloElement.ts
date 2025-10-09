export class TrelloElement<JsonT = any> {
  constructor(protected json: JsonT) {}

  public get ref(): JsonT {
    return this.json;
  } 
}

export type TrelloId = string;
