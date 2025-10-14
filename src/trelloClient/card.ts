import { TrelloElement, TrelloId } from "./trelloElement";
import {
  CheckListData,
  CheckListsData,
  CheckList,
  CheckLists,
} from "./checkList";
import { cardsGetRequest, cardsPutRequest, cardsPostRequest } from "./utility";

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
  };
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
  };
};

export type CardsData = Array<CardData>;

export type Cards = Array<Card>;

type QueryParamCreateCard = {
  name?: string;
  desc?: string;
  // pos
  due?: string;
  start?: string;
  dueComplete?: boolean;
  idList: TrelloId;
  idMembers?: Array<TrelloId>;
};

type QueryParamUpdateCard = {
  name?: string;
  desc?: string;
  closed: boolean;
  // pos
  due?: string;
  start?: string;
  dueComplete?: boolean;
  idList?: TrelloId;
};

export class Card extends TrelloElement<CardData> {
  public static async create(param: QueryParamCreateCard): Promise<Card> {
    const paramStr = new URLSearchParams().toString();
    const data = await cardsPostRequest<CardData>("", "", param);
    return new Card(data);
  }

  constructor(json: CardData) {
    super(json);
  }

  public get id() {
    return this.json.id;
  }

  public async getCheckLists(): Promise<CheckLists> {
    const data = await cardsGetRequest<CheckListsData>(this.id, "checklists");
    return data.map((checkListData: CheckListData): CheckList => {
      return new CheckList(checkListData);
    });
  }

  public async updateCard(param: QueryParamUpdateCard): Promise<Card> {
    const data = await cardsPutRequest<CardData>(this.id, "", param);
    return new Card(data);
  }
}
