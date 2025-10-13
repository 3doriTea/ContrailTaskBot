import { Card, CardData, Cards, CardsData } from "./card";
import { TrelloElement, TrelloId } from "./trelloElement";
import { listGetRequest, listPostRequest, listPutRequest } from "./utility";

export type ListData = {
  id: string;
  name: string;
  closed: boolean;
  pos: number;
  idBoard: string;
};

export type ListsData = Array<ListData>;

export type Lists = Array<List>;

export class List extends TrelloElement<ListData> {
  constructor(json: ListData) {
    super(json);
  }

  public get id(): string {
    return this.json.id;
  }

  public get name(): string {
    return this.json.name;
  }

  public async getCards(): Promise<Cards> {
    const data = await listGetRequest<CardsData>(this.id, "cards");
    return data.map((cardData: CardData): Card => {
      return new Card(cardData);
    });
  }
}
