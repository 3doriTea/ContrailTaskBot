import { TrelloElement } from "./trelloElement";

export type CheckListData = {
  id: string;
  name: string;
  idBoard: string;
  idCard: string;
  pos: number;
  checkItems: {
    id: string;
    name: string;
    nameData: {};
    pos: number;
    state: string;
    due: Date | null;
    dueReminder: Date | null;
    idMember: null;
    idChecklist: string;
  }[]
}

export type CheckListsData = Array<CheckListData>;

export type CheckLists = Array<CheckList>;

export class CheckList extends TrelloElement<CheckListData> {
  constructor(json: CheckListData) {
    super(json);
  }

  public get id() : string {
    return this.json.id;
  }
}

