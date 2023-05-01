import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Card from 'react-bootstrap/Card';


const Task = ({ task, index }) => {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
                <Card
                    body
                    className="mb-3"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                </Card>
            )}

        </Draggable>);
};

export default Task;
