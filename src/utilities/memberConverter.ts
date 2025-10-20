import * as userdata from "../../private/userdata.json";
import { UserData } from "../types/dataUsers";

export const toUser = (keyName: string): UserData | undefined => {
  return userdata[keyName];
};

export const idToUser = (trelloId: string): string | undefined => {
  for (const key in userdata) {
    const user: UserData = userdata[key];
    if (trelloId === user.trello) {
      return key;
    }
  }
};
