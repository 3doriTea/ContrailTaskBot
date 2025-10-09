import { TrelloElement } from "./trelloElement";
import { Card } from "./card";
import { cardsGetRequest } from "./utility"

/**
 * １つのボードデータ
 */
export type BoardData = {
  id: string;
  name: string;
};

/**
 * 複数のボードデータ
 */
export type BoardsData = Array<BoardData>;

export type Boards = Array<Board>;

/**
 * ボードクラス
 */
export class Board extends TrelloElement<BoardData> {
  constructor(json: BoardData, private trelloId_: string) {
    super(json);
  }

  public get trelloId() : string {
    return this.trelloId_;
  }

  public get id() : string {
    return this.json.id;
  }

  public get name() : string {
    return this.json.name;
  }

  async getCard() : Promise<Card> {
    // cardsGetRequest()
  }

  // async createCard(): Promise<Card> {

    

  //   return new Card();
  // }
}
