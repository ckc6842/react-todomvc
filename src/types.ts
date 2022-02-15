export interface Todo {
  name: string;
  isCompleted: boolean;
}

export enum Filter {
  All,
  Active,
  Completed
}
