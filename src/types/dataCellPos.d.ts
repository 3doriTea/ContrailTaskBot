/**
 * セル上の座標
 */
export type CellPosition = {
  row: number;
  column: number;
};

export type TaskPriority = "S" | "A" | "B" | "C" | "D" | "E"; 

export type TasksData = {
  /** プロジェクトのタイトル */
  title: string;
  /** チーム名 */
  teamName: string;
  /** タスク */
  tasks: Array<TaskData>;
}

/** タスクデータ */
export type TaskData = {
  /**
   * Work Breakdown Structure
   * 分解構造体番号
  */
  wBS: string;
  /** タスク内容 */
  task: string;
  /** タスク優先度 */
  taskPriority: TaskPriority;
  /** タスク担当者 */
  taskAssignee: string;
  /** タスク開始日 */
  taskDateStart: Date;
  /** タスク終了日 */
  taskDateEnd: Date;
  /** タスク期間 */
  taskDuration: number;
  /** タスク達成率 */
  taskCompletionRate: number;
  /** タスク取り掛かり日数 */
  taskDaysToStart: number;
  
};

declare module "private/dataCellPosConfig.json" {
  const value : {
    /** プロジェクトのタイトル */
    title: CellPosition,
    /** チーム名 */
    teamName: CellPosition,
    /** セルの開始地点 */
    begin: {
      /**
       * Work Breakdown Structure
       * 分解構造体番号
      */
      wBS: CellPosition,
      /** タスク内容 */
      task: CellPosition,
      /** タスク優先度 */
      taskPriority: CellPosition,
      /** タスク担当者 */
      taskAssignee: CellPosition,
      /** タスク開始日 */
      taskDateStart: CellPosition,
      /** タスク終了日 */
      taskDateEnd: CellPosition,
      /** タスク期間 */
      taskDuration: CellPosition,
      /** タスク達成率 */
      taskCompletionRate: CellPosition,
      /** タスク取り掛かり日数 */
      taskDaysToStart: CellPosition,
    }
  }

  export default value;
}