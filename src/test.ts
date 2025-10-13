import { SpreadLoader } from "./spreadLoader";
import { setGlobalDispatcher, EnvHttpProxyAgent } from "undici";
import { taskView } from "./formatter/taskView";
import { AllTaskMessage } from "./messageBuilder/allTaskMessage";
import { Board } from "./trelloClient/board";
import { Card } from "./trelloClient/card";
import { List } from "./trelloClient/list";
import { updateTasks } from "./updateProc";
import { Organization } from "./trelloClient/organization";

// プロキシが設定されているなら使う
if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY) {
  setGlobalDispatcher(new EnvHttpProxyAgent());
}

const main = async () => {
  //await updateTasks();

  const board = await Board.load(process.env.TARGET_TRELLO_BOARD_ID);

  console.log(`取得したボード「${board.name}」(${board.id})`);

  const org = await Organization.load(
    process.env.TARGET_TRELLO_ORGANIZATION_ID
  );

  const members = await org.getMembers();

  console.log(members);

  return;

  const lists = await board.getLists();

  const todoList = lists.find((list) => {
    return list.name === "TODO";
  });

  if (!todoList) {
    console.log("Todoリストが見つからなかった");
    return;
  }

  console.log("-".repeat(50));
  console.log(todoList.row);
  console.log("-".repeat(50));

  const cards = await todoList.getCards();

  cards.forEach(async (card) => {
    const checkLists = await card.getCheckLists();
    checkLists.forEach((checkList) => {
      console.log(checkList.row);
    });
  });

  // return;

  // lists.forEach((list) => {
  //   console.log(list.row);
  // });

  // return;
  // const loader = new SpreadLoader(process.env.TARGET_SPREAD_SEET_ID);
  // await loader.load("GanttChart");

  // taskView.data(loader.sheetAccessor);

  // const showText = new AllTaskMessage().gen(text);
  // console.log(showText);
};

main().then();
