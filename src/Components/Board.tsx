import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 480px;
  width: 300px;
  padding-top: 10px;
  padding: 20px 10px;
`;
const Title = styled.h1`
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;

// interface
interface IBoard {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoard) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <Card key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
