import { atom } from "recoil";

interface IToDO {
  [key: string]: string[];
}

export const toDoState = atom<IToDO>({
  key: "toDo",
  default: {
    "To Do": ["a", "b", "c"],
    Doing: ["d", "e"],
    Done: ["f"],
  },
});
