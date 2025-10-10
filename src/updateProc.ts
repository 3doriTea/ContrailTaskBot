import { SpreadLoader } from "./spreadLoader";
import { taskView } from "./formatter/taskView";
import { genWBS } from "./utilities/taskFormatterUtil";

export const updateTasks = async () => {
    const loader = new SpreadLoader(process.env.TARGET_SPREAD_SEET_ID);
    await loader.load("GanttChart");

    const now = new Date();

    const data = taskView.data(loader.sheetAccessor);
    const todoTasks = data.tasks.map((task) => {
      const wbs = genWBS(task.wBS);
      if (!wbs) {
        // wbsが正しくないタスクは除外
        console.error("wbsが不明なタスクが紛れ込んでいた");
        return;
      }

      if (task.taskCompletionRate >= 1.0) {
        console.log("達成済み");
        console.log(task);
        return;  // 既に達成済みのタスクは除外
      }

      if (task.taskDateStart > now) {
        console.log("開始していない");
        console.log(task);
        return;  // まだ先のタスクは除外
      }
    }).filter((task) => task);

    console.log(`${"-".repeat(30)}todo-tasks${"-".repeat(30)}`);

    console.log(todoTasks);
};