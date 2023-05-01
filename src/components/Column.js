import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./Droppable/StrictModeDroppable"; // custom Droppable to use with strict mode
import Stack from "react-bootstrap/Stack";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Task from "./Task";


const Column = ({ column, tasks, index }) => {
    return (
        <Draggable key={column.id} draggableId={column.id} index={index}>
            {
                (provided) => (
                    <Col
                        xs={10}
                        md={4}
                        lg={3}
                        className="p-3 m-4 p-md-3 m-md-3 bg-white shadow rounded"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Card {...provided.dragHandleProps} className="mb-3 border-0">
                            <Card.Header >{column.title}</Card.Header>
                        </Card>
                        {/* <h2 className="mb-4">{column.title}</h2> */}
                        <Droppable droppableId={column.id} type="task">
                            {
                                (provided) => (
                                    <Stack
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="h-100"
                                    >
                                        {tasks.map((task, index) => (<Task key={task.id} task={task} index={index} />))}
                                        {provided.placeholder}
                                    </Stack>
                                )
                            }

                        </Droppable>

                    </Col>)
            }

        </Draggable>);
};

export default Column;
