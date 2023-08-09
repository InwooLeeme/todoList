import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";
import Board from "./Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const BoardContainer = styled.div`
  max-width: 480px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

function Boards() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const DragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    // 같은 보드에서 움직이는 경우
    if (destination?.droppableId === source.droppableId) {
      setToDos((oldToDos) => {
        const copyList = [...oldToDos[source.droppableId]];
        copyList.splice(source.index, 1);
        copyList.splice(destination.index, 0, draggableId);
        return {
          ...oldToDos,
          [source.droppableId]: copyList,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={DragEnd}>
      <Wrapper>
        <BoardContainer>
          {Object.keys(toDos).map((id) => (
            <Board key={id} boardId={id} toDos={toDos[id]} />
          ))}
        </BoardContainer>
      </Wrapper>
    </DragDropContext>
  );
}

export default Boards;
