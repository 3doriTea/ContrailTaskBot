import { TrelloElement } from "./trelloElement";
import { Card } from "./card";
import { boardGetRequest } from "./utility"
import { List, Lists, ListsData } from "./list";

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
  constructor(json: BoardData) {
    super(json);
  }

  public get id() : string {
    return this.json.id;
  }

  public get name() : string {
    return this.json.name;
  }

  public async getLists() : Promise<Lists> {
    const data = await boardGetRequest<ListsData>(this.id, "lists");
    return data.map((listData) : List =>
      {
        return new List(listData);
      });
  }

  public static async load(boardId: string) : Promise<Board> {
    const data = await boardGetRequest<BoardData>(boardId);
    return new Board(data);
  }

  // async getCard() : Promise<Card> {
  //   // cardsGetRequest()
  // }

  // async createCard(): Promise<Card> {

    

  //   return new Card();
  // }
}
