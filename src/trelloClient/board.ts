import { TrelloElement } from "./trelloElement";
import { Card } from "./card";
import { boardGetRequest } from "./utility";
import { List, Lists, ListsData } from "./list";

/**
 * １つのボードデータ
 */
export type BoardData = {
  id: string;
  name: string;
  desc: string;
  descData: null;
  closed: boolean;
  idOrganization: string;
  idEnterprise: null;
  pinned: boolean;
  url: string;
  shortUrl: string;
  prefs: {
    permissionLevel: string;
    hideVotes: boolean;
    voting: "disabled" | "enabled";
    comments: "members";
    invitations: "members";
    selfJoin: boolean;
    cardCovers: boolean;
    showCompleteStatus: boolean;
    cardCounts: boolean;
    isTemplate: boolean;
    cardAging: "regular";
    calendarFeedEnabled: boolean;
    hiddenPluginBoardButtons: [];
    switcherViews: { viewType: "Board"; enabled: boolean }[];
    autoArchive: null;
    background: string;
    backgroundColor: null;
    backgroundDarkColor: null;
    backgroundImage: string;
    backgroundDarkImage: null;
    backgroundImageScaled: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object]
    ];
    backgroundTile: boolean;
    backgroundBrightness: "light";
    sharedSourceUrl: string;
    backgroundBottomColor: string;
    backgroundTopColor: string;
    canBePublic: boolean;
    canBeEnterprise: boolean;
    canBeOrg: boolean;
    canBePrivate: boolean;
    canInvite: boolean;
  };
  labelNames: {
    green: "";
    yellow: "";
    orange: "";
    red: "";
    purple: "";
    blue: "";
    sky: "";
    lime: "";
    pink: "";
    black: "";
    green_dark: "";
    yellow_dark: "";
    orange_dark: "";
    red_dark: "";
    purple_dark: "";
    blue_dark: "";
    sky_dark: "";
    lime_dark: "";
    pink_dark: "";
    black_dark: "";
    green_light: "";
    yellow_light: "";
    orange_light: "";
    red_light: "";
    purple_light: "";
    blue_light: "";
    sky_light: "";
    lime_light: "";
    pink_light: "";
    black_light: "";
  };
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

  public get id(): string {
    return this.json.id;
  }

  public get name(): string {
    return this.json.name;
  }

  public async getLists(): Promise<Lists> {
    const data = await boardGetRequest<ListsData>(this.id, "lists");
    return data.map((listData): List => {
      return new List(listData);
    });
  }

  public async getMenbers(): Promise<any> {
    const data = await boardGetRequest<any>(this.id, "members");
    console.log(data);
    return;
  }

  public async getMemberships(): Promise<any> {
    const data = await boardGetRequest<any>(this.id, "memberships");
    console.log(data);
    return;
  }

  public static async load(boardId: string): Promise<Board> {
    const data = await boardGetRequest<BoardData>(boardId);
    return new Board(data);
  }
}
