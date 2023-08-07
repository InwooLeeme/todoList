import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

// interface
interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

// atom value
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDos() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState); // recoil [변수, 수정함수]
  const isValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...prev,
    ]);
  };
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <form onSubmit={handleSubmit(isValid)}>
        <input
          {...register("toDo", {
            required: "Please write your to do",
          })}
          placeholder="Write to do"
        ></input>
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDos;
