import { TaskData, TasksData } from "../types/dataCellPos";
import { genWBS } from "../utilities/taskFormatterUtil";
import { Cards } from "../trelloClient/card";

export class Tasker {
  /**
   *
   * @param current Google Spread Sheet から現在のタスク内容
   */
  constructor(private current: TasksData) {}

  /**
   * 差分をチェックする
   * @param previous Trello から過去のタスク内容
   * @param onCreate Trello に新しく追加するタスク
   * @param onUpdate Trello に更新処理するタスク
   * @param onRemove Trello で完了として除去するタスク
   */
  public async checkDiff(
    previous: Cards,
    onCreate: (task: TaskData) => Promise<void>,
    onUpdate: (cardId: string, task: TaskData) => Promise<void>,
    onRemove: (cardId: string) => Promise<void>
  ) {
    const now = new Date();

    /**
     * Google Spread Sheet から現在のTodoタスク
     */
    const todoTasks = this.current.tasks
      .map((task) => {
        const wbs = genWBS(task.wBS);
        if (!wbs) {
          return; // wbsが正しくないタスクは除外
        }

        if (task.taskCompletionRate >= 1.0) {
          return; // 既に達成済みのタスクは除外
        }

        if (task.taskDateStart > now) {
          return; // まだ先のタスクは除外
        }
        return task;
      })
      .filter((task) => task);

    /**
     * Trelloにある前のタスク名
     */
    const prevTaskNames = previous.map((task) => task.row.name);

    const needCreateTasks: TaskData[] = todoTasks
      .map((todoTask) => {
        if (!prevTaskNames.includes(todoTask.task)) {
          // タスクカードに含まれていないタスクは新しく作るものとしてまとめる
          return todoTask;
        }
      })
      .filter((todoTasks) => todoTasks);

    // タスクカードを新しく作る処理
    needCreateTasks.forEach(async (task) => {
      await onCreate(task);
    });
  
  const needRemoveCards: Cards = previous.map((prevCard) => {
    if (!todoTasks.filter((todoTask) => todoTask.task == prevCard.row.name)) {
      // 現在のtodo に含まれない タスク名をまとめる
      return prevCard;
    }
  }).filter((card) => card);

  // タスクカードを完了済みとして移動する処理
  needRemoveCards.forEach(async (card) => {
    await onRemove(card.id);
  });
  }
}
