import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDo = useSetRecoilState(toDoState);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDo((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      const front = oldToDos.slice(0, targetIndex);
      const back = oldToDos.slice(targetIndex + 1, oldToDos.length);

      return [...front, newToDo, ...back];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={handleClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={handleClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={handleClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
