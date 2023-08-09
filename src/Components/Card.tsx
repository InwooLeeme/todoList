import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// interface
interface ICard {
  toDo: string;
  index: number;
}

const CardContainer = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74c0fc" : props.theme.cardColor};
`;

function Card({ toDo, index }: ICard) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <CardContainer
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </CardContainer>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
