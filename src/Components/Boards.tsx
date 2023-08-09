import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";
import Card from "./Card";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const BoardContainer = styled.div`
  max-width: 480px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

function Boards() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const DragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      // 1) source 인덱스를 삭제함
      copyToDos.splice(source.index, 1);
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={DragEnd}>
      <Wrapper>
        <BoardContainer>
          <Droppable droppableId="table1">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Card key={toDo} toDo={toDo} index={index} />
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </BoardContainer>
      </Wrapper>
    </DragDropContext>
  );
}

export default Boards;
