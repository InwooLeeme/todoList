import { atom } from "recoil";

// interface
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

// atom value
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
