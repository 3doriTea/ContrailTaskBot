import { TrelloElement, TrelloId } from "./trelloElement";
import { CheckListData, CheckListsData, CheckList, CheckLists } from "./checkList";
import { cardsGetRequest } from "./utility";

export type CardData = {
  id: TrelloId;
  badges: {
    checkItems: number;
    checkItemsChecked: number;
    comments: number;
    due: Date;
    dueComplete: boolean;
    start: Date;
    voites: number;
    subscribed: boolean;
  }
  closed: boolean;
  idBoard: TrelloId;
  idList: TrelloId;
  idMembers: Array<TrelloId>;
  idMembersVoted: Array<TrelloId>;
  name: string;
  pos: number;
  url: string;
  shortLink: string;
  shortUrl: string;
  dueComplete: boolean;
  dateLastActivity: Date;
  pinned: boolean;
  cover: {
    color: string;
  }
}

export type CardsData = Array<CardData>;

export type Cards = Array<Card>;

export class Card extends TrelloElement<CardData> {
  constructor(json: CardData) {
    super(json);
  }

  public get id() {
    return this.json.id;
  }

  public async getCheckLists(): Promise<CheckLists> {
    const data = await cardsGetRequest<CheckListsData>(this.id, "checklists");
    return data.map((checkListData: CheckListData) : CheckList => {
      return new CheckList(checkListData);
    });
  }
}
