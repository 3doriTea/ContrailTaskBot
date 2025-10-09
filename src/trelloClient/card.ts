import { TrelloElement, TrelloId } from "./trelloElement";

export type CardData = {
  id: TrelloId;
  address: string;
  closed: boolean;
  desc: string;
  idBoard: TrelloId;
  idList: TrelloId;
  idMembers: Array<TrelloId>;
  idMembersVoted: Array<TrelloId>;
  name: string;
  pos: number;
  url: string;
}

export type CardsData = Array<CardData>;

export type Cards = Array<Card>;

export class Card extends TrelloElement<CardData> {
  constructor(json: CardData, boardId: TrelloId) {
    super(json);
  }
}
