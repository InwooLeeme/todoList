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
    if (!destination) return;
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
    } else if (destination.droppableId !== source.droppableId) {
      // 서로 다른 보드들이 상호작용 하는 경우
      setToDos((oldToDos) => {
        const sourceBoard = [...oldToDos[source.droppableId]];
        const destinationBoard = [...oldToDos[destination?.droppableId]];
        sourceBoard.splice(source.index, 1); // 움직이는 아이템
        destinationBoard.splice(destination.index, 0, draggableId); //
        console.log(destinationBoard, sourceBoard);
        return {
          ...oldToDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
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
