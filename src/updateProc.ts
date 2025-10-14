import { SpreadLoader } from "./spreadLoader";
import { taskView } from "./formatter/taskView";
import { genWBS } from "./utilities/taskFormatterUtil";
import { Board } from "./trelloClient/board";
import { Tasker } from "./tasker/tasker";
import { Card } from "./trelloClient/card";
import { toUser } from "./utilities/memberConverter";

export const updateTasks = async () => {
  const loader = new SpreadLoader(process.env.TARGET_SPREAD_SEET_ID);
  await loader.load("GanttChart");

  const now = new Date();

  // GSSのデータ
  const currentData = taskView.data(loader.sheetAccessor);

  const tasker = new Tasker(currentData);

  const board = await Board.load(process.env.TARGET_TRELLO_BOARD_ID);
  const lists = await board?.getLists();
  const todoList = lists?.find((list) => {
    return list.name === "TODO";
  });

  if (!todoList) {
    console.log("Todoリストが見つからなかった");
    return;
  }

  const previousData = await todoList.getCards();

  tasker.checkDiff(
    previousData,
    // create
    async (task) => {
       task.taskAssignee

      await Card.create({ name: task.task, idList: todoList.id });
    },
    // update
    async (cardId, task) => {},
    // remove
    async (cardId) => {}
  );
  return;

  const todoTasks = currentData.tasks
    .map((task) => {
      const wbs = genWBS(task.wBS);
      if (!wbs) {
        // wbsが正しくないタスクは除外
        console.error("wbsが不明なタスクが紛れ込んでいた");
        return;
      }

      if (task.taskCompletionRate >= 1.0) {
        // console.log("達成済み");
        // console.log(task);
        //console.log(`達成済み${task.task}`);
        return; // 既に達成済みのタスクは除外
      }

      if (task.taskDateStart > now) {
        //console.log("開始していない");
        //console.log(task);
        //console.log(`まだ開始していない:${task.task}`);
        return; // まだ先のタスクは除外
      }
      return task;
    })
    .filter((task) => task);

  //console.log(`${"-".repeat(30)}todo-tasks${"-".repeat(30)}`);

  //console.log(todoTasks);

  await (async () => {
    const board = await Board.load(process.env.TARGET_TRELLO_BOARD_ID);

    //console.log(`取得したボード「${board.name}」(${board.id})`);

    const lists = await board.getLists();

    const todoList = lists.find((list) => {
      return list.name === "TODO";
    });

    if (!todoList) {
      console.log("Todoリストが見つからなかった");
      return;
    }

    const todoListCards = await todoList.getCards();
    console.log(todoListCards);
    // todoListCards.forEach((card) => {
    //   card.
    // })
  })();
};
