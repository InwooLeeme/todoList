import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

// interface
interface IBoard {
  toDos: string[];
  boardId: string;
}

interface IArea {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 480px;
  width: 300px;
  padding-top: 10px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
`;

const Area = styled.div<IArea>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ff6b6b"
      : props.draggingFromThisWith
      ? "#38d9a9"
      : "transparent"};
  flex-grow: 1;
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;

function Board({ toDos, boardId }: IBoard) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <Card key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
