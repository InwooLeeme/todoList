import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

// interface
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState); // recoil [변수, 수정함수]
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const isValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...prev,
    ]);
  };
  return (
    <form onSubmit={handleSubmit(isValid)}>
      <input
        {...register("toDo", {
          required: "Please write your to do",
        })}
        placeholder="Write to do"
      ></input>
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
