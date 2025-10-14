import { TrelloId } from "../trelloClient/trelloElement";

export type UserData = {
  discord: string,
	trello: TrelloId,
	nickname: string
};

declare module "private/userdata.json" {
  const value: {
    "": UserData
  };
}
