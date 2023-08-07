import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import { useRecoilValue } from "recoil";
import ToDo from "./ToDo";

function ToDos() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDos;
