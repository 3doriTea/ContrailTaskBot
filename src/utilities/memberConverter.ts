import * as userdata from "../../private/userdata.json"
import { UserData } from "../types/dataUsers";

export const toUser = (keyName: string) : UserData | undefined => {
    return userdata[keyName];
  }
